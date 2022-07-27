import './App.css';

import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Random } from './components/Random'

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
  const [reloader, setReloader] = useState(false)

  const taskTime = require('./taski.json')

  // useEffect(() => {
  //   if (value) {
  //     generateRandom()
  //   }
  // }, [showTasks]);

  // const [randomTaski, setRandomTaski] = useState([])
  // const generateRandom = () => {
  //   const randomTasks = new Set();
  //   while (randomTasks.size < 3) {
  //     if (parseInt(value) <= 2) {
  //       const randomTask = taskTime[value][Math.floor(Math.random() * taskTime[value].length)]
  //       randomTasks.add(randomTask)
  //     }
  //     setRandomTaski([...randomTasks])
  //   }
  //   return (
  //     <li>{randomTaski[0].task}</li>
  // )
  // console.log([...randomTasks])
  // return (
  //   <div key={uuid()}>
  //     {[...randomTasks].map((task) => (
  //       <li key={uuid()}>{task.task}</li>
  //     ))}
  //   </div>
  // )
  // while (randomTasks.length < 3) {
  //   if (parseInt(value) <= 2) {
  //     const randomTask = taskTime[value][Math.floor(Math.random() * taskTime[value].length)]
  //     if (!randomTasks.includes(randomTask)) {
  //       setRandomTasks((prev) => [...prev, randomTask])
  //       // randomTasks.push(randomTask)
  //     }
  //   }
  //   if (parseInt(value) > 2 & parseInt(value) <= 5) {
  //     console.log('ot 3 do 5')
  //     // const randomTask = taskTime[value][Math.floor(Math.random() * taskTime[value].length)]
  //     // if (!randomTasks.includes(randomTask)) {
  //     //   randomTasks.push(randomTask)
  //     // }
  //   }
  // }
  // }

  return (
    <div className="App" >
      {(!showTasks) ? (
        <div className='timer'>
          <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
          <select id="min/hour" className='mode'>
            <option value="minutesMode">minutes</option>
            <option value="hoursMode">hours</option>
          </select>
          <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>Random</button>
        </div>
      ) : (
        <div className='wrapper'>
          <div className='timer2'>
            <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
            <select id="min/hour" className='mode'>
              <option value="minutesMode">minutes</option>
              <option value="hoursMode">hours</option>
            </select>
            <button id="myBtn" className='buttonToDo' onClick={() => { setValue(value) }}>Change tasks</button>
          </div>
          <div>
            {value === '' ? (
              <ul className='itemList'>
                <li>You can do nothing in 0 minutes</li>
              </ul>
            ) : (
              <Random taskTime={taskTime} value={value} />
            )}
            {/* <ul className='itemList'>
              <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
              <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
              <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
            </ul> */}
          </div>
          {/* {(showTasks) ? (
              <div>
                <dl className='itemList'>
                  {Object.keys(taskTime).filter((time) => { return time <= parseInt(value) }).map((minutes) => (
                    <div key={uuid()}>
                      <dt key={minutes}>{minutes} min.</dt>
                      {taskTime[minutes].map((task) => (
                        <dd key={uuid()}>{task.task}</dd>
                      ))}
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <div>
                <ul className='itemList'>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                </ul>
              </div>
            )} */}
        </div>
      )
      }

      <div className='footer'> Time saved: 100 hours &nbsp; &nbsp;</div>
    </div>
  );
}

export default App;
