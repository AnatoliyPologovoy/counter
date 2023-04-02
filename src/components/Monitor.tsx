import React from "react";
import {ErrorDataType, ErrorType} from "../App";

type MonitorPropsType = {
    value: number
    isMaxCount: boolean
    error: ErrorType

}

export const Monitor: React.FC<MonitorPropsType> = (props) => {
    const {value, isMaxCount, error} = props


    const monitorStyle = {
        margin: "50px auto",
        width: "85%",
        height: "150px",
        border: "5px solid lightseagreen",
        borderRadius: "10px",
        fontSize: error? "25px" : "120px",
        color: isMaxCount || error ? 'red' : 'black'
    }

    return (
        <div style={monitorStyle}>
            {error?.text || value}
        </div>
    )
}