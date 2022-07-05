import './App.css';

import { useState } from 'react';

function App() {

  const [value, setValue] = useState('');
  /// Problem: user can press other symbols
  const handleValidateKey = (e) => {
    // if (e.key === "C") {
    //   setValue("")
    // }
    // else if (!isNaN(e)) {
    //   console.log("Changing")
    // }
  }

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
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500000);
  }, "Must be a number between 0 and 500000");

  return (
    <div className="App">
      <div className='timer'>
        <input className="numb" id="intLimitTextBox" type="text" placeholder='_' value={value} onKeyDown={(event) => event.target.style.width = (event.target.value.length + 1.2) + 'ch'} onKeyUp={handleValidateKey} onChange={handleChange} />
        {/* <input className="mode" type="text" list='minh' /> */}
        <select id="min/hour" className='mode'>
          <option value="minutesMode">minutes</option>
          <option value="hoursMode">hours</option>
        </select>

      </div>
      <div className='footer'> Time saved: 100 hours &nbsp; &nbsp;</div>
    </div>
  );
}

export default App;
