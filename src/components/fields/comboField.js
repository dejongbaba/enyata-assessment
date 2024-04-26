import { ErrorMessage, Field } from "formik";
import { CheckCircleIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "app/lib/utils";
import { useState } from "react";
import _ from "lodash";

export default function Component({
    name,
    label,
    format,
    options = [],
    extraClasses = "",
    optionLabel = "name",
    optionValue = "code",
    nestedKey = "variant",
    onItemSelected,
    placeholder,
    helpText,
    autocomplete,
    isRequired,
    altLink,
    icon,
    rightIcon,
    showError = true,
    ...props
}) {
    const [query, setQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState("please select");
    const filteredOption =
        query === ""
            ? options
            : options.filter((option) => {
                  return option[optionLabel].toLowerCase().includes(query.toLowerCase());
              });
    return (
        <Field name={name}>
            {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
                const handleChange = onChange(name);

                const getSelectedOption = () => {
                    const option = _.find(options, (opt) => opt[optionValue] === value);
                    return option;
                };

                const onSelect = (item) => {
                    // console.log("item", item);
                    // setSelectedOption(item);
                    const val = item ? item[optionValue] : "";
                    handleChange(val);
                    setTimeout(() => {
                        setQuery("");
                        onItemSelected && onItemSelected(item);
                    }, 100);
                };

                // const _format = (val) => {
                //     const option = _.find(options, (option) => option[optionValue] === val);
                //     if (!option) {
                //         return "";
                //     }
                //     return option[optionLabel];
                // };

                const formatValue = (option) => (format ? format(option) : option[optionLabel]);

                return (
                    <Combobox
                        as="fieldset"
                        value={getSelectedOption() || selectedOption}
                        onChange={onSelect}
                        className="space-y-2">
                        {label && (
                            <div className="flex justify-between items-center">
                                {label ? (
                                    <Combobox.Label
                                        htmlFor={name}
                                        className="text-2xs uppercase tracking-wider font-bold text-gray-900">
                                        {label}
                                    </Combobox.Label>
                                ) : (
                                    <span />
                                )}
                                {altLink && <div className="items-end">{altLink}</div>}
                            </div>
                        )}

                        <div className="relative">
                            {icon && (
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    {icon}
                                </div>
                            )}
                            <Combobox.Input
                                placeholder={placeholder}
                                // className="appearance-none font-medium placeholder-gray-400 block w-full bg-none bg-white disabled:bg-gray-50 disabled:text-gray-600 border border-slate-200 py-2.5 pl-3 pr-10 text-black focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                className={classNames(
                                    icon ? "pl-12" : "pl-4",
                                    touched && error ? "border-red-500" : "border-slate-200",
                                    extraClasses,
                                    // "border block w-full px-4 py-3 placeholder-gray-500 border-slate-200 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                                    "appearance-none font-medium border block w-full py-3 placeholder-gray-400 rounded-sm pr-12 focus:ring-primary focus:border-primary sm:text-sm caret-primary"
                                )}
                                onChange={(event) => setQuery(event?.target?.value)}
                                displayValue={(option) => {
                                    return option ? option[optionLabel] : " ";
                                }}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md pr-4 focus:outline-none">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                            </Combobox.Button>

                            {filteredOption.length === 0 && query !== "" && (
                                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        No result found.
                                    </div>
                                </Combobox.Options>
                            )}

                            {filteredOption.length > 0 && (
                                <Combobox.Options className="absolute z-10 mt-1.5 max-h-60 w-full divide-y divide-gray-100 overflow-auto bg-white py-0.5 sm:text-sm shadow-lg shadow-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {filteredOption.map((option, idx) => (
                                        <Combobox.Option
                                            key={idx}
                                            value={option}
                                            className={({ active }) =>
                                                classNames(
                                                    "relative cursor-pointer select-none py-3 pl-3 pr-10",
                                                    active ? "bg-primary text-white" : "text-gray-900"
                                                )
                                            }>
                                            {({ active, selected }) => (
                                                <>
                                                    <span
                                                        // onClick={() => onSelect(option)}
                                                        className={classNames(
                                                            "block truncate",
                                                            selected && "font-semibold"
                                                        )}>
                                                        {/*{option[optionLabel]}*/}
                                                        {formatValue(option)}
                                                    </span>

                                                    {selected && (
                                                        <span
                                                            className={classNames(
                                                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                active ? "text-white" : "text-primary"
                                                            )}>
                                                            <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Options>
                            )}
                        </div>

                        {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
                        {showError && (
                            <ErrorMessage name={name}>
                                {(msg) => <div className="text-xs text-red-500 opacity-80">{msg}</div>}
                            </ErrorMessage>
                        )}
                    </Combobox>
                );
            }}
        </Field>
    );
}
