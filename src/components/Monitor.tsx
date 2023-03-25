import React from "react";

type MonitorPropsType = {
    value: number
    isMaxCount: boolean
}

export const Monitor: React.FC<MonitorPropsType> = ({value, isMaxCount}) => {
    const monitorStyle = {
        margin: "20px auto",
        width: "80%",
        border: "5px solid lightseagreen",
        borderRadius: "10px",
        fontSize: '120px',
        color: isMaxCount? 'red' : 'black'
    }

    return  (
        <div style={monitorStyle}>
            {value}
        </div>
    )
}