import React, { useState } from 'react';
import { TimePicker } from '../src';

function App() {
  const [time24, setTime24] = useState('');
  const [time12, setTime12] = useState('');
  const [timeWithSeconds, setTimeWithSeconds] = useState('');
  const [disabledTime, setDisabledTime] = useState('09:00');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Time Picker Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>24-Hour Format</h2>
        <TimePicker
          value={time24}
          onChange={setTime24}
          placeholder="Select time (24-hour)"
        />
        <p>Selected time: {time24 || 'None'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>12-Hour Format</h2>
        <TimePicker
          value={time12}
          onChange={setTime12}
          use12Hour={true}
          placeholder="Select time (12-hour)"
        />
        <p>Selected time: {time12 || 'None'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>With Seconds</h2>
        <TimePicker
          value={timeWithSeconds}
          onChange={setTimeWithSeconds}
          showSeconds={true}
          placeholder="Select time with seconds"
        />
        <p>Selected time: {timeWithSeconds || 'None'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Disabled State</h2>
        <TimePicker
          value={disabledTime}
          onChange={setDisabledTime}
          disabled={true}
          placeholder="Disabled time picker"
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Custom Styling</h2>
        <TimePicker
          value={time24}
          onChange={setTime24}
          className="custom-time-picker"
          style={{
            border: '2px solid #3b82f6',
            borderRadius: '8px',
            backgroundColor: '#f8fafc'
          }}
          placeholder="Custom styled picker"
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>With Time Constraints</h2>
        <TimePicker
          value={time24}
          onChange={setTime24}
          minTime="09:00"
          maxTime="17:00"
          placeholder="Select time between 9 AM and 5 PM"
        />
      </div>
    </div>
  );
}

export default App;