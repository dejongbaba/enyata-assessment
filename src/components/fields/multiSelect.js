import {Field, getIn, useFormikContext} from "formik";
import {classNames} from "@/lib/utils";
import {useEffect} from "react";
import _ from "lodash";

export default function Component({
                                      name,
                                      label,
                                      helpText,
                                      groupClass = "w-full grid grid-cols-1 relative z-0 md:grid-cols-2 gap-2.5",
                                      optionClass = "border border-slate-200 inline-flex font-semibold w-full py-3 px-1.5 placeholder-gray-400 rounded text-sm cursor-pointer justify-center items-center",
                                      options = [],
                                      optionLabel = "name",
                                      optionValue = "code",
                                      disabledOption = "disabled",
                                      checkboxVisible = false,
                                      multiple = false,
                                      checkboxClass = "w-4 h-4 text-primary border-slate-200 rounded-full focus:ring-primary mr-4 ml-1",
                                      selectedOptionClass = "!border-black !ring-1 !ring-black",
                                      altLink,
                                      format,
                                      onItemSelected,
                                      extraClasses = "",
                                      ...props
                                  }) {
    const {values} = useFormikContext();
    const value = getIn(values, name);

    const getSelectedOption = () => {
        const option = _.find(options, (opt) => {
            return opt[optionValue] === value;
        });
        return option;
    };

    useEffect(() => {
        value && onItemSelected && onItemSelected(getSelectedOption());
        //    react-hooks/exhaustive-deps
    }, [value]);

    const formatValue = (option) => (format ? format(option) : option[optionLabel]);

    return (
        <fieldset className="space-y-3">
            {label && (
                <div className="flex justify-between items-center">
                    {label ? (
                        <label htmlFor={name} className="text-2xs uppercase tracking-wider font-bold text-gray-900">
                            {label}
                        </label>
                    ) : (
                        <span/>
                    )}
                    {altLink && <div className="items-end">{altLink}</div>}
                </div>
            )}
            <div role="group" aria-labelledby={name} className={classNames(groupClass, "relative w-full")}>
                {options.map((option, idx) => {
                    const value = option[optionValue];
                    const isDisabled = option[disabledOption] === true || option["coming_soon"] === true;
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
                                isChecked ? "w-full ring-primary border-primary" : "border-slate-200",
                                isDisabled ? "opacity-50" : "",
                                isChecked ? selectedOptionClass : "",
                                optionClass,
                                extraClasses
                            )}>
                            <Field
                                type={multiple ? "checkbox" : "radio"}
                                name={name}
                                value={value}
                                className={classNames(checkboxVisible ? "inline-block" : "hidden", checkboxClass)}
                            />
                            {formatValue(option)}
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}
