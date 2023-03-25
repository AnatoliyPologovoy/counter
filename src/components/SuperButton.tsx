import React from 'react';

type SuperButtonType = {
    cb: () => void
    name: string
    isDisabled: boolean
}

const SuperButton:React.FC<SuperButtonType> = ({cb, name, isDisabled}) => {

    let buttonStyle = {
        padding: "10px",
        width: "30%",
    }

    return (
        <button style={buttonStyle} disabled={isDisabled} onClick={cb}>{name}</button>
    );
};

export default SuperButton;