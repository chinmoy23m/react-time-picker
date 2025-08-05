// TimePicker.jsx
import React, { useMemo, useId } from 'react';

/**
 * TimePicker Component
 *
 * Props:
 *  - format: '12' | '24' (default '24')
 *  - step: number (minutes increment, default 30)
 *  - value?: string  (controlled value)
 *  - onChange?: (value: string) => void (called on value change, string representation matches format)
 *
 * Users can either select a value from the dropdown or type a custom time
 * according to the chosen format.
 */
export default function TimePicker({
  format = '24',
  step = 30,
  value,
  onChange,
  ...rest
}) {
  const datalistId = useId();

  // Generate time options based on format and step.
  const options = useMemo(() => generateTimeOptions(format, step), [format, step]);

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    if (onChange) {
      onChange(inputVal);
    }
  };

  return (
    <div className="time-picker">
      <input
        list={datalistId}
        value={value}
        onChange={handleInputChange}
        placeholder={format === '12' ? 'hh:mm AM/PM' : 'HH:mm'}
        {...rest}
      />
      <datalist id={datalistId}>
        {options.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </div>
  );
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function generateTimeOptions(format, step) {
  const opts = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += step) {
    const hrs24 = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (format === '24') {
      opts.push(`${pad(hrs24)}:${pad(mins)}`);
    } else {
      // 12-hour format
      const period = hrs24 >= 12 ? 'PM' : 'AM';
      const hrs12 = hrs24 % 12 === 0 ? 12 : hrs24 % 12;
      opts.push(`${pad(hrs12)}:${pad(mins)} ${period}`);
    }
  }
  return opts;
}