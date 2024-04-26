"use client";

import { useFormikContext, getIn } from "formik";
import { Switch } from "@headlessui/react";
import { classNames } from "app/lib/utils";
import { useState, useEffect } from "react";

export default function Component({ name, label }) {
    const [enabled, setEnabled] = useState(false);

    const { values, setFieldValue } = useFormikContext();
    const value = getIn(values, name);

    return (
        <Switch.Group as="div" className="flex items-center justify-between">
            {label && (
                <Switch.Label as="span" className="">
                    <span>{label}</span>
                </Switch.Label>
            )}
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                    "relative inline-flex items-center h-6 w-12 flex-shrink-0 cursor-pointer rounded-full duration-200 ease-in-out ring focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    enabled ? "bg-slate-500" : "bg-gray-200"
                )}>
                <span
                    className={classNames(
                        enabled ? "translate-x-6" : "translate-x-0",
                        "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                />
            </Switch>
        </Switch.Group>
    );
}
