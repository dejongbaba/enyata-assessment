import {ErrorMessage, Field} from "formik";
import {CheckCircleIcon, ChevronUpDownIcon} from "@heroicons/react/24/solid";
import {Combobox} from "@headlessui/react";
import {classNames} from "@/lib/utils";
import {useRef, useState} from "react";
import _ from "lodash";
import {XMarkIcon} from "@heroicons/react/24/outline";

export default function Component({
                                      name,
                                      label,
                                      format,
                                      optionFormat,
                                      options = [],
                                      extraClasses = "",
                                      optionLabel = "name",
                                      optionValue = "code",
                                      onItemSelected,
                                      placeholder,
                                      helpText,
                                      autocomplete,
                                      isRequired,
                                      altLink,
                                      icon,
                                      rightIcon,
                                      showCaret = true,
                                      showError = true,
                                      showLabel = false,
                                      ...props
                                  }) {
    const [query, setQuery] = useState("");
    const buttonRef = useRef();
    const [selectedOption, setSelectedOption] = useState("");
    const filteredOption =
        query === ""
            ? options
            : options.filter((option) => {
                return option[optionLabel].toLowerCase().includes(query.toLowerCase());
            });

    return (
        <Field name={name}>
            {({field: {onChange, onBlur, value}, meta: {touched, error}, form: {setFieldValue}}) => {
                const handleChange = onChange(name);

                const getSelectedOption = () => {
                    const option = _.find(options, (opt) => {
                        return opt[optionValue] === value;
                    });
                    return option;
                };

                const onSelect = (item) => {
                    const val = item ? item[optionValue] : "";
                    handleChange(val);
                    setTimeout(() => {
                        setQuery("");
                        onItemSelected && onItemSelected(item);
                    }, 20);
                };

                const formatValue = (option) => (format ? format(option) : option[optionLabel]);
                const formatOption = (option) => (optionFormat ? optionFormat(option) : option && option[optionLabel]);

                return (
                    <Combobox
                        as="fieldset"
                        nullable
                        value={getSelectedOption() || selectedOption}
                        onChange={onSelect}
                        className="relative">
                        {({open}) => {
                            console.log({open});
                            return (
                                <>
                                    {((label && Boolean(value)) || (label && showLabel)) && (
                                        <div className="flex justify-between items-center absolute">
                                            {label ? (
                                                <label
                                                    htmlFor={name}
                                                    className={classNames(
                                                        "text-2xs whitespace-nowrap uppercase tracking-wider font-bold text-slate-400 absolute z-10 left-1.5 -top-2 px-2 bg-white",
                                                        Boolean(value) && "text-primary"
                                                    )}>
                                                    {label}
                                                </label>
                                            ) : (
                                                <span/>
                                            )}
                                        </div>
                                    )}
                                    {altLink && <div className="absolute z-10 -top-6 right-0">{altLink}</div>}
                                    <div className="relative group">
                                        {icon && (
                                            <div
                                                className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                {icon}
                                            </div>
                                        )}
                                        {!open && (
                                            <div
                                                className="bg-transparent absolute z-10 w-full h-full"
                                                onClick={() => buttonRef?.current?.click()}
                                            />
                                        )}
                                        <Combobox.Input
                                            placeholder={placeholder}
                                            autoComplete={"off"}
                                            // className="appearance-none font-medium placeholder-slate-400 block w-full bg-none bg-white disabled:bg-slate-50 disabled:text-slate-600 border border-slate-200 py-2.5 pl-3 pr-10 text-black focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                            className={classNames(
                                                icon ? "pl-12" : "pl-4",
                                                touched && error ? "border-red-500" : "border-slate-200",
                                                extraClasses,
                                                // "border block w-full px-4 py-3 placeholder-slate-500 border-slate-200 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                                                "appearance-none font-medium border block w-full py-3 placeholder-slate-400 rounded-sm pr-12 focus:ring-black focus:border-black sm:text-sm caret-primary"
                                            )}
                                            onChange={(event) => setQuery(event?.target?.value)}
                                            displayValue={(option) => {
                                                return option && formatOption(option);
                                            }}
                                        />
                                        {selectedOption && (
                                            <span
                                                className={classNames(
                                                    showCaret ? "right-8" : "right-0",
                                                    "absolute inset-y-0 p-2 inline-flex justify-center items-center opacity-0 group-hover:opacity-100"
                                                )}>
                                                <span
                                                    onClick={() => {
                                                        setSelectedOption("");
                                                        setQuery("");
                                                        setFieldValue(name, "", false);
                                                    }}
                                                    className="w-6 h-6 cursor-pointer flex justify-center items-center rounded-full bg-slate-100 hover:text-white hover:bg-black">
                                                    <XMarkIcon strokeWidth={2} className="h-3 w-3"></XMarkIcon>
                                                </span>
                                            </span>
                                        )}
                                        {showCaret && (
                                            <Combobox.Button
                                                ref={buttonRef}
                                                className="absolute inset-y-0 right-0 flex items-center rounded-r-md pr-4 focus:outline-none">
                                                <ChevronUpDownIcon
                                                    className="h-5 w-5 text-slate-600"
                                                    aria-hidden="true"
                                                />
                                            </Combobox.Button>
                                        )}
                                        {rightIcon && (
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                {rightIcon}
                                            </div>
                                        )}
                                        {filteredOption.length === 0 && query !== "" && (
                                            <Combobox.Options
                                                className="absolute z-40 mt-1 max-h-60 w-full overflow-auto bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div
                                                    className="relative cursor-default select-none py-2 px-4 text-sm text-slate-700">
                                                    No result found.
                                                </div>
                                                {!!options?.length && options[0] && (
                                                    <Combobox.Option
                                                        value={options[0]}
                                                        className={({active}) =>
                                                            classNames(
                                                                "relative cursor-pointer select-none py-3 pl-3 pr-10",
                                                                active ? "bg-primary text-white" : "text-black"
                                                            )
                                                        }>
                                                        {({active, selected}) => (
                                                            <>
                                                                <span
                                                                    // onClick={() => onSelect(option)}
                                                                    className={classNames(
                                                                        selected && "font-semibold",
                                                                        "block truncate"
                                                                    )}>
                                                                    {/*{option[optionLabel]}*/}
                                                                    {formatValue(options[0], active, selected)}
                                                                </span>

                                                                {selected && (
                                                                    <span
                                                                        className={classNames(
                                                                            "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                            active ? "text-white" : "text-primary"
                                                                        )}>
                                                                        <CheckCircleIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                )}
                                            </Combobox.Options>
                                        )}
                                        {filteredOption.length > 0 && (
                                            <Combobox.Options
                                                className="absolute z-30 mt-1.5 max-h-60 w-full divide-y divide-slate-100 overflow-auto bg-white py-0.5 sm:text-sm shadow-lg shadow-slate-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {filteredOption.map((option, idx) => (
                                                    <Combobox.Option
                                                        key={idx}
                                                        value={option}
                                                        className={({active}) =>
                                                            classNames(
                                                                "relative cursor-pointer select-none py-3 pl-3 pr-10",
                                                                active ? "bg-primary text-white" : "text-black"
                                                            )
                                                        }>
                                                        {({active, selected}) => (
                                                            <>
                                                                <span
                                                                    // onClick={() => onSelect(option)}
                                                                    className={classNames(
                                                                        selected && "font-semibold",
                                                                        "block truncate"
                                                                    )}>
                                                                    {/*{option[optionLabel]}*/}
                                                                    {formatValue(option, active, selected)}
                                                                </span>

                                                                {selected && (
                                                                    <span
                                                                        className={classNames(
                                                                            "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                            active ? "text-white" : "text-primary"
                                                                        )}>
                                                                        <CheckCircleIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        )}{" "}
                                    </div>

                                    {helpText && (
                                        <p className="text-xs py-1 text-slate-400 whitespace-normal">{helpText}</p>
                                    )}
                                    {showError && (
                                        <ErrorMessage name={name}>
                                            {(msg) => <div className="text-xs py-1 text-red-500 opacity-80">{msg}</div>}
                                        </ErrorMessage>
                                    )}
                                </>
                            );
                        }}
                    </Combobox>
                );
            }}
        </Field>
    );
}
