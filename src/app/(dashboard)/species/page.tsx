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
                        <span className="">{original?.name}</span>
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
                        {/*<span className="">*/}
                        {/*    {`${[...original?.service_types?.map((s) => s.name)].join(" \u2022 ")}`}*/}
                        {/*</span>*/}
                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">
                            {/*{original?.region}*/}
                            {/*{`${[...original?.service_types?.map((s) => s.name)].join(" \u2022 ")}`}*/}
                            {`${
                                (original?.service_types?.length &&
                                    original?.service_types?.map((s) => s.name).join(" \u2022 ")) ||
                                ""
                            }`}
                        </span>
                    </div>
                );
            },
        },
        {
            id: "packages",
            Header: "Package type",
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
                                (original?.package_types?.length &&
                                    original?.package_types?.map((s) => s.name).join(" \u2022 ")) ||
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
            Header: "Eye Color",
            accessor: "payments",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    original?.url
                );
            },
        },
        {
            Header: "Ear Color",
            accessor: "view",
            className: "w-28 text-right",
            headerClassName: "w-28 text-right",
            Cell: ({row: {original}}) => {
                return (
                    original?.url
                );
            },
        },
        {
            Header: "Height",
            accessor: "activate",
            className: "w-28 text-right",
            headerClassName: "w-28 text-right",
            Cell: ({row: {original}}) => {
                return (
                    original?.url
                );
            },
        }, {
            Header: "Created",
            accessor: "created",
            className: "w-28 text-right",
            headerClassName: "w-28 text-right",
            Cell: ({row: {original}}) => {
                return (
                    original?.url
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
        <div>
            <Table columnDefs={columnDefs} onRowClick={onRowClick} objects={species || []}/>
        </div>
    );
}
