import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "app/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Component({
    items = [],
    anchor = "left",
    labelProp = "name",
    valueProp = "code",
    value = "",
    extraClasses = "",
    extraMenuClasses = "",
    extraItemClasses = "",
    showCaret = true,
    format,
    caret,
    formatLabel,
    onItemSelected,
}) {
    console.log("currency items", items);
    const [selectedItem, setSelectedItem] = useState({});
    const _formatLabel = (item) => {
        const label = formatLabel ? formatLabel(item) : item ? item[labelProp] || "" : "";
        return label;
    };

    const _format = (item) => {
        const label = format ? format(item) : item ? item[labelProp] || "" : "";
        return label;
    };

    useEffect(() => {
        const initialItem = _.find(items, (item) => item[valueProp] === value);
        setSelectedItem(initialItem);
    }, [value]);

    return (
        <Menu as="div" className="relative z-20">
            <Menu.Button
                type="button"
                className={classNames(
                    "flex items-center bg-transparent py-0 whitespace-nowrap gap-2 text-sm font-semibold tracking-tight",
                    extraClasses
                )}>
                {_formatLabel(selectedItem)}
                {showCaret &&
                    (caret ? (
                        <>{caret}</>
                    ) : (
                        <ChevronDownIcon strokeWidth={2.5} className="mt-0.5 h-4 w-4" aria-hidden="true" />
                    ))}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className={classNames(
                        anchor === "left" ? "left-0" : "right-0",
                        "absolute z-50 bg-white mt-2 min-w-48 max-w-lg origin-top-right overflow-hidden rounded-sm overflow-auto bg-white sm:text-sm shadow-lg shadow-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none",
                        extraMenuClasses
                    )}>
                    <div className="divide-y divide-gray-100">
                        {!!items?.length &&
                            items.map((item, idx) => {
                                return (
                                    <Menu.Item key={idx}>
                                        {({ active }) => (
                                            <a
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    onItemSelected && onItemSelected(item);
                                                }}
                                                className={classNames(
                                                    active ? "bg-primary text-white" : "text-gray-900",
                                                    "block relative cursor-pointer font-medium select-none hover:font-medium py-3 pl-3 pr-10 whitespace-nowrap",
                                                    extraItemClasses
                                                )}>
                                                {_format(item)}
                                            </a>
                                        )}
                                    </Menu.Item>
                                );
                            })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
