import MaskedInput from "react-text-mask";
import createNumberMask from "services/utils/format_number";

export function CertificateSum(props: any) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref?.inputElement : null);
            }}
            mask={createNumberMask()}
            placeholderChar={"\u2000"}
            showMask
            pipe={handleCheckCertificateSum}
        />
    );
}
export function CouponPercent(props: any) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref?.inputElement : null);
            }}
            mask={createNumberMask()}
            placeholderChar={"\u2000"}
            showMask
            pipe={handleCouponPercent}
        />
    );
}
export function AmountMask(props: any) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref?.inputElement : null);
            }}
            mask={createNumberMask()}
            placeholderChar={"\u2000"}
            showMask
            pipe={handleCheckAmount}
        />
    );
}
export function PriceMask(props: any) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref?.inputElement : null);
            }}
            mask={createNumberMask()}
            placeholderChar={"\u2000"}
            showMask
            pipe={handleCheckPrice}
        />
    );
}

function handleCheckCertificateSum(conformedValue: any) {
    let value = conformedValue.split(" ").join("")

    if (value > 1000000) {
        return false
    } else return conformedValue
}
function handleCheckPrice(conformedValue: any) {
    let value = conformedValue.split(" ").join("")

    if (value > 10000000) {
        return false
    } else return conformedValue
}
function handleCheckAmount(conformedValue: any) {
    let value = conformedValue.split(" ").join("")

    if (value > 1000) {
        return false
    } else return conformedValue
}

function handleCouponPercent(conformedValue: any) {
    let value = conformedValue.split(" ").join("")

    if (value > 100) {
        return false
    } else return conformedValue
}