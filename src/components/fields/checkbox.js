import {Field} from "formik";
import {classNames} from "@/lib/utils";
import * as _ from "lodash";

export default function Component({
                                      name,
                                      label,
                                      helpText,
                                      type = "checkbox",
                                      extraClasses = "",
                                      altLink,
                                      format,
                                      icon,
                                      onItemChange,
                                      checked,
                                      ...props
                                  }) {
    const handleChange = (item) => {
        onItemChange && onItemChange(item);
    };

    return (
        <Field name={name}>
            {({field: {onChange, onBlur, value}}) => {
                const formatValue = (val) => (format ? format(val) : val);

                const isChecked = (_.isArray(value) && value?.includes(props.value)) || checked;
                return (
                    <fieldset className={classNames(helpText ? "items-start" : "items-center", "relative flex w-full")}>
                        <div className={classNames(helpText ? "mt-1.5" : "mt-0.5", "flex items-center h-5")}>
                            <input
                                id={name}
                                onChange={onItemChange ? handleChange : onChange}
                                onBlur={onBlur}
                                checked={isChecked}
                                value={props.value ? formatValue(props.value) : value}
                                className={classNames(
                                    "w-4 h-4 text-primary border-slate-200 rounded focus:ring-primary",
                                    extraClasses
                                )}
                                {...props}
                                type={"checkbox"}
                            />
                        </div>
                        {label && (
                            <div className="ml-3 space-y-0.5 whitespace-normal">
                                <label htmlFor={name} className="sm:text-sm font-semibold text-black">
                                    {label || ""}
                                </label>
                                {helpText && (
                                    <div className="block text-sm sm:text-xs text-gray-400 whitespace-normal max-w-md">
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
