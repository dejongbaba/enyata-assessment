import { classNames } from "app/lib/utils";

export default function Component({ extraClasses, style = "shade", children, ...props }) {
    return (
        <span
            className={classNames(
                style === "shade"
                    ? "bg-primary text-white border border-slate-200 rounded-full ring-transparent focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary hover:border-primary hover:ring-primary hover:text-white"
                    : "bg-slate-100 border border-slate-100 rounded-full ring-transparent focus:outline-none hover:ring-2 hover:ring-offset-0 hover:ring-black hover:border-black hover:ring-black hover:text-slate-900",
                "whitespace-nowrap cursor-pointer inline-flex items-center justify-center w-full px-4 py-3 uppercase text-xs tracking-wider font-bold transition-all duration-200",
                extraClasses
            )}
            {...props}>
            {children}
        </span>
    );
}
