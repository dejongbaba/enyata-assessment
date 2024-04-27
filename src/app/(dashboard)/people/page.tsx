'use client'
import {Loader, Table} from '@/components/elements'
import {useEffect, useState} from "react";
import PeopleService from "@/services/people";
import {useRouter} from "next/navigation";

export default function Page() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        PeopleService.getPeople().then((res) => {
            console.log('people', res.data)
            setPeople(res?.data)
            setLoading(false)
        }).catch((e) => {
            console.log('unable to get person', e)
        })
    }, [])

    if (loading) {
        return <Loader/>
    }
    const onRowClick = (obj) => {
        router.push(`/people/${obj.id}`)
    }
    console.log('poeple', people)

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
            Header: "Birth Year",
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
            Header: "Gender",
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
            Header: "Hair color ",
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
            Header: "Height",
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
        }, {
            Header: "Created",
            accessor: "created",
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
        <div>
            <Table columnDefs={columnDefs} onRowClick={onRowClick} data={people}/>
        </div>
    );
}
