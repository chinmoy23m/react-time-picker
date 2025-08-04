export interface TimePickerProps {
  /** Current time value in HH:mm format */
  value?: string;
  /** Callback when time changes */
  onChange?: (time: string) => void;
  /** Whether to use 12-hour format (default: false) */
  use12Hour?: boolean;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Custom CSS class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Placeholder text */
  placeholder?: string;
  /** Whether to show seconds picker */
  showSeconds?: boolean;
  /** Minimum time allowed */
  minTime?: string;
  /** Maximum time allowed */
  maxTime?: string;
  /** Whether to show AM/PM selector for 12-hour format */
  showAmPm?: boolean;
}

export interface TimePickerState {
  hours: number;
  minutes: number;
  seconds: number;
  ampm: 'AM' | 'PM';
  isOpen: boolean;
  activeInput: 'hours' | 'minutes' | 'seconds' | null;
}