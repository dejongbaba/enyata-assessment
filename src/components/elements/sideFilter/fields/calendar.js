import { getIn, useFormikContext } from "formik";
import { classNames } from "app/lib/utils";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format as dateFnsFormat,
    getDay,
    isAfter,
    isBefore,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfDay,
    startOfToday,
    startOfWeek,
} from "date-fns";

export default function Component({
    name,
    label,
    helpText,
    extraClasses = "",
    onInputChanged,
    altLink,
    format,
    placeholder,
    icon,
    deactivateNext = false,
    deactivatePrev = false,
    minDate,
    maxDate,
    disabledDays = [],
    showError = true,
    showLabel = false,
    rightIcon,
    ...props
}) {
    const { values, errors, touched, setFieldValue } = useFormikContext();
    const today = startOfToday();
    const val = getIn(values, name);
    const parsed = val ? startOfDay(parseISO(val)) : today;
    const [selectedDay, setSelectedDay] = useState(parsed);
    const [currentMonth, setCurrentMonth] = useState(dateFnsFormat(today, "MMM-yyyy"));
    const firstDay = parse(currentMonth, "MMM-yyyy", new Date());

    const min = minDate ? startOfDay(parseISO(minDate)) : undefined;
    const max = maxDate ? startOfDay(parseISO(maxDate)) : undefined;
    const formatValue = (val) => (format ? format(val) : val);
    // const handleChange = onChange(name);
    // const handleBlur = onBlur(name);

    useEffect(() => {
        setFieldValue(name, selectedDay, true);
        onInputChanged && onInputChanged(selectedDay);
    }, [selectedDay]);

    const dates = eachDayOfInterval({
        start: startOfWeek(firstDay),
        end: endOfWeek(endOfMonth(firstDay)),
    });

    const nextMonth = () => {
        const nextMonth = add(firstDay, { months: 1 });
        !deactivateNext && setCurrentMonth(dateFnsFormat(nextMonth, "MMM-yyyy"));
    };

    const prevMonth = () => {
        const nextMonth = add(firstDay, { months: -1 });
        !deactivatePrev && setCurrentMonth(dateFnsFormat(nextMonth, "MMM-yyyy"));
    };
    return (
        <div className="">
            <div className="flex items-center px-4 sm:px-8">
                <button
                    disabled={deactivatePrev}
                    onClick={prevMonth}
                    type="button"
                    className="-ml-1.5 flex flex-none items-center justify-center p-1.5 black hover:text-primary disabled:text-gray-400 disabed:hover:transparent">
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <h2 className="flex justify-center flex-1 items-center text-xs uppercase font-semibold text-black tracking-wide">
                    {dateFnsFormat(firstDay, "MMMM yyyy")}
                </h2>
                <button
                    disabled={deactivateNext}
                    onClick={nextMonth}
                    type="button"
                    className="-mr-1.5 flex flex-none items-center justify-center p-1.5 black hover:text-primary disabled:text-gray-400 disabed:hover:transparent">
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </button>
            </div>
            <div className="mt-6 py-2 grid grid-cols-7 text-center text-xs uppercase leading-6 text-black tracking-wide border-b border-slate-100">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-xs uppercase">
                {dates.map((day, dayIdx) => {
                    const shouldDisable =
                        !isSameMonth(day, firstDay) ||
                        isBefore(day, min) ||
                        isAfter(day, max) ||
                        disabledDays.includes(getDay(day));
                    return (
                        <div
                            key={day.toString()}
                            className={classNames(
                                dayIdx > 6 && "border-slate-200",
                                dayIdx === 0 && startClasses[getDay(day)],
                                "py-1.5"
                            )}>
                            <button
                                onClick={() => {
                                    !shouldDisable && setSelectedDay(day);
                                }}
                                disabled={shouldDisable}
                                type="button"
                                className={classNames(
                                    isEqual(day, selectedDay) && "text-white",
                                    !isEqual(day, selectedDay) && isToday(day) && "text-primary",
                                    !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDay) &&
                                        "text-slate-900",
                                    !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDay) &&
                                        "text-slate-400",
                                    isEqual(day, selectedDay) && isToday(day) && "bg-primary",
                                    isEqual(day, selectedDay) && !isToday(day) && "bg-primary",
                                    !isEqual(day, selectedDay) && "hover:bg-primary-50",
                                    (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                                    shouldDisable && "!text-slate-400 !hover:transparent",
                                    "mx-auto flex h-8 w-8 items-center justify-center rounded disabled:hover:transparent !disabled:bg-transparent"
                                )}>
                                <time dateTime={dateFnsFormat(day, "yyyy-MM-dd")}>{dateFnsFormat(day, "d")}</time>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const startClasses = ["", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7"];
