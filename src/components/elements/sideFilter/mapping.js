import * as Yup from "yup";
import { MultiSelect, Input, DatePicker, ComboSelect, Switch } from "app/components/elements/sideFilter/fields";
import { useFormikContext, getIn } from "formik";
import _ from "lodash";
import { formatString } from "app/lib/formatters";

const multipleSchema = Yup.object().shape({
    op: Yup.string().required(), // as select field
    value: Yup.array().of(Yup.string()).required(),
});

const numberRangeSchema = Yup.object().shape({
    op: Yup.string().required(), // as select field
    value: Yup.object().shape({
        min: Yup.number().required(),
        max: Yup.number().required(),
    }),
});

const dateRangeSchema = Yup.object().shape({
    op: Yup.string().required(), // as select field
    value: Yup.object().shape({
        min: Yup.string().required(),
        max: Yup.string().required(),
    }),
});

const optionsSchema = Yup.object().shape({
    value: Yup.array().of(Yup.string()).required(),
});

const textSchema = Yup.object().shape({
    op: Yup.string().required(), // as select field
    value: Yup.string().required(),
});

const numberSchema = Yup.object().shape({
    op: Yup.number().required(), // as select field
    value: Yup.number().required(),
});

const dateSchema = Yup.object().shape({
    op: Yup.string().required(), // as select field
    value: Yup.string().required(),
});

const booleanSchema = Yup.object().shape({
    op: Yup.string().required(), // as select field
    value: Yup.boolean().notRequired(),
});

const MultiComponent = ({ name, prop, code, op, options = [] }) => {
    const { values, setFieldValue } = useFormikContext();

    const onItemSelected = (items) => {
        const entry = getIn(values, prop);
        const choices = _.map(items, (i) => i.value);
        console.log({ items, entry, choices });
        const updatedEntry = { ...entry, code, prop, op, value: choices };
        setFieldValue(prop, updatedEntry);
    };

    return (
        <div className="w-full py-2 space-y-6 ">
            <div className="font-bold text-2xs uppercase tracking-wider">{name}</div>
            <MultiSelect
                multiple={true}
                checkboxVisible={true}
                selectedOptionClass="text-black"
                name={`${prop}.choice`}
                options={options}
                optionLabel={"name"}
                optionValue={"code"}
                onItemSelected={onItemSelected}
            />
        </div>
    );
};

const OptionComponent = ({ name, prop, code, op, options = [] }) => {
    const { values, setFieldValue } = useFormikContext();

    const onItemSelected = (item) => {
        const entry = getIn(values, prop);
        const value = item?.value;
        // For single select, you don't need to iterate the values anymore
        console.log({ item, entry, value, values, prop });
        const updatedEntry = { ...entry, prop, code, op, value, choice: value };
        setFieldValue(prop, updatedEntry);
    };

    return (
        <div className="w-full py-2 space-y-6">
            <div className="font-bold text-2xs uppercase tracking-wider">{name}</div>
            <MultiSelect
                multiple={false}
                checkboxVisible={true}
                selectedOptionClass="text-black"
                name={`${prop}.choice`}
                options={options}
                optionLabel={"name"}
                optionValue={"code"}
                captionProp={"description"}
                onItemSelected={onItemSelected}
            />
        </div>
    );
};
const DropDownComponent = ({ name, prop, code, op, options = [] }) => {
    const { values, setFieldValue } = useFormikContext();

    const onItemSelected = (item) => {
        const entry = getIn(values, prop);
        const value = item?.value;
        // For single select, you don't need to iterate the values anymore
        console.log({ item, entry, value, values, prop });
        const updatedEntry = { ...entry, prop, code, op, value, choice: value };
        console.log("updatedEntry", prop, updatedEntry);
        setFieldValue(prop, updatedEntry);
    };

    return (
        <div className="w-full py-2 space-y-3">
            <div className=" font-bold text-2xs uppercase tracking-wider">{name}</div>
            <ComboSelect
                selectedOptionClass="text-black"
                name={`${prop}.choice`}
                options={options}
                optionLabel={"name"}
                optionValue={"code"}
                captionProp={"description"}
                onItemSelected={onItemSelected}
            />
        </div>
    );
};

const InputComponent = ({ name, prop, code, type = "text", op }) => {
    const { values, setFieldValue } = useFormikContext();

    const onInputChanged = (val) => {
        const entry = getIn(values, prop);
        const updatedEntry = { ...entry, prop, code, op, value: val };
        setFieldValue(prop, updatedEntry);
    };

    return (
        <div className="w-full py-2 space-y-6">
            <div className="font-bold text-2xs uppercase tracking-wider">{name}</div>
            <Input
                extraClasses={
                    "text-sm border-gray-100 bg-gray-100 !border-0 focus:border-gray-100 ring-0 focus:ring-transparent placeholder:text-gray-400 font-normal focus:font-medium rounded-md !py-2"
                }
                placeholder={`Enter the ${formatString(name, "lowercase")}`}
                name={`${prop}.value`}
                type={type}
                onInputChanged={onInputChanged}
            />
        </div>
    );
};

const BooleanComponent = ({ name, prop, code, op }) => {
    const { values, setFieldValue } = useFormikContext();

    const onInputChanged = (value) => {
        const entry = getIn(values, prop);
        const updatedEntry = { ...entry, prop, code, op, value };
        setFieldValue(prop, updatedEntry);
    };

    return (
        <label className="w-full py-2 space-x-4 w-full flex items-center">
            <Switch label={name} name={`${prop}.value`} onInputChanged={onInputChanged} />
        </label>
    );
};

const RangeComponent = ({ name, prop, code, op, type, options = [] }) => {
    const { values, setFieldValue } = useFormikContext();
    const inputType = type === "dateRange" ? "date" : "number";
    const RangeInput = type === "dateRange" ? DatePicker : Input;
    const onItemSelected = (item) => {
        const entry = getIn(values, prop);
        // For single select, you don't need to iterate the values anymore
        const choice = item?.value;
        console.log({ item, entry, choice });
        const updatedEntry = { ...entry, code, op, name, value: choice };
        setFieldValue(prop, updatedEntry);
    };

    return (
        <div className="w-full py-2 space-y-3">
            <div className="font-bold text-2xs uppercase tracking-wider">{name}</div>
            <div className="space-y-6">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex-1">
                        <RangeInput
                            extraClasses={
                                "text-sm w-full border-gray-200 placeholder:text-gray-400 focus:font-medium !py-2"
                            }
                            placeholder={`min`}
                            name={`${prop}.value.min`}
                            type={inputType}
                        />
                    </div>
                    <span className="px-2 text-black">{" to "}</span>
                    <div className="flex-1">
                        <RangeInput
                            extraClasses={
                                "text-sm w-full border-gray-200 placeholder:text-gray-400 focus:font-medium !py-2"
                            }
                            placeholder={`max`}
                            alignment={"bottom-end"}
                            name={`${prop}.value.max`}
                            type={inputType}
                        />
                    </div>
                </div>
                {options?.length > 0 && (
                    <MultiSelect
                        multiple={false}
                        checkboxVisible={true}
                        selectedOptionClass="text-black"
                        name={`${prop}.choice`}
                        options={options}
                        optionLabel={"name"}
                        optionValue={"code"}
                        onItemSelected={onItemSelected}
                    />
                )}
            </div>
        </div>
    );
};

const filterMapping = {
    multiple: {
        schema: multipleSchema,
        Component: MultiComponent,
    },
    number: {
        schema: numberSchema,
        Component: InputComponent,
    },
    text: {
        schema: textSchema,
        Component: InputComponent,
    },
    datetime: {
        schema: dateSchema,
        Component: InputComponent,
    },
    boolean: {
        schema: booleanSchema,
        Component: BooleanComponent,
    },
    options: {
        schema: optionsSchema,
        Component: OptionComponent,
    },
    dropdown: {
        schema: optionsSchema,
        Component: DropDownComponent,
    },
    dateRange: {
        schema: dateRangeSchema,
        Component: RangeComponent,
    },
    numberRage: {
        schema: numberRangeSchema,
        Component: RangeComponent,
    },
};

export default filterMapping;
