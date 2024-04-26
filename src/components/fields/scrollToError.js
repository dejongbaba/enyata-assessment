import { useFormikContext } from "formik";
import { useEffect } from "react";
import { isObject } from "lodash";

export default function Component({ ...props }) {
    const formik = useFormikContext();
    const getFirstErrorKey = (object, keys = []) => {
        const firstErrorKey = Object.keys(object)[0];
        if (isObject(object[firstErrorKey])) {
            return getFirstErrorKey(object[firstErrorKey], [...keys, firstErrorKey]);
        }
        return [...keys, firstErrorKey].join(".");
    };

    useEffect(() => {
        if (!formik.isValid && formik.submitCount !== 0 && formik.isSubmitting) {
            const firstErrorKey = getFirstErrorKey(formik.errors);
            if (window.document.getElementsByName(firstErrorKey).length) {
                window.document.getElementsByName(firstErrorKey)[0].scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                });
            }
        }
    }, [formik.submitCount, formik.isValid, formik.errors, formik.isSubmitting]);

    return null;
}
