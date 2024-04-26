import { ErrorMessage, Field } from "formik";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { classNames } from "app/lib/utils";

export default function Component({
    name,
    label,
    format,
    options = [],
    extraClasses = "",
    optionLabel = "name",
    optionValue = "code",
    onItemSelected,
    placeholder,
    showLabel = false,
    showError = true,
    enablePlaceholder = true,
    helpText,
    altLink,
    ...props
}) {
    return (
        <Field name={name}>
            {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
                const formatValue = (val) => (format ? format(val) : val);
                const handleChange = onChange(name);
                const onSelect = (item) => {
                    const val = item.target?.value;
                    handleChange(val);
                    setTimeout(() => {
                        const selected = options.find((option) => option[optionValue] === val);
                        onItemSelected && onItemSelected(selected);
                    }, 100);
                };
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
                        <div className="relative bg-white">
                            <select
                                required
                                id={name}
                                onChange={onSelect}
                                onBlur={onBlur}
                                value={formatValue(value)}
                                className={classNames(
                                    extraClasses,
                                    touched && error ? "border-red-500" : "border-slate-200",
                                    "appearance-none bg-none border border-slate-200 block font-medium w-full py-3 placeholder-slate-400 rounded-sm focus:ring-black focus:border-black focus:shadow-none sm:text-sm caret-primary disabled:bg-slate-100 py-3 pl-3 pr-10 text-black"
                                )}
                                {...props}>
                                {enablePlaceholder && (
                                    <option value="" disabled selected hidden>
                                        {placeholder || ""}
                                    </option>
                                )}
                                {options.map((c, idx) => (
                                    <option key={idx} value={c[optionValue]}>
                                        {c[optionLabel]}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4 text-black" aria-hidden="true" />
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
