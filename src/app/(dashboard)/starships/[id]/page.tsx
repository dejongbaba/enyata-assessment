'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Loader} from "@/components/elements";
import ImageService from "@/services/images";
import StarshipsService from "@/services/starships";

export default function Page() {

    const param = useParams();
    const id = param.id;

    const [starship, setStarship] = useState();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);

    const getSingleStarship = async () => {
        try {
            const [starship, image] = await Promise.all([StarshipsService.getOneStarship(id), ImageService.getOne((Math.random() * 50) + 1)]);
            setStarship(starship?.data)
            setImage(image?.data?.url)
            console.log(
                'demo', starship, image
            )
            setLoading(false)
        } catch (e) {
            console.log('unable to get starship', e)

        }
    }
    useEffect(() => {

        getSingleStarship()


    }, [id])
    console.log('starship', starship)
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
                    alt={"starship"}
                    src={image || ''}
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
