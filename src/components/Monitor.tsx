import React, {memo} from "react";
import {ErrorDataType} from "../state/countReducer";

type MonitorPropsType = {
    value: number | string
    isMaxCount: boolean
    error: ErrorDataType

}

export const Monitor: React.FC<MonitorPropsType> = memo((props) => {
    const {value, isMaxCount, error} = props
    const isValueString = typeof value === 'string'
    const displayValue = error?.text || value

    const monitorStyle = {
        margin: "0 auto",
        marginBottom: "50px",
        width: "100%",
        height: "150px",
        border: "5px solid lightseagreen",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: isValueString || error ? "25px" : "120px",
        color: isMaxCount || error ? 'red' : 'black'
    }

    return (
        <div style={monitorStyle}>
            {displayValue}
        </div>
    )
})