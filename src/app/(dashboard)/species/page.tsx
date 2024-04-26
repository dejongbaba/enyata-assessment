import {Table} from '@/components/elements'

export default function Page() {


    const columnDefs = [
        {
            Header: "",
            accessor: "img",
            className: "w-24",
            Cell: ({row: {original}}) => {
                return (
                    <div
                        className="w-16 h-16 bg-cover bg-center rounded-sm"
                        style={{
                            backgroundImage: `url(${
                                original.provider == "dhl" ? "/images/dhl.png" : "/images/fedex.png"
                            })`,
                        }}
                    />
                );
            },
        },

        {
            id: "name",
            Header: "Courier",
            accessor: "name",
            // className: "w-1/4",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1 uppercase">
                        <span className="">{`${[original?.name].join(" \u2010 ")}`}</span>
                        <span className="text-xs capitalize tracking-normal font-normal text-slate-400">
                            {original?.provider?.toUpperCase()}
                        </span>
                    </div>
                );
            },
        },
        {
            id: "services",
            Header: "Service type",
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
            Header: "Payment type",
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
                                (original?.payment_types?.length &&
                                    original?.payment_types?.map((s) => s.name).join(" \u2022 ")) ||
                                ""
                            }`}
                        </span>
                    </div>
                );
            },
        },
        {
            id: "is_active",
            Header: "Active",
            accessor: "is_active",
            className: "text-right",
            headerClassName: "w-28 text-right",
            Cell: ({value, row: {original}}) => {
                return (
                    <div className="flex flex-col space-y-1">
                        {original?.is_active ? (
                            <StatusLabel name="active" code="active"/>
                        ) : (
                            <StatusLabel name="inactive" code="inactive"/>
                        )}
                    </div>
                );
            },
        },
        {
            Header: "",
            accessor: "view",
            className: "w-28 text-right",
            headerClassName: "w-28 text-right",
            Cell: ({row: {original}}) => {
                return (
                    <button
                        type="button"
                        // onClick={() => onRowClick(original)}
                        className="text-gray-900 text-xs font-bold uppercase tracking-wider hover:text-primary-300">
                        view
                    </button>
                );
            },
        },
        {
            Header: "",
            accessor: "activate",
            className: "w-28 text-right",
            headerClassName: "w-28 text-right",
            Cell: ({row: {original}}) => {
                return (
                    <button
                        type="button"
                        onClick={() => {
                        }}
                        className="text-primary text-xs font-bold uppercase tracking-wider hover:text-primary-300">
                        {original?.is_active ? "Deactivate" : "Activate"}
                    </button>
                );
            },
        },
    ];
    return (
        <div>
            <Table columnDefs={columnDefs} objects={[]}/>
        </div>
    );
}
