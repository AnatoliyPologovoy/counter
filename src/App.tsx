import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import './App.css';
import {Monitor} from "./components/Monitor";
import SuperButton from "./components/SuperButton";
import {InputCount} from "./components/InputCount";

type CountType = {
    count: number
    start: number
    max: number
}

export type ErrorDataType = {
    text: string
    input: 'all' | 'start'
}

export type ErrorType = ErrorDataType | null

function App() {
    const [countData, setCount] = useState<CountType>({
        count: 0,
        start: 0,
        max: 5
    })
    const [inputMax, setInputMax] = useState<number>(countData.max)
    const [inputStart, setInputStart] = useState<number>(countData.start)
    const [error, setError] = useState<ErrorType>(null)

    let isChangeInput = useRef(true)

    //checking for error
    useEffect (()=> {
        let errorValue: ErrorType = null
        if (inputStart >= inputMax) {
            errorValue = {
                text: 'Max value must be greater start value',
                input: 'all'
            }
        }
        if (inputStart < 0) {
            errorValue = {
                text: 'Start value cannot be a negative number',
                input: 'start'
            }
        }
        setError(errorValue)

    },[inputMax, inputStart])


    //count:
    const changeCount = () => {
        setCount({...countData, count: countData.count + 1})
    }
    const resetCount = () => {
        setCount({...countData, count: countData.count = countData.start})
    }
    //input
    const changeInputMax = (value: number) => {
        setInputMax(value)
        isChangeInput.current = true
    }
    const changeInputStart = (value: number) => {
        setInputStart(value)
        isChangeInput.current = true
    }

    const applySettings = () => {
        setCount({
            count: inputStart,
            start: inputStart,
            max: inputMax
        })
        isChangeInput.current = false
    }

    //disabling button
    const isError = !!error
    const isMaxCount = countData.count === countData.max
    const isCountIsStart = isError || countData.count === countData.start
    const isDisableIncrement = isError || isMaxCount
    const isDisableSet = isError || !isChangeInput.current

    //error for input
    let errorInputStart = error?.input === 'start' || error?.input === 'all' || false
    let errorInputMax = error?.input === 'all' || false
    //style
    let styleButtonWrapper = {
        display: "flex",
        justifyContent: "space-around"
    }

    return (
        <div className="App">
            <div className='settings'>
                <div className='inputWrapper'>
                    <InputCount changeInput={changeInputMax}
                                inputValue={inputMax}
                                name="Max value :"
                                error={errorInputMax}
                    />
                    <InputCount changeInput={changeInputStart}
                                inputValue={inputStart}
                                name="Start value :"
                                error={errorInputStart}
                    />
                </div>
                <SuperButton cb={applySettings} name={'Set'} isDisabled={isDisableSet}/>
            </div>
            <div className="main">
                <Monitor value={countData.count} isMaxCount={isMaxCount} error={error}/>
                <div style={styleButtonWrapper}>
                    <SuperButton cb={changeCount} name={'+'} isDisabled={isDisableIncrement}/>
                    <SuperButton cb={resetCount} name={'Reset'} isDisabled={isCountIsStart}/>
                </div>
            </div>
        </div>
    );
}

export default App;



