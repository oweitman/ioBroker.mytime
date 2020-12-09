import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

function RulePlus(props) {
    return (
        <SvgIcon {...props}>
            <path fill="currentColor" d="M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z" />
        </SvgIcon>
    );
}
function RuleMinus(props) {
    return (
        <SvgIcon {...props}>
            <path fill="currentColor" d="M2,16H10V14H2M12,14V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z" />
        </SvgIcon>
    );
}
function DatePlus(props) {
    return (
        <SvgIcon {...props}>
            <path fill="currentColor" d="M5.8 21L7.4 14L2 9.2L9.2 8.6L12 2L14.8 8.6L22 9.2L18.8 12H18C14.9 12 12.4 14.3 12 17.3L5.8 21M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z" />
        </SvgIcon>
    );
}
function DateMinus(props) {
    return (
        <SvgIcon {...props}>
            <path fill="currentColor" d="M5.8 21L7.4 14L2 9.2L9.2 8.6L12 2L14.8 8.6L22 9.2L18.8 12H18C14.9 12 12.4 14.3 12 17.3L5.8 21M14 17V19H22V17H14Z" />
        </SvgIcon>
    );
}

export { RulePlus, RuleMinus, DatePlus, DateMinus};