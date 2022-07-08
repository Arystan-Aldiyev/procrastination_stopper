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
        setBackendData(data.sort(function (a, b) { return a.time - b.time }))
      }
    )
  }, [])

  const [showTasks, toggleShowTasks] = useState(false)

  // const items = []
  // for (let i = 1; i <= value; i++) {
  //   items.push(<dt key={i}>{i} min.</dt>)
  //   backendData.filter((task) => { return task.time <= value }).map((task) => (
  //     items.push(<dd>{task.task}</dd>)
  //   ))
  // }
  // let shown = new Set()
  let taskTime = {

  }
  {
    (typeof backendData !== 'undefined') ? (
      backendData.map((task) => {
        (taskTime.hasOwnProperty(task.time)) ? (
          taskTime[task.time] = [...taskTime[task.time], { "key": task.key, "task": task.task }]
        ) : (
          taskTime[task.time] = [{ "key": task.key, "task": task.task }]
        )
      })
    ) : (
      console.log("undefined blinb")
    )
  }
  // {
  //   Object.keys(taskTime).filter((task) => { return task <= value }).map((keys) => {
  //     console.log(value)
  //     console.log(keys)
  //     taskTime[keys].map((task) => (
  //       console.log(task)
  //     ))
  //     console.log("######################")
  //   })
  // }
  return (
    <div div className="App" >
      {(typeof backendData === 'undefined' /*|| !showTasks */ || value === '') ? (
        <div className='timer'>
          <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
          <select id="min/hour" className='mode'>
            <option value="minutesMode">minutes</option>
            <option value="hoursMode">hours</option>
          </select>
          <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>What to do?</button>
        </div>
      ) : (
        <div className='wrapper'>
          <div className='timer2'>
            <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
            <select id="min/hour" className='mode'>
              <option value="minutesMode">minutes</option>
              <option value="hoursMode">hours</option>
            </select>
            <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>Main page</button>
          </div>
          <dl className='itemList'>
            {Object.keys(taskTime).filter((time) => { return time <= parseInt(value) }).map((keys) => (
              <>
                <dt key={keys}>{keys} min.</dt>
                {taskTime[keys].map((task) => (
                  <dd key={task.key}>{task.task}</dd>
                ))}
              </>
            ))}
            {/* {backendData.filter((task) => { return task.time <= value }).map((task) => (
              <>
                {(shown.has(task.time)) ? (
                  <dd key={task.key} className='tasklistcontent'>{task.task}</dd>
                ) : (
                  <>
                    {shown.add(task.time)}
                    <dt key={task.time}>{task.time} min.</dt>
                    <dd key={task.key} className='tasklistcontent'>{task.task}</dd>
                  </>
                )}

              </>
            ))} */}
          </dl>

        </div>
      )
      }

      <div className='footer'> Time saved: 100 hours &nbsp; &nbsp;</div>
    </div>
  );
}

export default App;
