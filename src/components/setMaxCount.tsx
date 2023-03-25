import React, {ChangeEvent, useState} from 'react';
import SuperButton from "./SuperButton";

type setMaxCountPropsType = {
    setMaxCount: (maxValue: number) => void
}

const SetMaxCount: React.FC<setMaxCountPropsType> = ({setMaxCount}) => {
    const [inputValue, setInputValue] = useState<number>(5)


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValueInNumber = Number(e.currentTarget.value);
        const validationValue = inputValueInNumber > 0 ? inputValueInNumber : false
        validationValue && setInputValue(validationValue)
    }

    const setMaxCountButtonHandler = () => {
        setMaxCount(inputValue)
    }
    const inputStyle = {
        //boxSizing: "border-box",
        padding: "3px",
        width: "30%",
        height: "auto",
        fontSize: "25px",
        marginRight: "10px"
    }
    const wrapperStyle = {
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-around"

    }

    return (
        <div style={wrapperStyle}>

            <input style={inputStyle} value={inputValue} onChange={onChangeInputHandler}/>
            <SuperButton cb={setMaxCountButtonHandler} name={'set max'} isDisabled={false}/>

        </div>
    );
};

export default SetMaxCount;