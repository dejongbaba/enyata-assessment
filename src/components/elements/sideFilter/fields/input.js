import { Field, ErrorMessage } from "formik";
import { classNames } from "app/lib/utils";
import { useEffect } from "react";

export default function Component({
    name,
    label,
    helpText,
    extraClasses = "",
    onInputChanged,
    altLink,
    format,
    placeholder,
    icon,
    showError = true,
    showLabel = false,
    rightIcon,
    ...props
}) {
    return (
        <Field name={name}>
            {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
                const formatValue = (val) => (format ? format(val) : val);
                // const handleChange = onChange(name);
                // const handleBlur = onBlur(name);
                useEffect(() => {
                    onInputChanged && onInputChanged(value);
                }, [value]);

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
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    {icon}
                                </div>
                            )}
                            <input
                                id={name}
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholder={placeholder}
                                value={formatValue(value)}
                                className={classNames(
                                    icon ? "pl-12" : "pl-4",
                                    rightIcon ? "pr-12" : "pr-4",
                                    // touched && error && error[name] ? "border-red-500" : "border-slate-200",
                                    touched && error ? "border-red-500" : "border-slate-200",
                                    "border border-slate-200 block font-medium w-full py-3 placeholder-slate-400 rounded-sm focus:ring-black focus:border-black focus:shadow-none sm:text-sm caret-primary disabled:bg-slate-100",
                                    extraClasses
                                )}
                                {...props}
                            />
                            {rightIcon && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">{rightIcon}</div>
                            )}
                        </div>
                        {helpText && <p className="text-xs py-2 text-slate-400">{helpText}</p>}
                        {showError && (
                            <ErrorMessage name={name}>
                                {(msg) => {
                                    return <div className="text-xs block py-1 text-red-500 opacity-80">{msg}</div>;
                                }}
                            </ErrorMessage>
                        )}
                    </fieldset>
                );
            }}
        </Field>
    );
}
