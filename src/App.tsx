import React, {useState} from 'react';
import './App.css';
import {Monitor} from "./components/Monitor";
import SuperButton from "./components/SuperButton";
import SetMaxCount from "./components/setMaxCount";

function App() {
  const [countMax, setCountMax] = useState<number>(5)
  const [count, setCount] = useState<number>(0)

  const changeCount = () => {
      setCount(count + 1)
  }

  const resetCount = () => {
      setCount(0)
  }

  const callBackSetMaxCount = (maxValue: number) => {
      setCountMax(maxValue)
      resetCount()
  }

  let isMaxCount = count === countMax;
  let isDisabled = count === 0

  let styleButtonWrapper = {
      display: "flex",
      justifyContent: "space-around"
  }

  return (
    <div className="App">
        <SetMaxCount setMaxCount={callBackSetMaxCount}/>
        <Monitor value={count} isMaxCount={isMaxCount}/>
        <div style={styleButtonWrapper}>
            <SuperButton cb={changeCount} name={'+'} isDisabled={isMaxCount}/>
            <SuperButton cb={resetCount} name={'Reset'} isDisabled={isDisabled}/>
        </div>
    </div>
  );
}

export default App;



