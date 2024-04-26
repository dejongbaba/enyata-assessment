import { ErrorMessage, Field, useFormikContext } from "formik";
import { classNames } from "app/lib/utils";
import { useEffect, useState } from "react";
import _ from "lodash";
import { XMarkIcon } from "@heroicons/react/24/solid";
// import { WithContext as ReactTags } from "react-tag-input";
// ReactTags blows up with normal imports, dynamic imports are required to make it work

import dynamic from "next/dynamic";

let ReactTags;

ReactTags = dynamic(() => import("react-tag-input").then((mod) => mod.WithContext), { ssr: false });

const Keys = {
    TAB: 9,
    SPACE: 32,
    COMMA: 188,
    ENTER: 13,
};
const delimiters = [Keys.COMMA, Keys.SPACE, Keys.ENTER];

export default function Component({
    name,
    label,
    format,
    options = [],
    extraClasses = "",
    optionLabel = "name",
    optionValue = "code",
    autoFocus = "false",
    onItemSelected,
    placeholder,
    helpText,
    autocomplete,
    isRequired,
    altLink,
    icon,
    showLabel = false,
    showError = true,
    rightIcon,
    ...props
}) {
    return (
        <Field name={name}>
            {({ field: { onChange, onBlur, value }, meta: { touched, error }, form: { setFieldValue, values } }) => {
                // const { values, setFieldValue, setFieldError, validateField, errors, touched } = useFormikContext();
                const initialTags =
                    values && values[name] && _.isArray(values[name])
                        ? _.filter(options, (elem) => values[name].includes(elem[optionLabel]))
                        : values[name] || value?.map((v) => ({ name: v, code: v })) || [];
                console.log("tagsoo", { value: values[name], values, name, initialTags });
                const [tags, setTags] = useState(initialTags);

                // useEffect(() => {
                //     if (initialTags?.length) {
                //         setTags(initialTags);
                //     }
                // }, [initialTags]);
                // Bugfix on suggestions. It requires an id field to work properly
                const suggestions = _.map(options, (opt) => {
                    return { id: opt[optionValue], [optionLabel]: opt[optionLabel] };
                }).filter((el) => el.id !== undefined);

                // set formik values for tag input
                const setFormValues = (tags) => {
                    const newValues = _.map(tags, (tag) => tag[optionLabel]);
                    console.log({ tags, newValues });
                    setFieldValue(name, newValues, true);
                };

                const handleDelete = (i) => {
                    const newTags = tags.filter((tag, index) => index !== i);

                    // re-render
                    setTags(newTags);
                    setFormValues(newTags);
                };

                const handleAddition = (tag) => {
                    const newTags = [...tags, tag];

                    // re-render
                    setTags(newTags);
                    setFormValues(newTags);
                };

                const handleDrag = (tag, currPos, newPos) => {
                    const newTags = tags.slice();

                    newTags.splice(currPos, 1);
                    newTags.splice(newPos, 0, tag);

                    // re-render
                    setTags(newTags);
                    setFormValues(newTags);
                };

                const handleTagClick = (index) => {
                    console.log("The tag at index " + index + " was clicked");
                };

                const markIt = (input, query) => {
                    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
                    return {
                        __html: input.replace(RegExp(escapedRegex, "gi"), (x) => {
                            return `<mark>${escape(x)}</mark>`;
                        }),
                    };
                };

                const tagClassNames = {
                    tags: classNames(
                        rightIcon ? "pr-12" : "pr-4",
                        touched && touched[name] && errors && errors[name] ? "border-red-500" : "border-slate-200",
                        extraClasses,
                        "ReactTags__wrapper bg-white border border-slate-200 block relative font-medium w-full py-1.5 px-4 rounded-sm focus-within:ring-1 focus-within:ring-primary focus-within:border-primary gap-2"
                    ),
                    selected: "flex flex-wrap gap-2",
                    tagInput: "ReactTags__TagInput inline !w-1/5",
                    tag: "ReactTags__tag rounded-sm bg-slate-100 inline-flex justify-center items-center text-sm font-medium py-1 pl-2.5 pr-1.5",
                    tagInputField:
                        "border-0 inline-block w-auto outline-none ring-0 placeholder-slate-400 focus:outline-none focus:ring-0 sm:text-sm caret-primary py-1.5 px-0 pr-4 inline-block",
                    suggestions:
                        "absolute z-10 mt-1.5 max-h-60 w-1/2 divide-y divide-slate-200 overflow-auto bg-white py-0.5 sm:text-sm shadow shadow-slate-200 focus:outline-none",
                    activeSuggestion: "bg-primary text-white",
                };

                // console.log("tagClassNames", tagClassNames, ReactTags);
                console.log("tags", tags);
                return (
                    <fieldset className="relative">
                        {((label && tags?.length > 0) || (label && showLabel)) && (
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
                        {ReactTags ? (
                            <ReactTags
                                tags={tags}
                                classNames={tagClassNames}
                                suggestions={suggestions}
                                placeholder={placeholder}
                                labelField={optionLabel}
                                delimiters={delimiters}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                handleTagClick={handleTagClick}
                                inputFieldPosition={"inline"}
                                autoComplete={1}
                                autofocus={false}
                                removeComponent={({ onRemove }) => {
                                    return (
                                        <button className="flex justify-center items-center py-1" onClick={onRemove}>
                                            <XMarkIcon className="ml-1.5 h-3 w-3 mt-0.5 text-slate-400 hover:text-black" />
                                        </button>
                                    );
                                }}
                                renderSuggestion={(tag, query) => {
                                    const text = tag[optionLabel];
                                    return (
                                        <p
                                            dangerouslySetInnerHTML={markIt(text, query)}
                                            className="relative w-full border-b border-100 cursor-pointer select-none py-3 pl-3 pr-5"
                                        />
                                    );
                                }}
                            />
                        ) : (
                            <input
                                placeholder={placeholder}
                                className="border border-slate-200 block font-medium w-full py-3 placeholder-slate-400 rounded-sm focus:ring-black focus:border-black sm:text-sm caret-primary"
                                type="text"
                            />
                        )}
                        {helpText && <p className="text-xs py-1 text-slate-400">{helpText}</p>}
                        <ErrorMessage name={name}>
                            {(msg) => <div className="text-xs py-1 text-red-500 opacity-80">{msg}</div>}
                        </ErrorMessage>
                    </fieldset>
                );
            }}
        </Field>
    );
}
