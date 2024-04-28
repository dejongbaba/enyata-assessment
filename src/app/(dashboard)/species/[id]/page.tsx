'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Back, Loader} from "@/components/elements";
import SpeciesService from "@/services/species";
import ImageService from "@/services/images";

export default function Page() {

    const param = useParams();
    const id = param.id;

    const [specie, setSpecie] = useState();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);

    const getSingleSpecie = async () => {
        try {
            const [specie, image] = await Promise.all([SpeciesService.getOneSpecie(id), ImageService.getOne(parseInt(Math.random() * 50) + 1)]);
            setSpecie(specie?.data)
            setImage(image?.data?.url)
            setLoading(false)
        } catch (e) {
            console.log('unable to get specie', e)

        }
    }
    useEffect(() => {

        getSingleSpecie()


    }, [id])
    console.log('specie', specie)
    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <Back/>

            <div className='flex flex-col sm:flex-row '>
                <div className='sm:w-[50%]'>
                    <Image
                        className="flex w-full m-auto flex-shrink-0"
                        width={120}
                        height={20}
                        alt={"sendbox-logo"}
                        src={image}
                    />
                </div>
                <div className='space-y-4 sm:px-6'>
                    <h1 className='font-bold text-4xl '>{specie?.name || ''}</h1>
                    <div className='space-y-1'>
                        <p><span>Designation:</span> <span>{specie?.company?.bs || ''}</span></p>
                        <p><span>Eye Colors: </span> <span>{specie?.website || ""}</span></p>
                        <p><span>Average Lifespan:  </span> <span>{specie?.address?.zipcode || ''}</span></p>
                    </div>
                </div>
            </div>

        </div>

    );
}
