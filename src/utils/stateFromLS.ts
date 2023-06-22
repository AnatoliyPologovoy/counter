
export const setStateInLS  = (keyData: string, state: any) => {
    localStorage.setItem(keyData, JSON.stringify(state))
}

export const getStateFromLS = (keyData: string) => {
    const stateFromLS = localStorage.getItem(keyData)
    if (stateFromLS){
        return JSON.parse(stateFromLS)
    }
}