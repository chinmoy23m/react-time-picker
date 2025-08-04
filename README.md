# React Time Picker

A customizable React time picker component supporting both 12-hour and 24-hour formats. Easy to install and use in any React project.

## Features

- ✅ **12/24 Hour Format Support** - Choose between 12-hour (AM/PM) or 24-hour format
- ✅ **Seconds Picker** - Optional seconds selection
- ✅ **Customizable Styling** - Custom CSS classes and inline styles
- ✅ **Accessible** - Keyboard navigation and screen reader support
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Dark Mode Support** - Automatic dark mode detection
- ✅ **TypeScript Support** - Full TypeScript definitions included
- ✅ **No Dependencies** - Zero runtime dependencies (only React peer dependency)

## Installation

```bash
npm install react-time-picker
```

or

```bash
yarn add react-time-picker
```

## Basic Usage

```jsx
import React, { useState } from 'react';
import { TimePicker } from 'react-time-picker';

function App() {
  const [time, setTime] = useState('');

  return (
    <div>
      <h2>24-Hour Format</h2>
      <TimePicker
        value={time}
        onChange={setTime}
        placeholder="Select time"
      />
      
      <h2>12-Hour Format</h2>
      <TimePicker
        value={time}
        onChange={setTime}
        use12Hour={true}
        placeholder="Select time"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Current time value in HH:mm or HH:mm:ss format |
| `onChange` | `(time: string) => void` | - | Callback when time changes |
| `use12Hour` | `boolean` | `false` | Whether to use 12-hour format |
| `disabled` | `boolean` | `false` | Whether the picker is disabled |
| `className` | `string` | `''` | Custom CSS class name |
| `style` | `React.CSSProperties` | `{}` | Custom inline styles |
| `placeholder` | `string` | `'Select time'` | Placeholder text |
| `showSeconds` | `boolean` | `false` | Whether to show seconds picker |
| `minTime` | `string` | - | Minimum time allowed |
| `maxTime` | `string` | - | Maximum time allowed |
| `showAmPm` | `boolean` | `true` | Whether to show AM/PM selector for 12-hour format |

## Examples

### 24-Hour Format with Seconds

```jsx
<TimePicker
  value="14:30:45"
  onChange={setTime}
  showSeconds={true}
  placeholder="Select time with seconds"
/>
```

### 12-Hour Format

```jsx
<TimePicker
  value="02:30 PM"
  onChange={setTime}
  use12Hour={true}
  showAmPm={true}
  placeholder="Select time (12-hour)"
/>
```

### Disabled State

```jsx
<TimePicker
  value="09:00"
  onChange={setTime}
  disabled={true}
/>
```

### Custom Styling

```jsx
<TimePicker
  value={time}
  onChange={setTime}
  className="my-custom-time-picker"
  style={{
    border: '2px solid #3b82f6',
    borderRadius: '8px'
  }}
/>
```

### With Time Constraints

```jsx
<TimePicker
  value={time}
  onChange={setTime}
  minTime="09:00"
  maxTime="17:00"
  placeholder="Select time between 9 AM and 5 PM"
/>
```

## Styling

The component comes with built-in styles that work out of the box. You can customize the appearance using:

1. **CSS Classes**: Add your own CSS classes via the `className` prop
2. **Inline Styles**: Use the `style` prop for custom inline styles
3. **CSS Custom Properties**: Override the default styles using CSS custom properties

### Custom CSS Example

```css
.my-custom-time-picker {
  --time-picker-border-color: #3b82f6;
  --time-picker-background: #f8fafc;
  --time-picker-text-color: #1e293b;
}

.my-custom-time-picker .time-picker-input {
  border-radius: 12px;
  padding: 12px 16px;
}
```

## TypeScript

The package includes full TypeScript support with exported types:

```typescript
import { TimePicker, TimePickerProps } from 'react-time-picker';

interface MyComponentProps {
  time: string;
  onTimeChange: (time: string) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ time, onTimeChange }) => {
  return (
    <TimePicker
      value={time}
      onChange={onTimeChange}
      use12Hour={true}
    />
  );
};
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Prerequisites

- Node.js 14+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

### Project Structure

```
src/
├── index.ts          # Main exports
├── TimePicker.tsx    # Main component
├── types.ts          # TypeScript definitions
└── TimePicker.css    # Component styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0
- Initial release
- Support for 12/24 hour formats
- Optional seconds picker
- Customizable styling
- TypeScript support
- Responsive design
- Dark mode support
