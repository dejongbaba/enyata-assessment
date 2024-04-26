import {Fragment, useEffect, useMemo, useRef, useState} from "react";
import {classNames} from "@/lib/utils";
import {useTable} from "react-table";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid";
import {Menu, Transition} from "@headlessui/react";
import {ChartPieIcon} from "@heroicons/react/24/outline";

function ItemMenu({items = [], obj}) {
    return (
        <Menu as="div" className="relative">
            <Menu.Button
                type="button"
                onClick={(e) => e.stopPropagation()} // necessary to stop event propagation
                className="flex z-5 justify-center h-6 w-6 items-center p-1 rounded-full text-slate-400 hover:text-primary hover:bg-white hover:border-white">
                <EllipsisHorizontalIcon className="w-5 h-5"/>
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className="absolute z-20 right-1 mt-2 max-w-60 origin-top-right rounded-sm overflow-auto bg-white text-sm sm:text-xs shadow-lg shadow-slate-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="divide-y divide-slate-100">
                        {items.map((item, idx) => {
                            return (
                                <Menu.Item key={idx}>
                                    {({active}) => {
                                        const {label, func} = item;
                                        return (
                                            <a
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    func && func(obj);
                                                }}
                                                className={classNames(
                                                    active ? "bg-primary text-white" : "text-slate-900",
                                                    "block relative cursor-pointer select-none font-medium py-3 pl-3 pr-10 whitespace-nowrap"
                                                )}>
                                                {label}
                                            </a>
                                        );
                                    }}
                                </Menu.Item>
                            );
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export function DemoEmptyComponent({
                                       className,
                                       title = "No records available",
                                       description = "Sell your product or service by sharing a link to a payment page with your customers.",
                                   }) {
    return (
        <div className={classNames("w-full py-12 h-96 bg-white flex flex-col justify-center items-center", className)}>
            <div className="m-auto space-y-4">
                <div className="w-16 h-16 inline-flex justify-center items-center rounded bg-slate-100 text-slate-400">
                    <ChartPieIcon className="w-8 h-8"/>
                </div>
                <div className="space-y-1">
                    <p className="text-lg font-bold">{title}</p>
                    <p className="text-sm text-slate-400 max-w-sm">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default function Component({
                                      objects = [],
                                      columnDefs = [],
                                      bulkActions = [],
                                      itemActions = [],
                                      showHeader = true,
                                      showCheckbox = true,
                                      onSelectionChanged,
                                      onRowClick,
                                      EmptyComponent = DemoEmptyComponent,
                                  }) {
    const checkbox = useRef();
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [selected, setSelected] = useState([]);
    const data = useMemo(() => objects, [objects]);
    const columns = useMemo(() => columnDefs, [columnDefs]);
    const tableInstance = useTable({data, columns});

    useEffect(() => {
        const isIndeterminate = selected.length > 0 && selected.length < objects.length;
        setChecked(selected.length === objects.length);
        setIndeterminate(isIndeterminate);
        if (checkbox?.current) checkbox.current.indeterminate = isIndeterminate;
        onSelectionChanged && onSelectionChanged(selected);
    }, [selected]);

    const toggleAll = () => {
        setSelected(checked || indeterminate ? [] : objects);
        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
    };

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

    if (objects?.length === 0) return <EmptyComponent/>;

    return (
        <div className="w-full overflow-x-scroll">
            {/* Bulk actions box might be implemented differently */}
            {/*{selected && selected.length > 0 && (*/}
            {/*    <div className="absolute bg-white w-full py-3.5 pl-12 sm:pl-20">*/}
            {/*        <p>Buttons</p>*/}
            {/*    </div>*/}
            {/*)}*/}
            <table className="w-full" {...getTableProps()}>
                {showHeader && (
                    <thead className="bg-white text-slate-400">
                    {headerGroups.map((headerGroup) => {
                        return (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {showCheckbox && (
                                    <th scope="col" className="relative w-12 px-4 sm:w-16">
                                        <input
                                            type="checkbox"
                                            className="absolute left-4 sm:left-4 lg:left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                            ref={checkbox}
                                            checked={checked}
                                            onChange={toggleAll}
                                        />
                                    </th>
                                )}
                                {headerGroup.headers.map((column, idx) => {
                                    return (
                                        // Apply the header cell props
                                        <th
                                            key={idx}
                                            scope="col"
                                            className={classNames(
                                                "py-3 px-6 text-left font-medium text-xs sm:text-[10px] uppercase tracking-wider",
                                                column.headerClassName // adding support for introducing custom classes on each header
                                            )}
                                            {...column.getHeaderProps()}>
                                            {
                                                // Render the header
                                                column.render("Header")
                                            }
                                        </th>
                                    );
                                })}
                                {itemActions && itemActions.length > 0 && (
                                    <td className="w-4 relative overflow-visible pr-2"></td>
                                )}
                            </tr>
                        );
                    })}
                    </thead>
                )}
                <tbody
                    className="divide-y-2 border-t-2 border-slate-50 divide-slate-50 bg-white font-medium md:text-sm"
                    {...getTableBodyProps()}>
                {
                    // Loop over the table rows
                    rows.map((row) => {
                        // Prepare the row for display
                        prepareRow(row);
                        const {original} = row;

                        return (
                            // Apply the row props
                            <tr
                                onClick={(e) => {
                                    onRowClick && onRowClick(original);
                                    e.stopPropagation();
                                }}
                                className={classNames(
                                    selected.includes(original) ? "hover:bg-opacity-75" : undefined,
                                    onRowClick ? "hover:bg-slate-50 hover:bg-opacity-75 cursor-pointer" : ""
                                )}
                                {...row.getRowProps()}>
                                {showCheckbox && (
                                    <td className="relative w-12 py-4 px-4 align-top sm:w-16">
                                        <input
                                            type="checkbox"
                                            className="absolute left-4 sm:left-4 top-6 lg:left-4 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                            value={original}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            checked={selected.includes(original)}
                                            onChange={(e) => {
                                                setSelected(
                                                    e.target.checked
                                                        ? [...selected, original]
                                                        : selected.filter((p) => p !== original)
                                                );
                                            }}
                                        />
                                    </td>
                                )}
                                {
                                    // Loop over the rows cells
                                    row.cells.map((cell, idx) => {
                                        // Apply the cell props
                                        return (
                                            <td
                                                key={idx}
                                                className={classNames(
                                                    "whitespace-nowrap py-6 px-6 align-top",
                                                    cell.column.className // adding support for introducing custom classes on each cell
                                                )}
                                                {...cell.getCellProps()}>
                                                {
                                                    // Render the cell contents
                                                    cell.render("Cell")
                                                }
                                            </td>
                                        );
                                    })
                                }
                                {itemActions && itemActions.length > 0 && (
                                    <td className="w-4 overflow-visible pr-2">
                                        <ItemMenu items={itemActions} obj={original}/>
                                    </td>
                                )}
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}
