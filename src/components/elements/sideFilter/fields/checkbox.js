import { Field } from "formik";
import { classNames } from "app/lib/utils";

export default function Component({
    name,
    label,
    helpText,
    type = "checkbox",
    extraClasses = "",
    altLink,
    format,
    icon,
    ...props
}) {
    return (
        <Field name={name}>
            {({ field: { onChange, onBlur, value } }) => {
                const formatValue = (val) => (format ? format(val) : val);
                return (
                    <fieldset className={classNames(helpText ? "items-start" : "items-center", "relative flex w-full")}>
                        <div className={classNames(helpText ? "mt-1.5" : "mt-0.5", "flex items-center h-5")}>
                            <input
                                id={name}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={formatValue(value)}
                                className={classNames(
                                    "w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary",
                                    extraClasses
                                )}
                                {...props}
                                type={"checkbox"}
                            />
                        </div>
                        {label && (
                            <div className="ml-3 space-y-0.5">
                                <label htmlFor={name} className="sm:text-sm font-semibold text-black">
                                    {label || ""}
                                </label>
                                {helpText && (
                                    <div className="block text-sm sm:text-xs text-slate-400 whitespace-normal max-w-md">
                                        {helpText}
                                    </div>
                                )}
                            </div>
                        )}
                    </fieldset>
                );
            }}
        </Field>
    );
}
