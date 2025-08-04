# React Time Picker

A modern, accessible, and configurable time picker component for React applications with support for both 12-hour and 24-hour time formats.

## Features

- ✅ **Configurable Time Format**: Support for both 12-hour and 24-hour formats
- ✅ **Manual Entry**: Users can type time directly into the input field
- ✅ **Dropdown Selection**: Easy selection via dropdown menus for hours and minutes
- ✅ **AM/PM Toggle**: Convenient AM/PM buttons for 12-hour format
- ✅ **Keyboard Navigation**: Full keyboard accessibility
- ✅ **Modern UI**: Clean, responsive design with smooth animations
- ✅ **Accessible**: WCAG compliant with proper ARIA labels
- ✅ **Mobile Friendly**: Responsive design that works on all devices
- ✅ **TypeScript Ready**: Full TypeScript support (can be easily converted)

## Installation

```bash
npm install
npm run dev
```

## Usage

### Basic Usage

```jsx
import TimePicker from './components/TimePicker'

function App() {
  const [time, setTime] = useState('09:30 AM')

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      format="12"
      placeholder="Select time"
    />
  )
}
```

### 24-Hour Format

```jsx
<TimePicker
  value="14:30"
  onChange={setTime}
  format="24"
  placeholder="Select time"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | The current time value |
| `onChange` | `function` | - | Callback function called when time changes |
| `format` | `'12' \| '24'` | `'24'` | Time format to use |
| `placeholder` | `string` | `'Select time'` | Placeholder text for the input |
| `disabled` | `boolean` | `false` | Whether the time picker is disabled |

## Time Format Examples

### 12-Hour Format
- `"09:30 AM"`
- `"2:45 PM"`
- `"12:00 AM"`

### 24-Hour Format
- `"14:30"`
- `"09:15"`
- `"00:00"`

## Features in Detail

### Manual Time Entry
Users can type time directly into the input field. The component will automatically parse and format the input based on the selected format.

### Dropdown Selection
- **Hours**: Dropdown with appropriate range (1-12 for 12-hour, 0-23 for 24-hour)
- **Minutes**: Dropdown with 00-59 options
- **Period**: AM/PM buttons for 12-hour format

### Keyboard Accessibility
- Tab navigation through all interactive elements
- Enter/Space to activate buttons
- Escape to close dropdown
- Arrow keys for dropdown navigation

### Responsive Design
- Adapts to different screen sizes
- Mobile-optimized layout
- Touch-friendly interface

### Accessibility Features
- Proper ARIA labels and roles
- Focus management
- Screen reader support
- High contrast mode support
- Reduced motion support

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
