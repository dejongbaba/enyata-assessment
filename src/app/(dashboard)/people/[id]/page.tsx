'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import PeopleService from "@/services/people";
import {Back, Loader} from "@/components/elements";
import ImageService from "@/services/images";

export default function Page() {

    const param = useParams();
    const id = param.id;

    const [person, setPerson] = useState();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);

    const getSinglePerson = async () => {
        try {
            const [specie, image] = await Promise.all([PeopleService.getOnePerson(id), ImageService.getOne(parseInt((Math.random() * 50) + 1))]);
            console.log('person', specie, image)
            setPerson(specie?.data)
            setImage(image?.data?.url)
            setLoading(false)
        } catch (e) {
            console.log('unable to get person', e)

        }
    }
    useEffect(() => {
        getSinglePerson()
    }, [id])
    console.log('person', person)
    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <Back/>
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 '>
                <div className='sm:w-[50%]'>
                    <Image
                        className="flex w-full m-auto flex-shrink-0"
                        width={120}
                        height={20}
                        alt={"person"}
                        src={image}
                    />
                </div>
                <div className='space-y-4 sm:px-6'>
                    <h1 className='font-bold text-4xl '>{person?.name || ''}</h1>
                    <div className='space-y-1'>
                        <p><span>Designation:</span> <span>{person?.company?.bs || ''}</span></p>
                        <p><span>Eye Colors: </span> <span>{person?.website || ""}</span></p>
                        <p><span>Average Lifespan:  </span> <span>{person?.address?.zipcode || ''}</span></p>
                    </div>
                </div>
            </div>

        </div>
    );
}
