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
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 120);
  }, "Must be a number between 0 and 120");

  const [showTasks, toggleShowTasks] = useState(false)

  const taskTime = require('./taski.json')

  return (
    <div className="App" >
      {(value === '') ? (
        <div className='timer'>
          <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
          <select id="min/hour" className='mode'>
            <option value="minutesMode">minutes</option>
            <option value="hoursMode">hours</option>
          </select>
          <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>Randomize</button>
        </div>
      ) : (
        <div className='wrapper'>
          <div className='timer2'>
            <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
            <select id="min/hour" className='mode'>
              <option value="minutesMode">minutes</option>
              <option value="hoursMode">hours</option>
            </select>
            {/* <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>Change tasks</button> */}
          </div>
          {(showTasks) ? (
            <dl className='itemList'>
              {Object.keys(taskTime).filter((time) => { return time <= parseInt(value) }).map((minutes) => (
                <>
                  <dt key={minutes}>{minutes} min.</dt>
                  {taskTime[minutes].map((task) => (
                    <dd key={task.key}>{task.task}</dd>
                  ))}
                </>
              ))}
            </dl>
          ) : (
            <ul>
              no
              {/* {showAllTasks}
              <li key={taskTime[ti[0]].key}><div className='tasklistcontent'>{taskTime[ti[0]].task}</div><div className='tasklistcontent'>{taskTime[ti[0]].time}m</div></li> */}
            </ul>
          )}
          <div id="myBtn" className='buttonShowAll' onClick={() => { toggleShowTasks(!showTasks) }}>Show all tasks</div>
        </div>
      )
      }

      <div className='footer'> Time saved: 100 hours &nbsp; &nbsp;</div>
    </div>
  );
}

export default App;
