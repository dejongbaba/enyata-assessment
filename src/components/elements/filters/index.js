import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { classNames } from "app/lib/utils";
import { useRouter } from "next/router";
import {
    ArrowsUpDownIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import qs from "qs";
import DateTimeForm from "./datetime";
import NumericForm from "./numeric";
import TextForm from "./text";
import SelectForm from "./select";
import OptionsForm from "./options";
import MultiForm from "./muliple";
import ChoiceMenu from "../menu";
import { formatNumber } from "app/lib/formatters";
import _ from "lodash";

const demoFilters = [
    { name: "Date", code: "date", type: "datetime" },
    { name: "Amount", code: "amount", type: "numeric" },
    { name: "Code", code: "code", type: "text" },
    { name: "Status", code: "status", type: "options" },
    { name: "Country", code: "country", type: "select" },
    { name: "Merchant", code: "merchant", type: "multiple" },
];

const FilterPopover = ({ name, code, type, options = [], searchFunc, onSubmit }) => {
    let FilterForm;
    switch (type) {
        case "datetime":
            FilterForm = DateTimeForm;
            break;
        case "numeric":
            FilterForm = NumericForm;
            break;
        case "text":
            FilterForm = TextForm;
            break;
        case "options":
            FilterForm = OptionsForm;
            break;
        case "select":
            FilterForm = SelectForm;
            break;
        case "multiple":
            FilterForm = MultiForm;
    }

    return (
        <Popover as="div" className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        type="button"
                        className={classNames(
                            open ? "bg-black border-black text-white" : "text-black bg-gray-100 border-gray-100",
                            "px-4 py-2 text-sm font-medium rounded-full tracking-tight flex justify-between gap-2 items-center hover:bg-gray-200 hover:text-black transition-all"
                        )}>
                        <span className="whitespace-nowrap">{name}</span>
                        <ChevronDownIcon className={classNames(open ? "rotate-180" : "", "h-4 w-4 transition-all")} />
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Popover.Panel className="absolute z-20 left-0 p-4 mt-2 w-[360px] rounded border border-gray-200 bg-white origin-top-right bg-white text-sm shadow shadow-gray-200 focus:outline-none">
                            {({ close }) => (
                                <FilterForm
                                    name={name}
                                    code={code}
                                    options={options}
                                    searchFunc={searchFunc}
                                    onSubmit={(values) => {
                                        onSubmit && onSubmit(values);
                                        close();
                                    }}
                                />
                            )}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default function Component({
    filters = demoFilters,
    sorters = [],
    showFilters = true,
    showSearch = true,
    showPagination = true,
    showSorters = true,
    metadata = {},
}) {
    console.log("metadata in filter", metadata);
    const router = useRouter();

    const _onSubmitted = useCallback(
        (data) => {
            const { pathname, asPath } = router;
            const initialQueryString = asPath.replace(pathname, "").trim();
            const parsedQuery = qs.parse(initialQueryString, { ignoreQueryPrefix: true, allowDots: true });

            const updatedQuery = { ...parsedQuery, ...data };
            const queryString = qs.stringify(updatedQuery, { skipNulls: true, encode: false, allowDots: true });
            const updatedPath = `${pathname}?${queryString}`;

            console.log({ initialQueryString, parsedQuery, updatedQuery, queryString });
            //    cannot use router.push here due to nested dict constraints
            router.push(updatedPath);
        },
        [router]
    );

    // const _clearFilters = useCallback(() => {
    //     const {
    //         pathname,
    //         query: { view },
    //     } = router;
    //     const query = _.omit({ view }, _.identity);
    //     router.push({ pathname, query });
    // }, [router]);

    const changePage = useCallback((isNext) => {
        console.log({ metadata });
        const params = Object.fromEntries(new URLSearchParams(window.location.search));

        let page = parseInt(params.page) || 1;

        if (isNext) {
            if (metadata?.page_by?.next_page) {
                page = parseInt(metadata.page_by.next_page);
            }
        } else {
            if (metadata?.page_by?.prev_page) {
                page = parseInt(metadata.page_by.prev_page);
            }
        }

        params.page = page.toString();

        const queryString = qs.stringify(params, {
            skipNulls: true,
            encode: false,
            allowDots: true,
        });

        const updatedPath = `${window.location.pathname}?${queryString}`;

        router.push(updatedPath);
    }, []);

    return (
        <div className="flex justify-between items-center py-3.5">
            {/*<div className="w-0" />*/}
            {showFilters && filters.length > 0 ? (
                <div className="flex justify-start backdrop-blur-sm bg-white/10 items-center gap-2.5 mr-4">
                    {/*<button*/}
                    {/*    onClick={_clearFilters}*/}
                    {/*    className="text-primary p-0.5 text-xs font-medium flex items-center whitespace-nowrap hover:text-primary tracking-wide transition-all">*/}
                    {/*    <FunnelIcon className="h-4 w-4 mr-1" /> Add Filters*/}
                    {/*</button>*/}
                    {filters.map((filter, idx) => {
                        const { name, code, type, options, searchFunc } = filter;
                        return (
                            <FilterPopover
                                key={idx}
                                name={name}
                                code={code}
                                type={type}
                                options={options}
                                searchFunc={searchFunc}
                                onSubmit={_onSubmitted}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex"></div>
            )}
            {showSearch && (
                <div className="flex w-full flex-1 relative group">
                    <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-black">
                        <MagnifyingGlassIcon strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder={"Search"}
                        className="w-full transition-all border bg-gray-100 focus:bg-white border-gray-100 block font-medium w-full pl-9 py-1.5 placeholder-gray-400 rounded-full focus:ring-black focus:border-black focus:shadow-none sm:text-sm caret-primary"
                    />
                </div>
            )}
            <div className="ml-4 flex justify-end items-center gap-2 backdrop-blur-sm bg-white/10">
                {/* Sorting */}
                {showSorters && sorters?.length > 0 && (
                    <div className="">
                        <ChoiceMenu
                            labelProp="name"
                            valueProp="code"
                            anchor={"right"}
                            formatLabel={(val) => (val ? `Sort by: ${val?.name}` : "Sort by")}
                            caret={<ArrowsUpDownIcon strokeWidth={2} className="h-4 w-4" />}
                            extraMenuClasses={"!min-w-52"}
                            extraClasses={
                                "bg-gray-100 !py-2.5 !px-4 !font-medium !tracking-normal rounded-full hover:bg-black hover:text-white tracking-wide transition-all"
                            }
                            items={sorters}
                            value={""}
                            onItemSelected={(item) => console.log(item)}
                        />
                    </div>
                )}
                {/* Pagination */}
                {showPagination && (
                    <div className="flex justify-between items-center gap-2">
                        {metadata?.page_by?.pages && (
                            <div className="flex text-xs tracking-wider font-medium uppercase text-slate-400 px-2">
                                {_.compact([
                                    `${formatNumber(metadata?.page_by?.total, "0,0")} item(s)`,
                                    `Page ${formatNumber(metadata?.page_by?.page, "0,0")} of ${formatNumber(
                                        metadata?.page_by?.pages,
                                        "0,0"
                                    )}`,
                                ]).join(", ")}
                            </div>
                        )}

                        <button
                            onClick={() => changePage(false)}
                            className="text-black p-2.5 rounded-full bg-gray-100 text-xs font-medium flex items-center whitespace-nowrap hover:bg-black hover:text-white tracking-wide transition-all">
                            <ChevronLeftIcon strokeWidth={2.5} className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => changePage(true)}
                            className="text-black p-2.5 rounded-full bg-gray-100 text-xs font-medium flex items-center whitespace-nowrap hover:bg-black hover:text-white tracking-wide transition-all">
                            <ChevronRightIcon strokeWidth={2.5} className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export const useQueryFilters = () => {
    const router = useRouter();
    const [pageBy, setPageBy] = useState();
    const [filterBy, setFilterBy] = useState();
    const [sortBy, setSortBy] = useState();
    const [view, setView] = useState();

    useEffect(() => {
        console.log("fired everytime the router changes");
        const { query, asPath, pathname } = router;
        const queryString = asPath.replace(pathname, "").trim();
        const parsedQuery = qs.parse(queryString, { ignoreQueryPrefix: true, allowDots: true });
        console.log("inside router ---->", { query, router, queryString, parsedQuery });

        //    Remove valid keys first
        const filters = _.omit(parsedQuery, ["per_page", "page", "view", "order_by", "asc_desc"]);
        const { per_page = "20", page = "1", view = "", order_by, asc_desc } = parsedQuery;

        setSortBy(_.pickBy({ order_by, asc_desc }, _.identity));
        setPageBy(_.pickBy({ page, per_page }, _.identity));
        setFilterBy(_.pickBy(filters, _.identity));
        setView(view);
    }, [router]);

    return { filterBy, pageBy, sortBy, view };
};
