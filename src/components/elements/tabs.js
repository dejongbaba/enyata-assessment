import React from "react";
import { classNames } from "app/lib/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";

// Include menu component for custom navigation options

const demoViews = [
    {
        name: "Pending",
        code: "pending",
    },
    {
        name: "Ongoing",
        code: "ongoing",
    },
    {
        name: "Completed",
        code: "completed",
    },
    {
        name: "Draft",
        code: "drafted",
    },
];

export default function Component({ views = demoViews, navType = "view", extraClasses = "" }) {
    const router = useRouter();

    return (
        <div className="relative">
            <nav className="flex -mb-px space-x-10">
                {views.map((option, idx) => {
                    const { pathname, asPath } = router;
                    const { view = "" } = router?.query;
                    const { name, code = "", path } = option;
                    console.log(path, pathname);
                    const isSelected = navType === "view" ? code === view : path === asPath;
                    const query = _.pickBy({ view: code, page: undefined }, _.identity); // can't be like this because of filtering
                    const href = navType === "view" ? { pathname, query } : path;
                    return (
                        <Link href={href} passHref key={idx}>
                            <a
                                className={classNames(
                                    isSelected
                                        ? "font-semibold text-primary border-primary"
                                        : "font-medium text-gray-600 border-transparent",
                                    "py-4 text-sm transition-all duration-200 border-b-4 hover:border-gray-300 whitespace-nowrap",
                                    extraClasses
                                )}>
                                {name}
                            </a>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
