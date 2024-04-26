import React, { useCallback, useEffect, useRef, useState } from "react";
React.forwardRef((props, ref) => <input ref={ref} {...props} />);

const PinItem = ({
    forwardRef,
    secret,
    type,
    className = "border w-10 h-10 text-xl bg-slate-100 border-slate-100 block text-center font-medium w-full py-3 placeholder-gray-400 rounded-sm focus:ring-black focus:border-black focus:shadow-none caret-primary disabled:bg-gray-100",
    autoSelect,
    inputMode,
    initialValue = "",
    regexCriteria = /^[a-zA-Z0-9]+$/,
    validate,
    disabled,
    onPaste,
    onChange,
    onBackspace,
}) => {
    // Validation callback
    const validateInput = useCallback(
        (val) => {
            if (validate) {
                return validate(val);
            }

            if (type === "numeric") {
                const numCode = val.charCodeAt(0);
                const isInteger = numCode >= "0".charCodeAt(0) && numCode <= "9".charCodeAt(0);
                return isInteger ? val : "";
            }
            if (regexCriteria.test(val)) {
                return val.toUpperCase();
            }

            return "";
        },
        [validate]
    );

    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState(validateInput(initialValue));

    const update = (updatedValue, isPasting = false) => {
        const val = validateInput(updatedValue);
        if (value === val && !isPasting) return;

        if (val.length < 2) {
            setValue(val);

            setTimeout(() => {
                onChange && onChange(val, isPasting);
            }, 0);
        }
    };

    const _onKeyDown = (e) => {
        if (e.keyCode === 8 && (!value || !value.length)) {
            onBackspace && onBackspace();
        }
    };

    const clear = () => {
        setValue("");
    };

    const _onChange = (e) => {
        console.log({ target: e });
        update(e.target.value);
    };

    const _onFocus = (e) => {
        if (autoSelect) {
            e.target.select();
        }
        setFocus(true);
    };

    const _onBlur = () => {
        setFocus(false);
    };

    const _onPaste = (e) => {
        onPaste && onPaste(e.clipboardData.getData("text"));
    };

    const inputType = type === "numeric" ? "tel" : type || "text";

    // console.log({ ref });
    return (
        <input
            ref={forwardRef}
            disabled={disabled ? "disabled" : undefined}
            placeholder={value}
            aria-label={value}
            maxLength="1"
            autoComplete="off"
            type={secret ? "password" : inputType}
            inputMode={inputMode || "text"}
            pattern={type === "numeric" ? "[0-9]*" : "^[a-zA-Z0-9]+$"}
            onChange={_onChange}
            onKeyDown={_onKeyDown}
            onFocus={_onFocus}
            onBlur={_onBlur}
            onPaste={_onPaste}
            className={className}
            value={value}
        />
    );
};

const PinInput = ({
    length = 6,
    initialValue = "",
    type = "numeric",
    disabled,
    inputMode,
    validate,
    autoSelect,
    secret,
    focus = true,
    regexCriteria,
    className = "flex gap-2 bg-white outline-none focus:ring-primary",
    inputClassName,
    onComplete,
    onChange,
}) => {
    let currentIndex = 0;
    let elements = {};
    Array(length)
        .fill("")
        .forEach((x, i) => (elements[`${i}`] = useRef()));
    let values = Array(length)
        .fill("")
        .map((x, i) => initialValue.toString()[i] || "");

    useEffect(() => {
        if (focus && length) elements[0].current?.focus();
    }, []);

    const _onItemChange = (value, isPasting, index) => {
        console.log({ value, index });
        let currentIndex = index;
        values[index] = value;

        // Set focus on next
        if (value.length === 1 && index < length - 1) {
            currentIndex += 1;
            console.log({ currentIndex });
            elements[currentIndex].current.focus();
        }

        // Notify the parent
        const pin = values.join("");

        if (!isPasting) {
            onChange && onChange(pin, currentIndex);
        }

        if (pin.length === length) {
            // for pasting, trigger onComplete only when the last input triggers onChange
            if (isPasting && index < length - 1) {
                return;
            }

            onComplete(pin, currentIndex);
        }
    };

    const _onBackspace = (index) => {
        if (index > 0) {
            elements[index - 1].current?.focus();
        }
    };

    const _onPaste = (value) => {
        if (value.length !== length) {
            return;
        }

        elements.forEach((el, index) => el.current.update(value[index], true));
    };

    console.log({ elements });

    return (
        <div className={className}>
            {values.map((e, i) => (
                <PinItem
                    key={i}
                    forwardRef={elements[i]}
                    initialValue={e}
                    disabled={disabled}
                    onBackspace={() => _onBackspace(i)}
                    secret={secret || false}
                    onChange={(v, isPasting) => _onItemChange(v, isPasting, i)}
                    type={type}
                    inputMode={inputMode}
                    validate={validate}
                    className={inputClassName}
                    autoSelect={autoSelect}
                    onPaste={i === 0 ? _onPaste : null}
                    regexCriteria={regexCriteria}
                />
            ))}
        </div>
    );
};

export default PinInput;
