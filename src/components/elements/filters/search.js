import { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Input, Select } from "app/components/fields";
import { ArrowElbowDownRight } from "phosphor-react";

const operators = [
    { name: "is less or equal to", op: "$lte", template: `Less or equal to {{value}}` },
    { name: "is less than", op: "$lt", template: `Less than {{value}}` },
    { name: "is greater or equal to", op: "$gte", template: `Greater or equal to {{value}}` },
    { name: "is greater than", op: "$gt", template: `Greater than {{value}}` },
    { name: "is equal to", op: "$eq", template: `{{value}}` },
    { name: "is between", op: "$btw", template: `Between {{range.from}} and {{range.to}}` },
];

export default function Component({ onSubmit, name, code, options, searchFunc }) {
    const formRef = useRef();

    const initialValues = {};

    const validationSchema = Yup.object().shape({
        op: Yup.string().required(), // as select field
        value: Yup.string().notRequired().nullable(),
        range: Yup.object()
            .shape({
                from: Yup.string().required(),
                to: Yup.string().required(),
            })
            .notRequired()
            .nullable(),
    });

    return (
        <div>
            <Formik
                innerRef={formRef}
                enableReinitialize={true}
                validateOnMount={true}
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values, formikBag) => {
                    formikBag.setSubmitting(false);
                    onSubmit && onSubmit({ code: values });
                }}>
                {({ values, errors, isValid, isSubmitting, handleSubmit }) => {
                    console.log({ values, errors });
                    return (
                        <form method="post" className="w-full flex flex-col space-y-1" onSubmit={handleSubmit}>
                            <div className="pb-0.5">
                                <p className="font-semibold text-2xs text-black uppercase tracking-wider">
                                    Filter by {name}
                                </p>
                            </div>
                            <div className="w-full">
                                <Select
                                    showError={false}
                                    name="op"
                                    enablePlaceholder={false}
                                    options={operators}
                                    optionLabel="name"
                                    optionValue="op"
                                    extraClasses="!py-1.5 !px-2.5 !text-xs"
                                />
                            </div>
                            {values && values.op !== "$btw" ? (
                                <div className="w-full flex justify-start items-center gap-4 relative">
                                    <ArrowElbowDownRight
                                        size={20}
                                        weight={"fill"}
                                        className="absolute top-2.5 text-primary"
                                    />
                                    <div className="ml-8 w-1/2">
                                        <Input
                                            showError={false}
                                            type="text"
                                            name="value"
                                            extraClasses="!py-1.5 !px-2.5 !pl-7 !text-xs !rounded"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full flex justify-start items-center gap-4 relative">
                                    <ArrowElbowDownRight
                                        size={20}
                                        weight={"fill"}
                                        className="absolute top-2.5 text-primary"
                                    />
                                    <div className="ml-8 flex justify-between items-center gap-1.5">
                                        <Input
                                            showError={false}
                                            type="text"
                                            name="range.from"
                                            extraClasses="!py-1.5 !px-2.5 !pl-7 !text-xs !rounded"
                                        />
                                        <span className="flex items-center justify-center font-medium text-xs mt-1">
                                            and
                                        </span>
                                        <Input
                                            showError={false}
                                            type="text"
                                            name="range.to"
                                            extraClasses="!py-1.5 !px-2.5 !pl-7 !text-xs !rounded"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="w-full flex flex-row justify-between items-center pt-6">
                                <div className={"flex flex-1"}>{""}</div>
                                <div className="w-1/3">
                                    <Button disabled={false} extraClasses="!py-2 !rounded !text-xs" type="submit">
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}
