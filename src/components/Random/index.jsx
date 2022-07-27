import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export const Random = ({ valu }) => {
  const [value, setValue] = useState(valu);
  const taskTime = require('../../taski.json')
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const [randomTaski, setRandomTaski] = useState(new Set())
  const generateRandom = () => {
    const randomTasks = new Set();
    while (randomTasks.size < 3) {
      if (parseInt(value) <= 2) {
        const randomTask = taskTime[value][Math.floor(Math.random() * taskTime[value].length)]
        randomTasks.add(randomTask)
        setRandomTaski(randomTaski.add(randomTask))
      }
    }
    console.log(randomTaski)
  }

  return (
    <div className='wrapper'>
      <div className='timer2'>
        <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
        <select id="min/hour" className='mode'>
          <option value="minutesMode">minutes</option>
          <option value="hoursMode">hours</option>
        </select>
        <button id="myBtn" className='buttonToDo' onClick={() => { generateRandom() }}>Change tasks</button>
      </div>
      <div>
        <ul className='itemList'>
          <div key={uuid()}>
            {[...randomTaski].map((task) => (
              <li key={uuid()}>{task.task}</li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  )
}