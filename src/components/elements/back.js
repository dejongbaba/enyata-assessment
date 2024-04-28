import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

Back.propTypes = {};

function Back() {
    const router = useRouter();
    return (
        <div onClick={() => router.back()}
             className="absolute top-4 left-[24%] z-5 cursor-pointer flex items-center text-gray-400 space-x-2">
            <Image width={20} height={20} className='w-5 h-5' src='/images/svg/chevron_right.svg'></Image>
            <span>Back</span>
        </div>
    );
}

export default Back;
