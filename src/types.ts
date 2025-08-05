export interface TimePickerProps {
  /** The initial time value in HH:MM format (24-hour) or HH:MM AM/PM format (12-hour) */
  value?: string;
  /** Callback function called when time changes */
  onChange?: (time: string) => void;
  /** Whether to use 12-hour format (true) or 24-hour format (false). Default: false */
  format12Hour?: boolean;
  /** Whether the time picker is disabled. Default: false */
  disabled?: boolean;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Custom CSS class name for styling */
  className?: string;
  /** Inline styles for the component */
  style?: React.CSSProperties;
  /** Whether to show seconds in the time picker. Default: false */
  showSeconds?: boolean;
  /** Step value for minutes (e.g., 15 for 15-minute intervals). Default: 1 */
  minuteStep?: number;
  /** Step value for seconds (e.g., 30 for 30-second intervals). Default: 1 */
  secondStep?: number;
}

export interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
  period?: 'AM' | 'PM';
}

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}