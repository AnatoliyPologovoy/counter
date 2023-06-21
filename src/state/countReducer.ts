export type CountStateType = {
    monitorCount: number
    inputMax: number
    inputStart: number
    errorData: ErrorDataType
    isChangeInputMode: boolean
}

export type ErrorDataType = {
    text: string
    input: 'all' | 'start'
} | null

const INCREMENT_COUNT = 'INCREMENT-COUNT'
const RESET_COUNT = 'RESET-COUNT'
const SET_STATUS_INPUT_MODE = 'SET-STATUS-INPUT-MODE'
const SET_INPUT_MAX = 'SET-INPUT-MAX'
const SET_INPUT_START = 'SET-INPUT-START'
const SET_ERROR = 'SET-ERROR'

const initialState: CountStateType = {
    monitorCount: 0,
    inputMax: 5,
    inputStart: 0,
    errorData: null,
    isChangeInputMode: false
}

export const countReducer = (state: CountStateType = initialState, action: countReducerActionsType): CountStateType => {
    switch (action.type) {
        case INCREMENT_COUNT:
            const newCount = state.monitorCount + 1
            return {...state, monitorCount: newCount}
        case RESET_COUNT:
            return {...state, monitorCount: state.inputStart}
        case SET_STATUS_INPUT_MODE:
            return {...state, isChangeInputMode: action.status}
        case SET_INPUT_MAX:
            return {...state, inputMax: action.value}
        case SET_INPUT_START:
            return {...state, inputStart: action.value}
        case SET_ERROR:
            return {...state, errorData: action.error}
        default:
            return {...state}
    }
}

export const incrementCountAC = () => {
    return {
        type: INCREMENT_COUNT
    } as const
}
type incrementCountActionType = ReturnType<typeof incrementCountAC>

export const resetCountAC = () => {
    return {
        type: RESET_COUNT
    } as const
}
type resetCountActionType = ReturnType<typeof resetCountAC>

export const setStatusInputModeAC = (status: boolean) => {
    return {
        type: SET_STATUS_INPUT_MODE,
        status
    } as const
}
type setStatusInputModeActionType = ReturnType<typeof setStatusInputModeAC>

export const setInputMaxAC = (value: number) => {
    return {
        type: SET_INPUT_MAX,
        value
    } as const
}
type setInputMaxActionType = ReturnType<typeof setInputMaxAC>

export const setInputStartAC = (value: number) => {
    return {
        type: SET_INPUT_START,
        value
    } as const
}
type setInputStartActionType = ReturnType<typeof setInputStartAC>

export const setErrorAC = (error: ErrorDataType) => {
    return {
        type: SET_ERROR,
        error
    } as const
}
type setErrorActionType = ReturnType<typeof setErrorAC>

export type countReducerActionsType =
    incrementCountActionType |
    resetCountActionType |
    setStatusInputModeActionType |
    setInputMaxActionType |
    setInputStartActionType |
    setErrorActionType