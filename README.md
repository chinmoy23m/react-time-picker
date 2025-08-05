# React Time Picker

A customizable and accessible React time picker component that supports both 12-hour and 24-hour formats. Built with TypeScript and designed for modern React applications.

## Features

- ✅ **12-hour and 24-hour formats** - Switch between AM/PM and 24-hour time display
- ✅ **Seconds support** - Optional seconds selection
- ✅ **Custom step intervals** - Configure minute and second intervals (e.g., 15-minute steps)
- ✅ **TypeScript support** - Full type definitions included
- ✅ **Accessible** - Keyboard navigation and screen reader support
- ✅ **Customizable styling** - CSS classes and inline styles support
- ✅ **Responsive design** - Works on desktop and mobile devices
- ✅ **Dark mode support** - Automatic dark theme detection
- ✅ **Zero dependencies** - Only requires React as peer dependency

## Installation

```bash
npm install react-time-picker
```

or

```bash
yarn add react-time-picker
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { TimePicker } from 'react-time-picker';

function App() {
  const [time, setTime] = useState('');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      format12Hour={false}
      placeholder="Select time"
    />
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | The current time value in HH:MM format (24h) or HH:MM AM/PM format (12h) |
| `onChange` | `(time: string) => void` | `undefined` | Callback function called when time changes |
| `format12Hour` | `boolean` | `false` | Whether to use 12-hour format (true) or 24-hour format (false) |
| `disabled` | `boolean` | `false` | Whether the time picker is disabled |
| `placeholder` | `string` | `'Select time'` | Placeholder text for the input field |
| `className` | `string` | `''` | Custom CSS class name for styling |
| `style` | `React.CSSProperties` | `undefined` | Inline styles for the component |
| `showSeconds` | `boolean` | `false` | Whether to show seconds in the time picker |
| `minuteStep` | `number` | `1` | Step value for minutes (e.g., 15 for 15-minute intervals) |
| `secondStep` | `number` | `1` | Step value for seconds (e.g., 30 for 30-second intervals) |

### Types

```tsx
interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  format12Hour?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  showSeconds?: boolean;
  minuteStep?: number;
  secondStep?: number;
}

interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
  period?: 'AM' | 'PM';
}
```

## Examples

### 24-Hour Format

```tsx
import { TimePicker } from 'react-time-picker';

function Example() {
  const [time, setTime] = useState('14:30');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      format12Hour={false}
      placeholder="Select time (24h)"
    />
  );
}
```

### 12-Hour Format with AM/PM

```tsx
import { TimePicker } from 'react-time-picker';

function Example() {
  const [time, setTime] = useState('2:30 PM');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      format12Hour={true}
      placeholder="Select time (12h)"
    />
  );
}
```

### With Seconds

```tsx
import { TimePicker } from 'react-time-picker';

function Example() {
  const [time, setTime] = useState('14:30:45');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      showSeconds={true}
      placeholder="Select time with seconds"
    />
  );
}
```

### 15-Minute Intervals

```tsx
import { TimePicker } from 'react-time-picker';

function Example() {
  const [time, setTime] = useState('14:00');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      minuteStep={15}
      placeholder="Select time (15min steps)"
    />
  );
}
```

### Custom Styling

```tsx
import { TimePicker } from 'react-time-picker';
import './custom-styles.css';

function Example() {
  const [time, setTime] = useState('');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      className="my-custom-time-picker"
      style={{ width: '250px' }}
    />
  );
}
```

## Styling

The component comes with default styling that supports both light and dark themes. You can customize the appearance using CSS classes:

```css
/* Custom styling example */
.my-custom-time-picker .time-picker-input {
  border: 2px solid #3182ce;
  border-radius: 8px;
  padding: 12px;
}

.my-custom-time-picker .time-picker-input:focus {
  border-color: #2c5aa0;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}
```

### CSS Classes

- `.time-picker` - Main container
- `.time-picker-input` - Input field
- `.time-picker-dropdown` - Dropdown container
- `.time-picker-columns` - Columns container
- `.time-picker-column` - Individual column
- `.time-picker-column-header` - Column header
- `.time-picker-column-list` - Scrollable list
- `.time-picker-option` - Individual time option
- `.time-picker-option.selected` - Selected option

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [chinmoy23mondal@gmail.com]