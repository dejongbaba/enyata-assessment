import { classNames } from "app/lib/utils";

export default function Component({
    type = "button",
    loading = false,
    onPress,
    style = "shade",
    loadingText = "Please wait...",
    disabled = false,
    extraClasses = "",
    children,
    ...props
}) {
    const styles = {
        // light: "whitespace-nowrap cursor-pointer disabled:opacity-40 inline-flex items-center justify-center w-full px-5 py-3.5 uppercase text-xs tracking-wider font-bold text-black transition-all duration-200 bg-slate-100 border border-slate-100 rounded-full ring-transparent focus:outline-none hover:ring-2 hover:ring-offset-0 hover:ring-black hover:border-black hover:ring-black hover:text-slate-900",
        light: "inline-flex items-center disabled:opacity-40 justify-center w-full px-5 py-4 uppercase text-xs tracking-wide font-bold text-black transition-all duration-200 bg-slate-100 border-slate-100 rounded-sm ring-transparent focus:outline-none hover:ring-2 hover:ring-offset-0 hover:ring-black hover:border-black hover:ring-black hover:text-slate-900",
        // shade: "whitespace-nowrap cursor-pointer disabled:opacity-40 inline-flex items-center justify-center w-full px-5 py-3.5 uppercase text-xs tracking-wider font-bold text-white transition-all duration-200 bg-primary bg-white border border-slate-200 rounded-full ring-transparent focus:outline-none  hover:ring-2 hover:ring-offset-2 hover:ring-primary hover:border-primary hover:ring-primary hover:text-white",
        shade: "inline-flex items-center disabled:opacity-40 justify-center w-full px-5 py-4 uppercase text-xs tracking-wide font-bold font-semibold text-white transition-all duration-200 bg-primary border-transparent rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-black",
        transparent: "",
        cancel: "mt-2 flex justify-center items-center bg-slate-200 text-white whitespace-nowrap text-2xl font-bold rounded-full w-7 h-7 hover:ring-2 hover:ring-offset-0 hover:ring-black hover:border-black hover:ring-black hover:text-slate-900",
    };

    const buttonClasses = styles[style] || styles.transparent;

    return (
        <button
            onClick={type === "button" ? () => onPress && onPress() : undefined}
            {...props}
            disabled={disabled || loading}
            className={classNames(
                // "inline-flex items-center disabled:opacity-40 justify-center w-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 bg-primary border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-indigo-500",
                buttonClasses,
                extraClasses
            )}
            type={type}>
            {loading ? loadingText : children}
        </button>
    );
}
