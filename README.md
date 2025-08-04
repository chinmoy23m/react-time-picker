# react-time-picker
User should be able to use this time picker for 12/24 hours time format

## Usage

1. Install React if not already (requires React 18).
```
npm install react react-dom
```

2. Copy `TimePicker.jsx` into your project or import it as a module.

3. Example:
```jsx
import React, { useState } from 'react';
import TimePicker from './TimePicker';

export default function App() {
  const [time, setTime] = useState('');
  const [format, setFormat] = useState('24');

  return (
    <div>
      <label>
        Format:&nbsp;
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="24">24-hours</option>
          <option value="12">12-hours</option>
        </select>
      </label>
      <br />
      <TimePicker
        format={format}
        value={time}
        onChange={setTime}
        step={30} // 30-minute increments
      />
      <p>Selected: {time || '—'}</p>
    </div>
  );
}
```

Feel free to adjust the `step` prop (in minutes) to control how granular the dropdown suggestions are.
