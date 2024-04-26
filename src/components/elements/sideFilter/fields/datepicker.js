import { Field, ErrorMessage } from "formik";
import { classNames, formatDate } from "app/lib/utils";
import DatePicker from "react-datepicker";
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

export default function Component({
    name,
    label,
    helpText,
    extraClasses = "",
    altLink,
    placeholder,
    format,
    icon,
    showLabel = false,
    showError = true,
    rightIcon,
    ...props
}) {
    return (
        <Field name={name}>
            {({ field: { value }, form: { setFieldValue }, meta: { touched, error } }) => {
                const formatValue = (val) => (format ? format(val) : val);
                return (
                    <fieldset className="relative">
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
                                    <span />
                                )}
                            </div>
                        )}
                        {altLink && <div className="absolute z-10 -top-6 right-0">{altLink}</div>}
                        <div className="relative">
                            {icon && (
                                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    {icon}
                                </div>
                            )}
                            <DatePicker
                                id={name}
                                onChange={(val) => {
                                    setFieldValue(name, val, true);
                                }}
                                previousMonthButtonLabel={
                                    <ChevronLeftIcon
                                        strokeWidth={3}
                                        className="text-slate-400 hover:text-black h-4 w-4"
                                    />
                                }
                                nextMonthButtonLabel={
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="text-slate-400 hover:text-black h-4 w-4"
                                    />
                                }
                                selected={formatValue(value)}
                                placeholderText={placeholder}
                                className={classNames(
                                    icon ? "pl-12" : "pl-4",
                                    rightIcon ? "pr-12" : "pr-4",
                                    touched && error && error[name] ? "border-red-500" : "border-slate-200",
                                    extraClasses
                                )}
                                // calendarClassName="!border-slate-200 z-20 !shadow !font-sans !text-xs !font-medium !rounded-xs"
                                {...props}
                            />
                            <div className="absolute inset-y-0 top-0 right-0 h-full w-10 flex justify-center items-center text-black">
                                <ChevronUpDownIcon className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                        </div>
                        {helpText && <p className="text-xs py-1 text-slate-400">{helpText}</p>}
                        {showError && (
                            <ErrorMessage name={name}>
                                {(msg) => <div className="text-xs py-1 text-red-500 opacity-80">{msg}</div>}
                            </ErrorMessage>
                        )}
                    </fieldset>
                );
            }}
        </Field>
    );
}
