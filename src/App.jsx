import React, { useState } from 'react'
import TimePicker from './components/TimePicker'
import './App.css'

function App() {
  const [time12Hour, setTime12Hour] = useState('09:30 AM')
  const [time24Hour, setTime24Hour] = useState('14:30')

  return (
    <div className="app">
      <h1>React Time Picker Demo</h1>
      
      <div className="demo-container">
        <div className="demo-section">
          <h2>12-Hour Format</h2>
          <TimePicker
            value={time12Hour}
            onChange={setTime12Hour}
            format="12"
            placeholder="Select time"
          />
          <p className="selected-time">Selected: {time12Hour}</p>
        </div>

        <div className="demo-section">
          <h2>24-Hour Format</h2>
          <TimePicker
            value={time24Hour}
            onChange={setTime24Hour}
            format="24"
            placeholder="Select time"
          />
          <p className="selected-time">Selected: {time24Hour}</p>
        </div>
      </div>

      <div className="features">
        <h3>Features:</h3>
        <ul>
          <li>✅ Configurable 12/24 hour format</li>
          <li>✅ Manual time entry</li>
          <li>✅ Dropdown selection</li>
          <li>✅ AM/PM toggle for 12-hour format</li>
          <li>✅ Keyboard navigation</li>
          <li>✅ Accessible design</li>
          <li>✅ Modern UI</li>
        </ul>
      </div>
    </div>
  )
}

export default App