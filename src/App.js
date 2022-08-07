import './App.css';

import { useState } from 'react';
import { Random } from './components/Random'

function App() {
  // Restricts input for the given textbox to the given inputFilter function.
  const setInputFilter = (textbox, inputFilter, errMsg) => {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
      if (textbox) {
        textbox.addEventListener(event, function (e) {
          if (inputFilter(this.value)) {
            // Accepted value
            if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
              this.classList.remove("input-error");
              this.setCustomValidity("");
            }
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            // Rejected value - restore the previous one
            this.classList.add("input-error");
            this.setCustomValidity(errMsg);
            this.reportValidity();
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          } else {
            // Rejected value - nothing to restore
            this.value = "";
          }
        });
      }
    });
  }
  setInputFilter(document.getElementById("intLimitTextBox"), function (value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 120);
  }, "Must be a number between 0 and 120");

  const [value, setValue] = useState('');
  const [showTasks, toggleShowTasks] = useState(false)
  const [flag, setFlag] = useState(true)
  const taskTime = require('./taski.json')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleClick = () => {
    if (flag === true) {
      setValue(parseInt(value) + 1)
    } else {
      setValue(parseInt(value) - 1)
    }
    setFlag(!flag)
  }

  return (
    <div className="App" >
      {(!showTasks) ? (
        <div className='timer'>
          <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
          minutes
          <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>Random</button>
        </div>
      ) : (
        <div className='wrapper'>
          <div className='timer2'>
            <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={(flag) ? (parseInt(value)) : (parseInt(value - 1))} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
            minutes
            <button id="myBtn" className='buttonToDo' onClick={() => { handleClick() }}>Change tasks</button>
          </div>
          <div>
            {value === '' ? (
              <ul className='itemList'>
                <li>You can do nothing in 0 minutes</li>
              </ul>
            ) : (
              <Random taskTime={taskTime} value={parseInt(value)} />
            )}
          </div>
        </div>
      )
      }
    </div>
  );
}

export default App;
