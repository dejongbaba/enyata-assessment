import { ErrorMessage, useFormikContext } from "formik";
import { classNames } from "app/lib/utils";

import * as FileStack from "filestack-js";
import settings from "app/config/settings";

export default function Component({
    name,
    label,
    helpText,
    accept = ["image/*"],
    maxFiles = 8,
    maxSize = 4 * 1024 * 1024,
    fromSources = ["local_file_system"],
    groupClass = "w-full grid grid-cols-1 relative z-0 md:grid-cols-2 gap-4",
    itemClass = "border border-slate-200 inline-flex font-medium w-full py-3.5 px-3.5 placeholder-slate-400 rounded-sm text-sm cursor-pointer justify-center items-center",
    options = [],
    optionLabel = "name",
    optionValue = "code",
    checkboxVisible = false,
    multiple = false,
    checkboxClass = "w-4 h-4 text-primary border-slate-200 rounded-full focus:ring-primary mr-4",
    selectedOptionClass = "bg-indigo-50 text-primary",
    altLink,
    format,
    extraClasses = "",
    ...props
}) {
    const { values, errors, touched, setFieldValue } = useFormikContext();
    // const formatValue = (option) => (format ? format(option) : option[optionLabel]);

    const images = values[name] || [];

    const uploader = FileStack.init(settings.filestackAPIKey);

    const onUploadClick = () => {
        uploader && uploader.picker(pickerOptions).open();
    };

    const onUploadDone = (resp) => {
        const { filesUploaded = [] } = resp;
        setFieldValue(name, filesUploaded, true);
    };

    const onRemoveClick = (i) => {
        const newImages = images.filter((tag, index) => index !== i);
        setFieldValue(name, newImages, true);
    };

    const pickerOptions = {
        fromSources,
        accept,
        maxFiles,
        maxSize,
        // displayMode: "inline",
        container: "#uploader",

        transformations: {
            crop: true,
            rotate: true,
        },
        onUploadDone,
    };

    return (
        <div className="space-y-2">
            {images?.length > 0 ? (
                <div className="w-full grid grid-cols-4 gap-4">
                    {images.map((img, idx) => {
                        const { url } = img;
                        return (
                            <div
                                key={idx}
                                className="col-span-1 h-36 bg-white border border-slate-200 border-dashed flex justify-center items-center relative">
                                <img src={url} className="object-center object-cover bg-white h-full w-full" alt="" />
                                <button
                                    onClick={() => onRemoveClick(idx)}
                                    className="absolute text-2xs uppercase font-medium tracking-wider -bottom-6 text-primary right-0">
                                    remove
                                </button>
                            </div>
                        );
                    })}
                    <div
                        id={"uploader"}
                        onClick={onUploadClick}
                        className="col-span-1 h-36 bg-white border cursor-pointer border-slate-200 border-dashed relative flex justify-center items-center">
                        <p className="text-2xs uppercase font-medium tracking-wider text-primary">Add image</p>
                    </div>
                </div>
            ) : (
                <div
                    id={"uploader"}
                    onClick={onUploadClick}
                    className={classNames(
                        touched[name] && errors[name] ? "border-red-500" : "border-slate-200",
                        "h-36 border border-slate-200 w-1/4 border-dashed bg-white text-center justify-center items-center cursor-pointer flex flex-col"
                    )}>
                    <p className="text-sm font-semibold">Add Images</p>
                    <p className="text-xs text-slate-400">click to upload</p>
                </div>
            )}
            {helpText && <p className="text-xs text-slate-400">{helpText}</p>}
            <ErrorMessage name={name}>
                {(msg) => <div className="text-xs text-red-500 opacity-80">{msg}</div>}
            </ErrorMessage>
        </div>
    );
}
