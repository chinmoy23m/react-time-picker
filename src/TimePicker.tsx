import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimePickerProps, TimeValue } from './types';
import { 
  parseTimeString, 
  formatTimeValue, 
  convertTo24Hour, 
  convertTo12Hour, 
  generateNumberArray,
  isValidTimeString 
} from './utils';
import './TimePicker.css';

const TimePicker: React.FC<TimePickerProps> = ({
  value = '',
  onChange,
  format12Hour = false,
  disabled = false,
  placeholder = 'Select time',
  className = '',
  style,
  showSeconds = false,
  minuteStep = 1,
  secondStep = 1
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [timeValue, setTimeValue] = useState<TimeValue | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize time value from prop
  useEffect(() => {
    if (value) {
      const parsed = parseTimeString(value, format12Hour);
      if (parsed) {
        setTimeValue(parsed);
        setInputValue(value);
      }
    }
  }, [value, format12Hour]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (isValidTimeString(newValue, format12Hour)) {
      const parsed = parseTimeString(newValue, format12Hour);
      if (parsed) {
        setTimeValue(parsed);
        onChange?.(newValue);
      }
    }
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleTimeSelect = useCallback((newTimeValue: TimeValue) => {
    setTimeValue(newTimeValue);
    const formattedTime = formatTimeValue(newTimeValue, format12Hour, showSeconds);
    setInputValue(formattedTime);
    onChange?.(formattedTime);
    setIsOpen(false);
  }, [format12Hour, showSeconds, onChange]);

  const generateHours = () => {
    if (format12Hour) {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    } else {
      return Array.from({ length: 24 }, (_, i) => i);
    }
  };

  const generateMinutes = () => generateNumberArray(60, minuteStep);
  const generateSeconds = () => generateNumberArray(60, secondStep);

  const getCurrentTimeValue = (): TimeValue => {
    if (timeValue) return timeValue;
    
    // Default to current time or 12:00 AM/00:00
    const now = new Date();
    if (format12Hour) {
      const { hours, period } = convertTo12Hour(now.getHours());
      return { hours, minutes: now.getMinutes(), seconds: now.getSeconds(), period };
    } else {
      return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
    }
  };

  const currentTime = getCurrentTimeValue();

  return (
    <div className={`time-picker ${className}`} style={style} ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder={placeholder}
        disabled={disabled}
        className={`time-picker-input ${disabled ? 'disabled' : ''}`}
        readOnly={false}
      />
      
      {isOpen && !disabled && (
        <div className="time-picker-dropdown">
          <div className="time-picker-columns">
            {/* Hours Column */}
            <div className="time-picker-column">
              <div className="time-picker-column-header">Hours</div>
              <div className="time-picker-column-list">
                {generateHours().map((hour) => (
                  <div
                    key={hour}
                    className={`time-picker-option ${currentTime.hours === hour ? 'selected' : ''}`}
                    onClick={() => {
                      const newTime = { ...currentTime, hours: hour };
                      handleTimeSelect(newTime);
                    }}
                  >
                    {format12Hour ? hour : hour.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div className="time-picker-column">
              <div className="time-picker-column-header">Minutes</div>
              <div className="time-picker-column-list">
                {generateMinutes().map((minute) => (
                  <div
                    key={minute}
                    className={`time-picker-option ${currentTime.minutes === minute ? 'selected' : ''}`}
                    onClick={() => {
                      const newTime = { ...currentTime, minutes: minute };
                      handleTimeSelect(newTime);
                    }}
                  >
                    {minute.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>

            {/* Seconds Column (if enabled) */}
            {showSeconds && (
              <div className="time-picker-column">
                <div className="time-picker-column-header">Seconds</div>
                <div className="time-picker-column-list">
                  {generateSeconds().map((second) => (
                    <div
                      key={second}
                      className={`time-picker-option ${currentTime.seconds === second ? 'selected' : ''}`}
                      onClick={() => {
                        const newTime = { ...currentTime, seconds: second };
                        handleTimeSelect(newTime);
                      }}
                    >
                      {second.toString().padStart(2, '0')}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AM/PM Column (if 12-hour format) */}
            {format12Hour && (
              <div className="time-picker-column">
                <div className="time-picker-column-header">Period</div>
                <div className="time-picker-column-list">
                  {['AM', 'PM'].map((period) => (
                    <div
                      key={period}
                      className={`time-picker-option ${currentTime.period === period ? 'selected' : ''}`}
                      onClick={() => {
                        const newTime = { ...currentTime, period: period as 'AM' | 'PM' };
                        handleTimeSelect(newTime);
                      }}
                    >
                      {period}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;