'use client'
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/16/solid";
import {classNames} from "@/lib/utils";

function MobileMenu({open, onClose, contentClasses, children, withMask = true}) {
    const initialFocusRef = useRef();
    const [isOpen, setIsOpen] = useState(open || false);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const close = () => {
        setIsOpen(false);
        onClose && onClose();
    };
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                static
                as="div"
                className="relative z-50"
                open={isOpen}
                onClose={() => {
                    close();
                }}
                initialFocus={initialFocusRef}>
                {withMask && (
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>
                )}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none h-[100vh] fixed inset-y-0 left-0 flex max-w-full lg:pr-10">
                            <Transition.Child
                                as="div"
                                leaveFrom="translate-x-0"
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveTo="-translate-x-full">
                                <Dialog.Title
                                    as="div"
                                    className="h-16 border-b w-full flex flex-row justify-between items-center px-4 bg-primary space-x-4 lg:hidden">
                                    <button
                                        onClick={(e) => {
                                            close();
                                        }}
                                        ref={initialFocusRef}
                                        className="flex justify-center w-8 h-8 bg-slate-200 hover:text-white hover:bg-black rounded-full items-center text-black">
                                        <XMarkIcon strokeWidth={2.5} className="h-4 w-4"/>
                                    </button>
                                </Dialog.Title>
                                <Dialog.Panel
                                    className={classNames(
                                        "pointer-events-auto w-screen  max-w-4xl shadow",
                                        contentClasses
                                    )}>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className={classNames(
                                            "h-screen p-4 lg:p-6 overflow-y-auto ml-auto max-w-4xl bg-primary relative",
                                            contentClasses
                                        )}>
                                        <div className="w-full">{children}</div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default MobileMenu;
