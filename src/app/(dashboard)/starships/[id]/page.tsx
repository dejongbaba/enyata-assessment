'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Loader} from "next/dist/shared/lib/app-dynamic";
import StarshipsService from "@/services/starships";

export default function Page() {

    const router = useRouter();
    const id = router.query.id;
    const [starship, setStarship] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        StarshipsService.getOneStarship(id).then((res) => {
            setStarship(res)
            setLoading(false)
        }).catch((e) => {
            console.log('unable to get starship', e)
        })
    }, [id])

    if (loading) {
        return <Loader/>
    }
    return (
        <div className='flex flex-col sm:flex-row '>
            <div className='sm:w-[50%]'>
                <Image
                    className="flex w-full m-auto flex-shrink-0"
                    width={120}
                    height={20}
                    alt={"sendbox-logo"}
                    src={starship?.image}
                />
            </div>
            <div className='space-y-4 px-2 sm:px-6'>

                <h1 className='font-bold text-4xl '>{starship?.name || ''}</h1>
                <div className='space-y-1'>
                    <p><span>Designation:</span> <span>Sentient</span></p>
                    <p><span>Eye Colors: </span> <span>Blue, Green, Yellow</span></p>
                    <p><span>Average Lifespan:  </span> <span>400</span></p>
                </div>

            </div>
        </div>
    );
}
