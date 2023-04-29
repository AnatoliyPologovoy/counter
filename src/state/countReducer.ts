export type CountStateType = {
    countData: CountDataType
    errorData: ErrorDataType
    inputMax: number
    inputStart: number
    isChangeInputMode: boolean
}
export type CountDataType = {
    count: number
    start: number
    max: number
}

export type ErrorDataType = {
    text: string
    input: 'all' | 'start'
} | null

const initialState: CountStateType = {
    countData: {
        count: 0,
        start: 0,
        max: 5
    },
    errorData: null,
    inputMax: 5,
    inputStart: 0,
    isChangeInputMode: false
}

const INCREMENT_COUNT = 'INCREMENT-COUNT'
const RESET_COUNT = 'RESET-COUNT'
const SET_STATUS_INPUT_MODE = 'SET-STATUS-INPUT-MODE'
const SET_INPUT_MAX = 'SET-INPUT-MAX'
const SET_INPUT_START = 'SET-INPUT-START'
const SET_COUNT_DATA = 'SET-COUNT-DATA'
const SET_ERROR = 'SET-ERROR'

type countReducerActionsType =
    incrementCountActionType |
    resetCountActionType |
    setStatusInputModeActionType |
    setInputMaxActionType |
    setInputStartActionType |
    setCountDataActionType |
    setErrorActionType

export const countReducer = (state: CountStateType = initialState, action: countReducerActionsType): CountStateType => {
    switch (action.type) {
        case INCREMENT_COUNT:
            const newCount = state.countData.count + 1
            return {...state, countData: {...state.countData, count: newCount}}
        case RESET_COUNT:
            return {...state, countData: {...state.countData, count: 0}}
        case SET_STATUS_INPUT_MODE:
            return {...state, isChangeInputMode: action.status}
        case SET_INPUT_MAX:
            return {...state, inputMax: action.value}
        case SET_INPUT_START:
            return {...state, inputStart: action.value}
        case SET_COUNT_DATA:
            const newCountData: CountDataType = {
                count: 0,
                max: state.inputMax,
                start: state.inputStart
            }
            return {...state, countData: newCountData}
        case SET_ERROR:
            return {...state, errorData: action.error}

    }
    return {...state}
}

const incrementCountAC = () => {
    return {
        type: INCREMENT_COUNT
    } as const
}
type incrementCountActionType = ReturnType<typeof incrementCountAC>

const resetCountAC = () => {
    return {
        type: RESET_COUNT
    } as const
}
type resetCountActionType = ReturnType<typeof resetCountAC>

const setStatusInputModeAC = (status: boolean) => {
    return {
        type: SET_STATUS_INPUT_MODE,
        status
    } as const
}
type setStatusInputModeActionType = ReturnType<typeof setStatusInputModeAC>

const setInputMaxAC = (value: number) => {
    return {
        type: SET_INPUT_MAX,
        value
    } as const
}
type setInputMaxActionType = ReturnType<typeof setInputMaxAC>

const setInputStartAC = (value: number) => {
    return {
        type: SET_INPUT_START,
        value
    } as const
}
type setInputStartActionType = ReturnType<typeof setInputStartAC>

const setCountDataAC = () => {
    return {
        type: SET_COUNT_DATA
    } as const
}
type setCountDataActionType = ReturnType<typeof setCountDataAC>

const setErrorAC = (error: ErrorDataType) => {
    return {
        type: SET_ERROR,
        error
    } as const
}
type setErrorActionType = ReturnType<typeof setErrorAC>