import React, { useState } from 'react'
import TimePicker from './TimePicker'

const TimePickerExample = () => {
  const [time1, setTime1] = useState('')
  const [time2, setTime2] = useState('15:45')
  const [time3, setTime3] = useState('11:30 AM')
  const [time4, setTime4] = useState('')
  const [disabled, setDisabled] = useState(false)

  return (
    <div className="time-picker-examples">
      <h2>Time Picker Examples</h2>
      
      <div className="example-grid">
        <div className="example-item">
          <h3>Empty 24-Hour</h3>
          <TimePicker
            value={time1}
            onChange={setTime1}
            format="24"
            placeholder="Enter time (24h)"
          />
          <p>Value: {time1 || 'None'}</p>
        </div>

        <div className="example-item">
          <h3>Pre-filled 24-Hour</h3>
          <TimePicker
            value={time2}
            onChange={setTime2}
            format="24"
            placeholder="Enter time (24h)"
          />
          <p>Value: {time2}</p>
        </div>

        <div className="example-item">
          <h3>12-Hour Format</h3>
          <TimePicker
            value={time3}
            onChange={setTime3}
            format="12"
            placeholder="Enter time (12h)"
          />
          <p>Value: {time3}</p>
        </div>

        <div className="example-item">
          <h3>Disabled State</h3>
          <TimePicker
            value={time4}
            onChange={setTime4}
            format="24"
            placeholder="Disabled time picker"
            disabled={disabled}
          />
          <button 
            onClick={() => setDisabled(!disabled)}
            style={{ marginTop: '8px', padding: '4px 8px' }}
          >
            {disabled ? 'Enable' : 'Disable'}
          </button>
        </div>
      </div>

      <div className="usage-tips">
        <h3>Usage Tips:</h3>
        <ul>
          <li>Click the clock icon to open the dropdown</li>
          <li>Type directly in the input field for manual entry</li>
          <li>Use Tab to navigate between elements</li>
          <li>Press Escape to close the dropdown</li>
          <li>For 12-hour format, use AM/PM buttons</li>
        </ul>
      </div>
    </div>
  )
}

export default TimePickerExample