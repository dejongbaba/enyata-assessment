import React, { useCallback, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import _ from "lodash";
import { useDebounce } from "app/lib/hooks";
import { formatAddress, formatAutocompleteAddress, formatGeocodeAddress } from "app/lib/geocoding";

let sessionToken;
let autocomplete;
let geocoder;
const isBrowser = typeof window !== "undefined";

// Input field component that knows how to use google addresses
const Component = ({ obj, onSelected, onChange, onBlur, value = "", ...props }) => {
    const [selectedAddress, setSelectedAddress] = useState(obj);
    const [searchInput, setSearchInput] = useState(value);
    const debouncedSearchInput = useDebounce(searchInput, 100);
    const [isEnabled, setIsEnabled] = useState(false);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const defaultOption = {
        place_id: "",
        reference: "",
        id: "",
        structured_formatting: { main_text: "", secondary_text: "Use this address" },
        description: "",
    };
    const [filteredOptions, setFilteredOptions] = useState([]);
    // const [sessionToken, setSessionToken] = useState();

    useEffect(() => {
        setSearchInput(value);
    }, [value]);

    // Always run once and only at the top
    useEffect(() => {
        sessionToken = isBrowser && window.google && new window.google.maps.places.AutocompleteSessionToken();
        autocomplete = isBrowser && window.google ? new window.google.maps.places.AutocompleteService() : null;
        geocoder = isBrowser && window.google ? new window.google.maps.Geocoder() : null;
        console.log("aauotcomplete", { sessionToken, autocomplete, geocoder });

        // setSessionToken(token);
    }, []);

    useEffect(() => {
        if (!_.isEmpty(debouncedSearchInput)) {
            console.log("true is enabled");
            setIsEnabled(true);
        } else {
            console.log("false");
            setIsEnabled(false);
        }

        console.log("autocomplete", autocomplete);

        if (debouncedSearchInput && autocomplete && shouldSearch) {
            setIsSearching(true);
            // const componentRestrictions = formRef && formRef.current && formRef.current.values ? { country: formRef.current.values.country || "" } : {};
            autocomplete.getPlacePredictions({ input: debouncedSearchInput, sessionToken }, (predictions, status) => {
                console.log({ predictions, status });
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const choices = predictions.map((address) => formatAutocompleteAddress(address));
                    console.log({ choices });
                    setFilteredOptions([
                        formatAutocompleteAddress({
                            ...defaultOption,
                            structured_formatting: {
                                ...defaultOption.structured_formatting,
                                main_text: debouncedSearchInput,
                            },
                        }),
                        ...choices,
                    ]);
                    // setSearching(false);
                } else {
                    setFilteredOptions([
                        formatAutocompleteAddress({
                            ...defaultOption,
                            structured_formatting: {
                                ...defaultOption.structured_formatting,
                                main_text: debouncedSearchInput,
                            },
                        }),
                    ]);
                }

                setIsSearching(false);
            });
        }
    }, [debouncedSearchInput, isEnabled]);

    const onAddressSelected = useCallback((address) => {
        console.log("Inside on address selected.... ");
        const { place_id } = address;
        setShouldSearch(false);
        setIsEnabled(false);

        // setSearchInput(address[initValue]);

        if (place_id) {
            geocoder.geocode({ placeId: place_id }, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    console.log("got into decode res");
                    const addr = formatGeocodeAddress(results, address);
                    console.log("addr", addr);
                    onSelected && onSelected(addr);
                }
            });
        } else {
            onSelected && onSelected(formatAddress(address));
        }
    });

    const onInputChanged = (val) => {
        setShouldSearch(true);
        setSearchInput(val);
    };

    const clearSelection = () => {
        setSearchInput("");
        setIsEnabled(false);
        setShouldSearch(false);
    };

    return (
        <div className="min-w-0 flex flex-col flex-1 relative">
            <div className="min-w-0 flex flex-1 bg-white relative">
                <input
                    id={"location-input"}
                    value={searchInput}
                    onChange={(e) => onInputChanged(e.target.value)}
                    {...props}
                    onBlur={onBlur}
                    autoComplete="off"
                />
                {/* {searchInput && (
                    <div className="absolute z-10 inset-y-0 right-0 px-2 flex items-center justify-center">
                        <button onClick={() => clearSelection()} className="text-sm text-slate-500 outline-none focus:outline-none">
                            <XCircleIcon className="h-6 w-6 text-slate-700" aria-hidden="true" />
                        </button>
                    </div>
                )} */}
            </div>
            {filteredOptions && filteredOptions.length > 0 && (
                <Listbox
                    className="z-50"
                    value={selectedAddress}
                    onChange={(val) => {
                        console.log("item selected", { val });
                        onAddressSelected(val);
                    }}>
                    <Transition
                        show={isEnabled && shouldSearch}
                        enter="transition duration-150 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-150"
                        leaveTo="transform scale-95 opacity-0">
                        <Listbox.Options className="absolute z-50 bg-white mt-1.5 max-h-60 w-full divide-y divide-slate-100 overflow-auto bg-white py-0.5 sm:text-sm shadow-lg shadow-slate-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {filteredOptions.map((address) => (
                                <Listbox.Option
                                    as="div"
                                    key={address.place_id}
                                    value={address}
                                    className="relative cursor-pointer select-none py-3 pl-3 pr-10">
                                    {({ active }) => (
                                        <div className="space-y-0.5">
                                            <p className="sm:text-sm font-medium">{address.main_text}</p>
                                            <p className="text-xs capitalize text-slate-400">
                                                {address.secondary_text}
                                            </p>
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </Listbox>
            )}
        </div>
    );
};

export default Component;
