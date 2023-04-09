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
    const [isEditMode, setIsEditMode] = useState(false)

    let isChangeInput = useRef(false)

    //get data from localStorage
    useEffect(() => {
        const savingData = localStorage.getItem("countData")
        if (savingData) {
            const currentCountData = JSON.parse(savingData)
            setCount(currentCountData)
            setInputMax(currentCountData.max)
            setInputStart(currentCountData.start)
        }
    }, [])

    //checking for error
    useEffect(() => {
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

    }, [inputMax, inputStart])


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
    // apply settings
    const setLocalStorage = (countData: CountType) => {
        localStorage.setItem("countData", JSON.stringify(countData))
    }

    const applySettings = () => {
        const currentCountData = {
            count: inputStart,
            start: inputStart,
            max: inputMax
        }
        setCount(currentCountData)
        setLocalStorage(currentCountData)
        setIsEditMode(false)
        isChangeInput.current = false
    }

    //toggle mode
    const activateEnableMode = () => {
        setIsEditMode(true)
    }


    //disabling button
    const isError = !!error
    const isMaxCount = countData.count === countData.max

    const isDisableReset = isError || countData.count === countData.start || isChangeInput.current
    const isDisableIncrement = isError || isMaxCount || isChangeInput.current
    const isDisableSet = isError || !isChangeInput.current

    //error for input
    const errorInputStart = error?.input === 'start' || error?.input === 'all' || false
    const errorInputMax = error?.input === 'all' || false

    //monitor value
    const monitorValue = isChangeInput.current ? 'Enter values and press "Set"' : countData.count


    //Settings window
    const settingsWindow = (
        <div className="settings">
            <div className='inputWrapper'>
                <InputCount changeInput={changeInputMax}
                            inputValue={inputMax}
                            title="Max value :"
                            error={errorInputMax}
                />
                <InputCount changeInput={changeInputStart}
                            inputValue={inputStart}
                            title="Start value :"
                            error={errorInputStart}
                />
            </div>
            <SuperButton cb={applySettings} name={'Set'} isDisabled={isDisableSet}/>
        </div>
    )

    return (
        <div className="App">
            {isEditMode ?
                settingsWindow :
                <div className="main">
                    <Monitor value={monitorValue} isMaxCount={isMaxCount} error={error}/>
                    <div className="styleButtonWrapper">
                        <SuperButton cb={changeCount} name={'+'} isDisabled={isDisableIncrement}/>
                        <SuperButton cb={resetCount} name={'Reset'} isDisabled={isDisableReset}/>
                        <SuperButton cb={activateEnableMode} name={'Set'} isDisabled={false}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default App;



