import React, {ChangeEvent} from 'react';

type InputCountPropsType = {
    changeInput: (value: number) => void
    inputValue: number
    name: string
    error: boolean
}

export const InputCount: React.FC<InputCountPropsType> = (props) => {
    const {changeInput, inputValue, name, error} = props

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeInput(Number(e.currentTarget.value))
    }
    //style
    const inputStyle = {
        //boxSizing: "border-box",
        padding: "3px",
        width: "40%",
        height: "auto",
        fontSize: "25px",
        marginRight: "10px",
        backgroundColor: error? "red" : "transparent"
    }
    const wrapperStyle = {
        display: "flex",
        justifyContent: "space-around",
        fontSize: "25px"
    }

    return (
        <div style={wrapperStyle}>
            {name}
            <input type={"number"} style={inputStyle} value={inputValue} onChange={onChangeInputHandler}/>
        </div>
    );
};

