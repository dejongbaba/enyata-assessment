import moment from "moment";
import {v4 as uuidv4} from "uuid";
import _ from "lodash";
import countries from "./countries";

export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.replace(/^data:.+;base64,/, ""));
        reader.onerror = (error) => reject(error);
    });

export function uuid() {
    return uuidv4();
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function sku_format(value) {
    return value?.trim()?.toLowerCase().replace(/ /g, "_");
}

export function slugify(string) {
    return (
        string &&
        `${string}`
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map((x) => x.toLowerCase())
            .join("-")
    );
}

export function matrixMultiply(a, b) {
    let tmp = [];

    if (!a.length) {
        return b;
    }

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            tmp.push(_.compact([a[i], b[j]]).join(", "));
        }
    }
    return tmp;
}

export const hyphenateWord = (word) => {
    return word.trim().replace(" ", "-");
};

export function checkAge(dob, format = "DD-MM-YYYY") {
    const startDate = moment(dob, format);
    return moment().diff(startDate, "years");
}

export const cartesian = (args) => {
    // a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())), []);
    return _.reduce(
        args,
        function (a, b) {
            return _.flatten(
                _.map(a, function (x) {
                    return _.map(b, function (y) {
                        return x.concat([y]);
                    });
                })
            );
        },
        [[]]
    );
};

export const states = (code) => {
    const countryObj = countries.find((item) => item.code === code);
    const statesList = countryObj?.states.map((state) => ({
        name: state || "",
        code: state || "",
    }));
    return statesList?.length ? statesList : [];
};

// export const normalizeInventories = (prods) => {
//     if (prods.length) {
//         let products = prods.map((p) => p.items).flat(1);
//         return products?.map((i) => ({ label: _.compact([i.product, i.variant.name]).join(" / "), ...i }));
//     }
//     return [];
// };

export const normalizedInventoryVariants = (inventories) => {
    return (
        (inventories?.length &&
            inventories?.map((i) => ({
                name: i.variant?.name || i?.product?.name,
                sku: i.variant?.sku || i?.product?.sku,
                quantity: i.variant?.quantity || i?.product?.quantity,
                product: i.product?.pk,
                unit_price: i.variant?.prices?.[0]?.value || i.product?.prices?.[0]?.value || 0,
                description: i.variant?.description || i.product?.description,
            }))) ||
        []
    );
};

export const normalizeProducts = (products) => {
    return products?.length
        ? products
            ?.reduce((a, b) => {
                if (b?.variants?.length) {
                    const temp = b.variants.map((i) => ({productName: b?.name, product_id: b?.pk, ...i}));
                    console.log("a", a, temp);
                    return a.concat(temp);
                } else {
                    return a.concat([b]);
                }
            }, [])
            ?.map((i) => ({label: _.compact([i?.productName, i?.name]).join(" \u2022 "), ...i}))
        : [];
};
export const normalizedInventories = (products) => {
    return (
        (products?.length &&
            products?.map((a) => {
                if (a?.variant) {
                    return {
                        ...a?.variant,
                        sku: a?.variant?.sku,
                        label: `${a?.product?.name} / ${a?.variant?.name}`,
                        product: a.product,
                    };
                } else {
                    return {...a?.product, sku: a?.product?.sku, label: `${a?.product?.name}`, product: a.product};
                }
            })) ||
        []
    );
};

export const normalizedSubCategories = (items) => {
    return items.length ? items?.map((i) => ({label: `${i.category.name} / ${i.name}`, ...i})) : [];
};

export const filterProductsByCurrency = (currency, products) => {
    if (products?.length) {
        return products.filter((i) => {
            return i?.prices?.length ? i?.prices?.find((i) => i?.currency?.code === currency) : i;
        });
    }
    return products;
};
export const normalizeWarehouses = (warehouses) => {
    console.log("warehouses", warehouses);
    return (
        (warehouses?.length &&
            warehouses?.map((w) => {
                const {name, pk, ...others} = w.address;
                return {...w, ...others, country: w.address?.country};
            })) ||
        []
    );
};
export const isAnswerFilled = (item) => {
    return item?.description_map?.every((i) => i.value) || false;
};
export const orderItemStatus = (code) => {
    const status = {
        due_for_transfer: "out of stock",
        delivered: "delivered",
        ready_for_processing: "in stock",
        delivery_in_progress: "delivery in progress",
    };
    return status[code] || "";
};
export const extractDescription = (item, itemType) => {
    const {description_map = [], description} = item;
    console.log("description item", description_map, description, item);
    const extractedKey = extractKey(description_map);
    extractedKey["item-type"] = itemType?.replace("_", " ")?.replace("-", " ")?.toLowerCase();
    const replacedTemplate = description?.replace(/\[(.*?)\]/g, (x) => {
        const key = x.replace(/\[|\]/g, "");
        return extractedKey[key];
    });
    return replacedTemplate || "";
};

export const extractKey = (item) => {
    const result = {};
    for (let i = 0; i < item?.length; i++) {
        const {value} = item[i];
        result[`answer-${i + 1}`] = value;
    }
    return result;
};

export function toTitleCase(str) {
    return str?.replace(/\w\S*/g, function (txt) {
        return txt?.charAt(0).toUpperCase() + txt?.substr(1)?.toLowerCase();
    });
}

export const checkValidItem = (items) => {
    if (items?.length) {
        return items.every((i) => {
            return i.quantity && i.value && i.item_type;
        });
    }
    return false;
};
export const isCategorized = (items) => {
    if (items?.length) {
        console.log(
            "items length",
            items?.filter((i) => i.product_id && i.category && i.sub_category)
        );
        const categorized = items
            ?.filter((i) => !(i.product_id && i.category && i.sub_category))
            .every((i) => {
                return i.product_id && i.category && i.sub_category;
            });
        console.log("categorized", categorized);
        return categorized;
    }
    return false;
};

export const truncateString = (str, n) => {
    if (str?.length > n) {
        return str?.substring(0, n) + "...";
    } else {
        return str;
    }
};

export function formatDate(dateString, format = "MMM DD, YYYY") {
    return moment(dateString).format(format);
}

export function openInTab(href, newTab) {
    var a = document.createElement("a");
    a.href = href;
    if (newTab) {
        a.setAttribute("target", "_blank");
    }
    a.click();
}

export const getCurrency = (currency) => {
    if (currency === "NG") {
        return "₦";
    }
    if (currency === "GH") {
        return "gh₵";
    }
    return "";
};

export function debounceFunc(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

export const dimensions = (obj) => {
    let dims = "-";
    if (obj?.dimension?.width) {
        dims = `${obj.dimension?.width || ""}CM x`;
    }
    if (obj?.dimension?.height) {
        dims += `${obj.dimension?.height || ""}CM x`;
    }
    if (obj?.dimension?.length) {
        dims += `${obj.dimension?.length}CM`;
    }
    return dims;
};

export const buildFetchFilterParams = (filterBy, options) => {
    console.log("filterBy in fetch", filterBy);
    let acc = {};
    const prepareChoice = (value, option) => {
        switch (option.type) {
            case "dateRange":
                const val = value?.split("__");
                const [min, max, choice] = val;
                const [day, month, year] = min?.split("-");
                const [maxDay, maxMonth, maxYear] = max?.split("-");
                return {value: {min: new Date(year, month, day), max: new Date(maxYear, maxMonth, maxDay)}, choice};
            case "numberRage":
                const nums = value?.split("__");
                const [first, last, c] = nums;
                //    find the value
                return {value: {min: Number(first), max: Number(last)}, choice: c};

            case "date":
                const dateVal = value?.split("__");
                const [dateTime, choiceVal] = dateVal;
                const [dateDay, dateMonth, dateYear] = dateTime?.split("-");
                return {value: new Date(dateYear, dateMonth, dateDay), choice: choiceVal};
            case "number":
            case "options":
            case "dropdown":
            case "boolean":
            case "text":
                return {value: value === "true" ? true : value === "false" ? false : value, choice: value};
            default:
                return {
                    value: value === "true" ? true : value === "false" ? false : value,
                    choice: value,
                };
        }
    };
    _.forEach(filterBy, (f, key) => {
        const option = _.find(options, (o) => {
            return o.code === key;
        });
        const {prop, op} = option;
        const {value} = prepareChoice(f[op?.replace("$", "")], option);

        acc = {...acc, [`${prop}`]: {op, value}};
    });

    return acc;
};

export function serializeFilters(values = {}) {
    const prepareValue = (op, value, code, choice) => {
        switch (op) {
            case "$in":
            case "$nin":
                return value.join(",");
            case "$btw":
                if (code === "date_created") {
                    return _.compact([
                        formatDate(value?.min, "DD-MM-YYYY"),
                        formatDate(value?.max, "DD-MM-YYYY"),
                        choice,
                    ]).join("__");
                }
                return _.compact([value?.min, value?.max, choice]).join("__");
            default:
                return value;
        }
    };

    return _.map(values, (data) => {
        const {code, op, value, choice} = data;
        const key = `${code}.${op.replace("$", "")}`;
        const val = prepareValue(op, value, code, choice);
        return {key, value: val};
    });
}

export function extractQueryParams(searchParams = {}) {
    //     remove all unnecessary params from the values
    const {page = "1", per_page = "40", sorting = "newest", sort_by, ...rest} = searchParams;

    const page_by = {per_page, page};
    let filter_by = {};
    const parseValue = (op, value) => {
        switch (op) {
            case "in":
            case "nin":
                return value.split(",");
            case "btw":
                const [min, max] = value.split("__");
                return {min, max};
            default:
                return value;
        }
    };

    _.forEach(rest, (value, key) => {
        const bits = key.split(".");
        if (bits.length <= 1) return;
        const op = bits.pop(); // remove last element inside array
        const name = bits.join(".");
        const val = parseValue(op, value);
        filter_by = {...filter_by, ...{[`${name}`]: {op: `$${op}`, value: val}}};
    });

    console.log({filter_by});
    return {filter_by, page_by, sorting, sort_by};
}

export const getColor = (code) => {
    switch (code) {
        case "due_for_transfer":
            return {
                background: "bg-gray-300",
                text: "text-black",
                description: "out of stock",
            };
        case "unavailable":
            return {
                background: "bg-gray-300",
                text: "text-black",
                description: "Unavailable",
            };
        case "ready_for_processing":
            return {
                background: "bg-gray-300",
                text: "text-white",
                description: "in stock",
            };
        case "delivery_in_progress":
            return {
                background: "bg-gray-300",
                text: "text-white",
                description: "delivery in progress",
            };
        case "paid":
        case "completed":
        case "delivered":
            return {
                background: "bg-green-500",
                text: "text-white",
            };
        case "pending":
        case "in_progress":
        case "in_fulfilment":
        case "at_hub":
            return {
                background: "bg-yellow-500",
                text: "text-white",
            };
        case "cancelled":
            return {
                background: "bg-red-500",
                text: "text-white",
            };
        default:
            return {
                background: "bg-gray-300",
                text: "text-black",
            };
    }
};


export const Status = ({item}) => {
    const statuses = {
        pending: {
            text: "Pending",
            class: "bg-yellow-200 text-black border-yellow-200",
        },
        approved: {
            text: "Approved",
            class: "bg-green-500 text-white border-green-500",
        },
        rejected: {
            text: "Rejected",
            class: "bg-red-400 text-white border-red-400",
        },
        declined: {
            text: "Declined",
            class: "bg-red-400 text-white border-red-400",
        },
    };

    return (
        <div
            className={classNames(
                statuses[item?.approve_status?.code]?.class || statuses.pending.class,
                "text-xs tracking-normal w-auto uppercase px-2 py-0.5 bg-gray-200 inline-block text-center "
            )}>
            {statuses[item?.approve_status?.code]?.text || statuses.pending.text}
        </div>
    );
};

export const countriesForLoqateInput = ["US", "GB", "CA", "AU", "DE", "FR"];


