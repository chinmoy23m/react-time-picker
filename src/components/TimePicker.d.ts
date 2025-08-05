import React from 'react'

export interface TimePickerProps {
  /** The current time value */
  value?: string
  /** Callback function called when time changes */
  onChange?: (time: string) => void
  /** Time format to use - '12' for 12-hour format, '24' for 24-hour format */
  format?: '12' | '24'
  /** Placeholder text for the input */
  placeholder?: string
  /** Whether the time picker is disabled */
  disabled?: boolean
}

declare const TimePicker: React.FC<TimePickerProps>

export default TimePicker