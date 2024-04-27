'use client'
import {Loader, Table} from '@/components/elements'
import {useEffect, useState} from "react";
import SpeciesService from "@/services/species";
import {useRouter} from "next/navigation";

export default function Page() {


    const columnDefs = [
        {
            id: "name",
            Header: "Name",
            accessor: "name",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">
                        <span className="">{original?.username}</span>
                        {/*<span className="text-xs capitalize tracking-normal font-normal text-slate-400">*/}
                        {/*    {original?.provider?.toUpperCase()}*/}
                        {/*</span>*/}
                    </div>
                );
            },
        },
        {
            id: "services",
            Header: "Classification",
            accessor: "services",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">

                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">

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
            Header: "Eye Colors",
            accessor: "packages",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">
                        <span className="">

                        </span>
                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">
                            {
                                (original?.company?.name) ||
                                ""
                            }
                        </span>
                    </div>
                );
            },
        },
        {
            id: "payments",
            Header: "Hair Color ",
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
            Header: "Height ",
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
            Header: "Created",
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

    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        SpeciesService.getSpecies().then((res) => {
            setSpecies(res?.data)
            setLoading(false)
        }).catch((e) => {
            console.log('unable to get person', e)
        })
    }, [])

    const onRowClick = (obj) => {
        router.push(`/species/${obj.id}`)
    }
    console.log('species', species);
    if (loading) {
        return <Loader/>
    }
    return (
        <div className='space-y-4'>
            <h1 className={'text-slate-400 font-semibold text-2xl '}>Species</h1>
            <Table columnDefs={columnDefs} onRowClick={onRowClick} objects={species || []}/>
        </div>
    );
}
