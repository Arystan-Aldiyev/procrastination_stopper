import './App.css';

import { useState, useEffect } from 'react';

function App() {

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value)
  }

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
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 99999999999999);
  }, "Must be a number between 0 and 99999999999999");

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  const [showTasks, toggleShowTasks] = useState(false)

  return (
    // <div>
    //   {(typeof backendData.users === 'undefined') ? (
    //     <p>Loading...</p>
    //   ) : (
    //     backendData.users.map((user, i) => (
    //       <p key={i}>{user}</p>
    //     ))
    //   )}
    // </div>

    <div className="App">
      {(typeof backendData === 'undefined' || !showTasks) ? (
        <div className='timer'>
          <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
          <select id="min/hour" className='mode'>
            <option value="minutesMode">minutes</option>
            <option value="hoursMode">hours</option>
          </select>
          <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>What to do?</button>
        </div>
      ) : (
        <>
          <div className='timer2'>
            <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
            <select id="min/hour" className='mode'>
              <option value="minutesMode">minutes</option>
              <option value="hoursMode">hours</option>
            </select>
            <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>Main page</button>
          </div>
        </>
        // backendData.map((task) => (
        //   <p key={task.key}>{task.task}</p>
        // ))
      )}

      <div className='footer'> Time saved: 100 hours &nbsp; &nbsp;</div>
    </div>
  );
}

export default App;
