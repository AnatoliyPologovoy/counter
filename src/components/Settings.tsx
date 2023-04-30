import React from 'react';
import {InputCount} from "./InputCount";
import SuperButton from './SuperButton';
import {ErrorDataType} from "../state/countReducer";

export type SettingsPropsType = {
    changeInputMax: (value: number) => void
    changeInputStart: (value: number) => void
    applySettings: () => void
    inputValueMax: number
    inputValueStart: number
    errorData: ErrorDataType
    isDisableSet: boolean
}

const Settings: React.FC<SettingsPropsType> = (props) => {
    const {
        changeInputMax,
        changeInputStart,
        applySettings,
        inputValueMax,
        inputValueStart,
        errorData,
        isDisableSet,
    } = props

    const errorInputStart = errorData?.input === 'start' || errorData?.input === 'all' || false
    const errorInputMax = errorData?.input === 'all' || false

    return (
        <div className="settings">
            <div className='inputWrapper'>
                <InputCount changeInput={changeInputMax}
                            inputValue={inputValueMax}
                            title="Max value :"
                            error={errorInputMax}
                />
                <InputCount changeInput={changeInputStart}
                            inputValue={inputValueStart}
                            title="Start value :"
                            error={errorInputStart}
                />
            </div>
            <SuperButton cb={applySettings} name={'Set'} isDisabled={isDisableSet}/>
        </div>
    );
};

export default Settings;