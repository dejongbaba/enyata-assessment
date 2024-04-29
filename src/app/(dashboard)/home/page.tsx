'use client'
import {useEffect, useState} from "react";
import PeopleService from "@/services/people";
import {Loader, Table} from "@/components/elements";
import SpeciesService from "@/services/species";
import StarshipsService from "@/services/starships";

export default function Page() {

    const [overview, setOverview] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllOverview = async () => {
        try {
            const [poeple, species, starships] = await Promise.all([PeopleService.getPeople(), SpeciesService.getSpecies(), StarshipsService.getStarships()])
            setLoading(false)
            console.log('poeple', poeple, species, starships)
            setOverview([poeple?.data, species?.data, starships?.data])
        } catch (e) {
            console.log('e', e)
        }
    }
    useEffect(() => {
        getAllOverview()

    }, []);
    if (loading) {
        return <Loader/>
    }

    const columnDefs = [
        {
            id: "name",
            Header: "Film Title",
            accessor: "name",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">
                        <span className="">{`${[original?.username].join(" \u2010 ")}`}</span>
                        {/*<span className="text-xs capitalize tracking-normal font-normal text-slate-400">*/}
                        {/*    {original?.provider?.toUpperCase()}*/}
                        {/*</span>*/}
                    </div>
                );
            },
        },
        {
            id: "services",
            Header: "Release Date",
            accessor: "services",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">
                        {/*<span className="">*/}
                        {/*    {`${[...original?.service_types?.map((s) => s.name)].join(" \u2022 ")}`}*/}
                        {/*</span>*/}
                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">
                            {/*{original?.region}*/}
                            {/*{`${[...original?.service_types?.map((s) => s.name)].join(" \u2022 ")}`}*/}
                            {`${
                                (original?.phone ||
                                    "")
                            }`}
                        </span>
                    </div>
                );
            },
        },
        {
            id: "packages",
            Header: "Director",
            accessor: "packages",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">
                        <span className="">
                            {/*    {`${[...original?.package_types?.map((s) => s.name)].join(*/}
                            {/*    " \u2022 "*/}
                            {/*)}`}*/}
                        </span>
                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">
                            {/*{original?.region}*/}
                            {`${
                                (original?.company?.name) ||
                                ""
                            }`}
                            {/*{`${[...original?.package_types?.map((s) => s.name)].join(" \u2022 ")}`}*/}
                        </span>
                    </div>
                );
            },
        },
        {
            id: "payments",
            Header: "Producer ",
            accessor: "payments",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">
                        <span className="">

                        </span>
                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">
                            {/*{original?.region}*/}
                            {`${
                                (original?.address?.city) ||
                                ""
                            }`}
                        </span>
                    </div>
                );
            },
        },
        {
            Header: "Episode ID",
            accessor: "view",
            className: "w-28 text-right",
            headerClassName: "w-28 text-right",
            Cell: ({row: {original}}) => {
                return (
                    <div>
                        {original?.address?.suite || ''}
                    </div>
                );
            },
        },
        {
            Header: "Character",
            accessor: "activate",
            className: "w-28 text-right",
            headerClassName: "w-28 text-right",
            Cell: ({row: {original}}) => {
                return (
                    <div>
                        {original?.website || ''}
                    </div>
                );
            },
        },
    ];

    return (
        <div className=''>
            <div className='flex flex-col sm:flex-row  space-y-2 sm:space-x-8 mb-8 '>
                {overview?.length && overview?.map((o, i) => {
                    const titles = ['People', 'Starship', 'Species'];
                    const colors = ['bg-pinkie', 'bg-blueBright', 'bg-yellowBright'];
                    const random = (Math.random() + 1) * 6 + 5;
                    console.log('o', o)
                    return <div key={i} className="card p-4 h-[150px] space-y-6 sm:w-[25%] shadow-lg rounded-lg ">
                        <div className='flex justify-between'>
                            <h2 className='font-bold text-2xl '>{titles[i]}</h2>
                            <div className={`w-8 h-8  rounded-lg  ${colors[i]}`}></div>
                        </div>
                        <div className='space-y-1'>
                            <p className='font-bold text-lg'>{o?.length}</p>
                            <p className='text-green-500'>{o.slice(0, random)?.length} more than yesterday</p>
                        </div>
                    </div>
                })}
            </div>

            <Table columnDefs={columnDefs} objects={overview?.[0] || []}/>

        </div>
    );
}
