import { Field, ErrorMessage } from "formik";
import { classNames } from "app/lib/utils";
import GooglePlacesField from "./locationField";

export default function Component({
    name,
    label,
    helpText,
    icon,
    altLink,
    rightIcon,
    extraClasses = "",
    onLocationSelected,
    format,
    ...props
}) {
    return (
        <Field name={name}>
            {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
                const formatValue = (val) => (format ? format(val) : val);
                const onSelected = (addr) => onLocationSelected && onLocationSelected(addr);
                return (
                    <fieldset className="relative">
                        {label && value && (
                            <div className="flex justify-between items-center">
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
                            <GooglePlacesField
                                autoComplete="x-raninpodx-"
                                onSelected={onSelected}
                                // onChange={onChange}
                                onBlur={onBlur}
                                value={formatValue(value)}
                                className={classNames(
                                    icon ? "pl-12" : "pl-4",
                                    rightIcon ? "pr-12" : "pr-4",
                                    touched && error && error[name] ? "border-red-500" : "border-slate-200",
                                    extraClasses,
                                    "border border-slate-200 block font-medium w-full py-3 placeholder-slate-400 rounded-sm focus:ring-black focus:border-black sm:text-sm caret-primary"
                                )}
                                {...props}
                            />
                            {rightIcon && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">{rightIcon}</div>
                            )}
                        </div>
                        {helpText && <p className="text-sm py-1 text-slate-400">{helpText}</p>}
                        <ErrorMessage name={name}>
                            {(msg) => <div className="text-xs text-red-500 py-1 opacity-80">{msg}</div>}
                        </ErrorMessage>
                    </fieldset>
                );
            }}
        </Field>
    );
}
