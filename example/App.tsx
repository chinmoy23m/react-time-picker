import React, { useState } from 'react';
import { TimePicker } from '../src';
import './App.css';

function App() {
  const [time24, setTime24] = useState('14:30');
  const [time12, setTime12] = useState('2:30 PM');
  const [timeWithSeconds, setTimeWithSeconds] = useState('14:30:45');
  const [timeStep, setTimeStep] = useState('14:00');

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Time Picker Examples</h1>
        <p>A customizable time picker component for React</p>
      </header>

      <main className="examples">
        <section className="example-section">
          <h2>24-Hour Format</h2>
          <p>Standard 24-hour time format (HH:MM)</p>
          <TimePicker
            value={time24}
            onChange={setTime24}
            format12Hour={false}
            placeholder="Select time (24h)"
          />
          <p className="selected-time">Selected: {time24}</p>
        </section>

        <section className="example-section">
          <h2>12-Hour Format</h2>
          <p>12-hour time format with AM/PM (HH:MM AM/PM)</p>
          <TimePicker
            value={time12}
            onChange={setTime12}
            format12Hour={true}
            placeholder="Select time (12h)"
          />
          <p className="selected-time">Selected: {time12}</p>
        </section>

        <section className="example-section">
          <h2>With Seconds</h2>
          <p>Time picker that includes seconds selection</p>
          <TimePicker
            value={timeWithSeconds}
            onChange={setTimeWithSeconds}
            format12Hour={false}
            showSeconds={true}
            placeholder="Select time with seconds"
          />
          <p className="selected-time">Selected: {timeWithSeconds}</p>
        </section>

        <section className="example-section">
          <h2>15-Minute Steps</h2>
          <p>Time picker with 15-minute intervals</p>
          <TimePicker
            value={timeStep}
            onChange={setTimeStep}
            format12Hour={false}
            minuteStep={15}
            placeholder="Select time (15min steps)"
          />
          <p className="selected-time">Selected: {timeStep}</p>
        </section>

        <section className="example-section">
          <h2>Disabled State</h2>
          <p>Disabled time picker</p>
          <TimePicker
            value="10:30"
            disabled={true}
            placeholder="Disabled time picker"
          />
        </section>

        <section className="example-section">
          <h2>Custom Styling</h2>
          <p>Time picker with custom CSS class</p>
          <TimePicker
            value={time24}
            onChange={setTime24}
            format12Hour={false}
            className="custom-time-picker"
            placeholder="Custom styled picker"
          />
        </section>
      </main>

      <footer className="App-footer">
        <h3>Installation</h3>
        <pre><code>npm install react-time-picker</code></pre>
        
        <h3>Basic Usage</h3>
        <pre><code>{`import { TimePicker } from 'react-time-picker';

function MyComponent() {
  const [time, setTime] = useState('');
  
  return (
    <TimePicker
      value={time}
      onChange={setTime}
      format12Hour={false}
      placeholder="Select time"
    />
  );
}`}</code></pre>
      </footer>
    </div>
  );
}

export default App;