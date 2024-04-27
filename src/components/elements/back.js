import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

Back.propTypes = {};

function Back() {
    const router = useRouter();
    return (
        <div onClick={() => router.back()} className="absolute top-0 left-[23%] z-5 flex space-x-2">
            <Image src='images/svg/chevron-right.svg'></Image>
            <span>Back</span>
        </div>
    );
}

export default Back;
