"use client";

import React, {useRef} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {Button, Input} from "@/components/fields";
import {useRouter} from "next/navigation";

interface IInitialValues {
    email: string,
    password: string,
}

export default function Component() {
    const formRef = useRef<IInitialValues>();
    const redirectTo = "/";

    const router = useRouter();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        // country: Yup.string().notRequired(""),
        email: Yup.string().email().required("Please enter a valid email address"),
        password: Yup.string().required("Please provide a password"),
    });

    const onCompleted = async (values) => {
        try {
            router.push('/home')
            // await login(values, redirectTo);
        } catch (errors) {
            if (errors) {
                formRef?.current?.setErrors(errors);
                formRef?.current?.setSubmitting(false);
            }
        }
    };

    return (
        <div className="w-full space-y-12 flex flex-col justify-start items-start">

            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                validateOnMount={true}
                onSubmit={(values) => {
                    onCompleted(values);
                }}>
                {({values, errors, handleSubmit, isValid, isSubmitting}) => {
                    return (
                        <form method="post" className="w-full border bg-white rounded-lg p-4 sm:p-8"
                              onSubmit={handleSubmit}>
                            <div className="space-y-8 w-full flex flex-col">
                                <div className="w-full space-y-1">
                                    <h1 className='text-2xl font-bold text-black'>Login </h1>
                                    <p className='font-medium text-sm text-slate-500 '>Kindly enter your details to
                                        log in </p>
                                </div>
                                <div className="w-full">
                                    <Input
                                        // icon={<AtSymbolIcon className="w-5 h-5 text-slate-400" />}

                                        label={"Email"}
                                        name={"email"}
                                        type={"text"}
                                        autoCapitalize={"off"}
                                        inputMode={"email"}
                                        placeholder={"Email address"}
                                    />
                                </div>
                                <div className="w-full">
                                    <Input
                                        // icon={<LockClosedIcon className="w-5 h-5 text-slate-400" />}
                                        label={"Password"}
                                        name={"password"}
                                        type={"password"}
                                        placeholder={"Password (required)"}
                                    />
                                </div>

                                <div className="w-full">
                                    <Button
                                        extraClasses={"w-full"}
                                        disabled={!isValid}
                                        loading={isSubmitting}
                                        type={"submit"}>
                                        {"Log in"}
                                    </Button>
                                </div>
                                <div className="w-full  text-center ">
                                    <a
                                        href="/forgot-password"
                                        className="text-sm whitespace-nowrap font-medium text-slate-500 hover:text-black underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <div className='mt-[5rem] text-sm text-center'>
                                    <a href='' className='text-slate-500'>Privacy policy</a> and <a href=""
                                                                                                    className='text-slate-500'>Terms
                                    of services</a>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}
