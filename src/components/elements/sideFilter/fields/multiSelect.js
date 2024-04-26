import { Field, useFormikContext, getIn } from "formik";
import { classNames } from "app/lib/utils";
import { useEffect } from "react";
import _ from "lodash";

export default function Component({
    name,
    label,
    helpText,
    groupClass = "w-full relative z-0 space-y-2",
    optionClass = "inline-flex text-sm w-full placeholder-slate-400 hover:border-slate-700 cursor-pointer items-center space-x-2.5",
    options = [],
    optionLabel = "name",
    optionValue = "code",
    disabledOption = "disabled",
    checkboxVisible = false,
    multiple = false,
    checkboxClass = "w-5 h-5 text-primary border-slate-300 rounded hover:border-slate-700 transition-all focus:ring-primary",
    selectedOptionClass = "!border-black !ring-1 !ring-black",
    altLink,
    format,
    formatCaption,
    onItemSelected,
    captionProp = "",
    extraClasses = "",
}) {
    const { values } = useFormikContext();
    const value = getIn(values, name);

    const getSelectedOption = () => {
        let option;
        if (!multiple) {
            option = _.find(options, (opt) => {
                return opt[optionValue] === value;
            });
        } else {
            option = _.filter(options, (opt) => {
                return value.includes(opt[optionValue]);
            });
        }
        return option;
    };

    useEffect(() => {
        value && onItemSelected && onItemSelected(getSelectedOption());
    }, [value]);

    const formatValue = (option) => (format ? format(option) : option[optionLabel]);
    const _formatCaption = (option) => (formatCaption ? formatCaption(option) : option[captionProp]);

    return (
        <fieldset className="space-y-3">
            {label && (
                <div className="flex justify-between items-center">
                    {label ? (
                        <label htmlFor={name} className="uppercase tracking-wider font-bold text-slate-900">
                            {label}
                        </label>
                    ) : (
                        <span />
                    )}
                    {altLink && <div className="items-end">{altLink}</div>}
                </div>
            )}
            <div role="group" aria-labelledby={name} className={classNames(groupClass, "relative w-full")}>
                {options.map((option, idx) => {
                    const value = option[optionValue];
                    const isDisabled = option[disabledOption] === true;
                    const isChecked = multiple
                        ? value && values && values[name] && values[name].indexOf(value) !== -1
                        : value && values && values[name] && values[name] == value;
                    return (
                        <label
                            // disabled={isDisabled}
                            key={idx}
                            onClick={(e) => {
                                isDisabled && e.preventDefault();
                            }}
                            className={classNames(
                                isChecked ? "w-full ring-primary border-primary" : "border-slate-300",
                                isDisabled ? "opacity-50" : "",
                                isChecked ? selectedOptionClass : "",
                                optionClass,
                                extraClasses
                            )}>
                            <Field
                                type={multiple === true ? "checkbox" : "radio"}
                                name={name}
                                value={value}
                                className={classNames(
                                    checkboxVisible ? "inline-block" : "hidden",
                                    checkboxClass,
                                    multiple === false && "rounded-full"
                                )}
                            />
                            <div className="flex justify-between items-center w-full">
                                <div className="text-black">{formatValue(option)}</div>
                                {_formatCaption(option)}
                            </div>
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}
