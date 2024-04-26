"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import _ from "lodash";
import { Formik, useFormikContext } from "formik";
import filterMapping from "./mapping";
import useSearchParams from "app/hooks/useSearchParams";
import { Button } from "app/components/fields";
import { serializeFilters } from "app/lib/utils";

// Sample structure for filter mappings
const demoFilters = [
    { name: "Show only products in stock", prop: "availability", code: "availability", type: "boolean", op: "$eq" },
    {
        name: "Special Options",
        prop: "status",
        code: "status.code",
        type: "multiple",
        op: "$in",
        options: [
            { name: "Free delivery", code: "free_delivery", value: "free_delivery" },
            { name: "Discounts & promotions", code: "on_sale", value: "on_sale" },
        ],
    },
    {
        name: "Rating",
        prop: "rating",
        code: "rating",
        type: "options",
        op: "$gte",
        options: [
            { name: "\u2605 \u2605 \u2605 \u2605 \u2606", code: "5_stars", description: "4 stars or more", value: 4.0 },
            { name: "\u2605 \u2605 \u2605 \u2606", code: "4_stars", description: "3 or more stars", value: 3.0 },
            { name: "\u2605 \u2605 \u2606", code: "3_stars", description: "2 or more stars", value: 2.0 },
            { name: "\u2605 \u2606", code: "2_stars", description: "1 or more stars", value: 1.0 },
            { name: "\u2606", code: "1_stars", description: "below 1 star", value: 0.0 },
        ],
    },

    {
        name: "Date listed",
        prop: "date_created",
        code: "date_created",
        type: "dateRange",
        op: "$btw",
        options: [
            {
                name: "From 2020 to 2021",
                code: "2020_2021",
                value: {
                    min: new Date(2020, 0, 1),
                    max: new Date(2021, 11, 31),
                },
            },
            {
                name: "Between 2021 and 2022",
                code: "2021_2022",
                value: {
                    min: new Date(2021, 0, 1),
                    max: new Date(2022, 11, 31),
                },
            },
            {
                name: "After 2022",
                code: "after_2022",
                value: {
                    min: new Date(2022, 0, 1),
                    max: new Date(2035, 11, 31),
                },
            },
        ],
    },
    {
        name: "Selling Price",
        prop: "price",
        code: "default_price.value",
        type: "numberRage",
        op: "$btw",
        options: [
            { name: "Up to $50", code: "0_50", value: { min: 1, max: 50 } },
            { name: "$50 - $100", code: "50_100", value: { min: 50, max: 100 } },
            { name: "At least $100", code: "100_above", value: { min: 100, max: 100000 } },
        ],
    },
    { name: "Figurative Code", code: "code", prop: "code", type: "text", op: "$ne" },
    {
        name: "Country of Origin",
        prop: "country_code",
        code: "country.code",
        type: "multiple",
        op: "$eq",
        options: [
            { name: "Nigeria", code: "NG", value: "NG" },
            { name: "Ghana", code: "GH", value: "GH" },
        ],
    },
];

const FormObserver = ({ autoSubmit = true }) => {
    const { values, submitForm } = useFormikContext();
    useEffect(() => {
        if (autoSubmit) {
            submitForm();
        }
    }, [values, autoSubmit]);

    return console.log("auto submit observer rendered");
};

export default function Component({ metadata = {}, filterOptions = demoFilters, onClearFilter, autoSubmit = true }) {
    const formRef = useRef();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { pathname } = router;
    const { filter_by = {} } = metadata;

    const buildFilterParams = (filterBy, options) => {
        console.log("filterBy params", filterBy);
        let acc = {};
        const prepareChoice = (value, option) => {
            switch (option.type) {
                case "dateRange":
                    //    find the option choosen
                    const val = value?.split("__");
                    const [min, max, c] = val;
                    //    find the value
                    const [day, month, year] = min?.split("-");
                    const [maxDay, maxMonth, maxYear] = max?.split("-");
                    return {
                        value: { min: new Date(year, month, day), max: new Date(maxYear, maxMonth, maxDay) },
                        choice: c,
                    };
                case "numberRage":
                    const num = value?.split("__");
                    const [mini, maxi, choice] = num;
                    //    find the value
                    return { value: { min: mini, max: maxi }, choice };
                case "multiple":
                case "options":
                case "dropdown":
                    return { value, choice: value };
                case "number":
                case "boolean":
                case "date":
                case "text":
                    return { value, choice: value };
                default:
                    return { value, choice: value };
            }
        };

        _.forEach(filterBy, (f, key) => {
            const option = _.find(options, (o) => {
                return o.code == key;
            });
            if (option) {
                const { prop, code, op, name } = option;
                console.log("f", f, op, f[op]);
                let { value, choice } = prepareChoice(f[op?.replace("$", "")], option);

                acc = { ...acc, [`${prop}`]: { prop, code, op, name, value, choice } };
            }
        });

        return acc;
    };

    const initialValues = buildFilterParams(filter_by, filterOptions);
    console.log("initialValues", initialValues, filter_by);
    // Build an empty schema that will be populated with additional object schemas
    const validationSchema = Yup.object().shape({});
    const components = [];

    // Automate the validation schema created
    _.forEach(filterOptions, (props) => {
        const { prop, type } = props;
        const mapping = filterMapping[type];

        if (!mapping) return;

        const { schema, Component } = mapping;
        // console.log({ schema, Component });
        validationSchema[prop] = schema;
        components.push({ Component, props });
    });

    const createQueryString = useCallback(
        (filterParams) => {
            const params = new URLSearchParams(searchParams);
            filterParams.forEach(({ value, key }) => {
                if (value) {
                    const val = Array.isArray(value) ? value.join(",") : value;
                    params.set(key, val);
                }
            });

            return encodeURI(params.toString()?.replaceAll("", ""));
        },
        [searchParams]
    );

    const onCompleted = (values) => {
        formRef.current?.setSubmitting(false);
        const filterParams = serializeFilters(values);
        const updatedParams = createQueryString(filterParams);
        const updatedPath = [pathname, updatedParams].join("?");
        router.push(updatedPath);
    };

    return (
        <div className="space-y-4 z-30">
            <Formik
                innerRef={formRef}
                enableReinitialize={true}
                validateOnMount={true}
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values, formikBag) => {
                    console.log("submitting ------->", { values });
                    onCompleted(values);
                }}>
                {({ handleSubmit, values, resetForm, errors, isSubmitting, isValid }) => {
                    console.log("form", { values, errors, isSubmitting, isValid });
                    return (
                        <form onSubmit={handleSubmit} className="flex flex-col font-medium w-full mx-auto px-2">
                            <div className="w-full flex flex-row justify-between h-20 items-center py-3">
                                {/*<div className="font-bold">{"Filters"}</div>*/}
                            </div>
                            <div className="divide-y divide-dashed divide-gray-100">
                                {components.map((option, idx) => {
                                    const { Component, props = {} } = option;
                                    return (
                                        <div key={idx} className="py-2 w-full">
                                            <Component {...props} />
                                        </div>
                                    );
                                })}
                            </div>
                            {autoSubmit ? (
                                <FormObserver />
                            ) : (
                                <div className=" py-4 flex flex-row justify-start space-x-2 items-center">
                                    <Button disabled={false} extraClasses="!w-auto !text-xs" type="submit">
                                        Apply
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            resetForm();
                                            // onClearFilter();
                                            router.push(pathname);
                                        }}
                                        disabled={false}
                                        style="light"
                                        extraClasses="!w-auto !text-xs"
                                        type="button">
                                        Reset
                                    </Button>
                                </div>
                            )}
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}
