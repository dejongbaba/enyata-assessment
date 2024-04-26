import { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, MultiSelect } from "app/components/fields";

const operators = [
    { name: "is less or equal to", op: "$lte", template: `Less or equal to {{value}}` },
    { name: "is less than", op: "$lt", template: `Less than {{value}}` },
    { name: "is greater or equal to", op: "$gte", template: `Greater or equal to {{value}}` },
    { name: "is greater than", op: "$gt", template: `Greater than {{value}}` },
    { name: "is equal to", op: "$eq", template: `{{value}}` },
    { name: "is between", op: "$btw", template: `Between {{range.from}} and {{range.to}}` },
];

export default function Component({ onSubmit, name, code, options = operators, searchFunc }) {
    const formRef = useRef();

    const initialValues = {
        op: "$in",
    };

    const validationSchema = Yup.object().shape({
        value: Yup.array().of(Yup.string()).required(),
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
                    onSubmit && onSubmit({ [code]: values });
                }}>
                {({ values, errors, isValid, isSubmitting, handleSubmit }) => {
                    console.log({ values, errors });
                    return (
                        <form method="post" className="w-full flex flex-col" onSubmit={handleSubmit}>
                            <div className="pb-0.5">
                                <p className="font-semibold text-2xs text-black uppercase tracking-wider">
                                    Filter by {name}
                                </p>
                            </div>
                            {/*<div className="w-full">*/}
                            {/*    <Select*/}
                            {/*        showError={false}*/}
                            {/*        name="op"*/}
                            {/*        enablePlaceholder={false}*/}
                            {/*        options={operators}*/}
                            {/*        optionLabel="name"*/}
                            {/*        optionValue="op"*/}
                            {/*        extraClasses="!py-1.5 !px-2.5 !text-xs"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="w-full pb-2">
                                <MultiSelect
                                    // label={"Select Features"}
                                    multiple={true}
                                    checkboxVisible={true}
                                    extraClasses={"!col-span-full !justify-start !text-xs !border-none !gap-1"}
                                    optionClass="border-0 inline-flex font-medium w-full py-1.5 placeholder-gray-400 cursor-pointer justify-center items-center !ring-0"
                                    selectedOptionClass="text-primary"
                                    name={"value"}
                                    groupClass={"flex flex-col gap-1 justify-start items-center"}
                                    // helpText={"Select the services you are interested in"}
                                    options={options}
                                    optionLabel={"name"}
                                    optionValue={"op"}
                                />
                            </div>
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
