import React, {memo} from 'react';

type SuperButtonType = {
    cb: () => void
    name: string
    isDisabled: boolean
}

const SuperButton:React.FC<SuperButtonType> = memo(({cb, name, isDisabled}) => {

    let buttonStyle = {
        padding: "10px",
        width: "25%",
    }

    return (
        <button style={buttonStyle} disabled={isDisabled} onClick={cb}>{name}</button>
    );
});

export default SuperButton;