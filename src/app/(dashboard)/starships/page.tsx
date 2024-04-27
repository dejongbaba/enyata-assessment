'use client'
import {Loader, Table} from '@/components/elements'
import {useEffect, useState} from "react";
import StarshipsService from "@/services/starships";
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
            Header: "Model",
            accessor: "services",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">

                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">

                            {
                                (original?.phone ||
                                    "")
                            }
                        </span>
                    </div>
                );
            },
        },
        {
            id: "packages",
            Header: "Class",
            accessor: "packages",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">

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
            Header: "Passenger ",
            accessor: "payments",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">
                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">
                            {
                                (original?.address?.city) ||
                                ""
                            }
                        </span>
                    </div>
                );
            },
        },
        {
            Header: "Length ",
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

    const router = useRouter();
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        StarshipsService.getStarships().then((res) => {
            setStarships(res?.data)
            setLoading(false)
        }).catch((e) => {
            console.log('unable to get person', e)
        })
    }, [])

    const onRowClick = (obj) => {
        router.push(`/starships/${obj.id}`)
    }

    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <Table columnDefs={columnDefs} onRowClick={onRowClick} objects={starships || []}/>
        </div>
    );
}
