"use client"
import {Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Page() {

    const router = useRouter();
    useEffect(() => {
        router.push('/login')
    }, [router]);


    return (
        <>
            <Toaster/>
        </>
    );
}
