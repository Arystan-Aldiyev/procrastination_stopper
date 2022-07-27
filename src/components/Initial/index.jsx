export const Initial = () => {
  return (
    <div className='timer'>
      <input className="numb" id="intLimitTextBox" autoFocus type="text" placeholder='__' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onChange={handleChange} />
      <select id="min/hour" className='mode'>
        <option value="minutesMode">minutes</option>
        <option value="hoursMode">hours</option>
      </select>
      <button id="myBtn" className='buttonToDo' onClick={() => { toggleShowTasks(!showTasks) }}>Random</button>
    </div>
  )
}