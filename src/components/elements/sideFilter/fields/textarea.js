import { Field, ErrorMessage } from "formik";
import { classNames } from "app/lib/utils";

export default function Component({
    name,
    label,
    helpText,
    extraClasses = "",
    altLink,
    format,
    icon,
    showError = true,
    rightIcon,
    ...props
}) {
    return (
        <Field name={name}>
            {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
                const formatValue = (val) => (format ? format(val) : val);
                return (
                    <fieldset className="relative">
                        {label && value && (
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
                            <textarea
                                id={name}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={formatValue(value)}
                                className={classNames(
                                    icon ? "pl-12" : "pl-4",
                                    rightIcon ? "pr-12" : "pr-4",
                                    touched && error ? "border-red-500" : "border-slate-200",
                                    extraClasses,
                                    // "border block w-full px-4 py-3 placeholder-slate-500 border-slate-200 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                                    "border block font-medium w-full py-3 placeholder-slate-400 rounded-sm focus:ring-black focus:border-black sm:text-sm caret-primary h-28 resize-none"
                                )}
                                {...props}
                            />
                            {rightIcon && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">{rightIcon}</div>
                            )}
                        </div>
                        {helpText && <p className="text-xs text-slate-400">{helpText}</p>}

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
