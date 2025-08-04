import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimePickerProps, TimePickerState } from './types';
import './TimePicker.css';

const TimePicker: React.FC<TimePickerProps> = ({
  value = '',
  onChange,
  use12Hour = false,
  disabled = false,
  className = '',
  style = {},
  placeholder = 'Select time',
  showSeconds = false,
  minTime,
  maxTime,
  showAmPm = true,
}) => {
  const [state, setState] = useState<TimePickerState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: 'AM',
    isOpen: false,
    activeInput: null,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Parse time string to state
  const parseTime = useCallback((timeStr: string): Partial<TimePickerState> => {
    if (!timeStr) return {};
    
    const parts = timeStr.split(':');
    let hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parts[2] ? parseInt(parts[2], 10) : 0;
    
    let ampm: 'AM' | 'PM' = 'AM';
    
    if (use12Hour) {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }
    
    return { hours, minutes, seconds, ampm };
  }, [use12Hour]);

  // Format state to time string
  const formatTime = useCallback((state: TimePickerState): string => {
    let hours = state.hours;
    
    if (use12Hour) {
      if (state.ampm === 'PM' && hours !== 12) {
        hours += 12;
      } else if (state.ampm === 'AM' && hours === 12) {
        hours = 0;
      }
    }
    
    const timeStr = `${hours.toString().padStart(2, '0')}:${state.minutes.toString().padStart(2, '0')}`;
    return showSeconds ? `${timeStr}:${state.seconds.toString().padStart(2, '0')}` : timeStr;
  }, [use12Hour, showSeconds]);

  // Initialize state from value prop
  useEffect(() => {
    if (value) {
      const parsed = parseTime(value);
      setState(prev => ({ ...prev, ...parsed }));
    }
  }, [value, parseTime]);

  // Handle time change
  const handleTimeChange = useCallback((newState: Partial<TimePickerState>) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
    
    if (onChange) {
      onChange(formatTime(updatedState));
    }
  }, [state, onChange, formatTime]);

  // Handle input change
  const handleInputChange = useCallback((type: 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    let maxValue: number;
    switch (type) {
      case 'hours':
        maxValue = use12Hour ? 12 : 23;
        break;
      case 'minutes':
      case 'seconds':
        maxValue = 59;
        break;
      default:
        return;
    }
    
    if (numValue >= 0 && numValue <= maxValue) {
      handleTimeChange({ [type]: numValue });
    }
  }, [use12Hour, handleTimeChange]);

  // Handle AM/PM toggle
  const handleAmPmToggle = useCallback(() => {
    handleTimeChange({ ampm: state.ampm === 'AM' ? 'PM' : 'AM' });
  }, [state.ampm, handleTimeChange]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setState(prev => ({ ...prev, isOpen: false, activeInput: null }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate number options for dropdown
  const generateOptions = (max: number, start: number = 0) => {
    return Array.from({ length: max - start + 1 }, (_, i) => start + i);
  };

  const displayValue = value || placeholder;

  return (
    <div 
      ref={containerRef}
      className={`react-time-picker ${className} ${disabled ? 'disabled' : ''}`}
      style={style}
    >
      <div 
        className="time-picker-input"
        onClick={() => !disabled && setState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
      >
        <span className="time-display">{displayValue}</span>
        <span className="time-picker-arrow">▼</span>
      </div>
      
      {state.isOpen && !disabled && (
        <div className="time-picker-dropdown">
          <div className="time-picker-section">
            <label>Hours</label>
            <select
              value={state.hours}
              onChange={(e) => handleInputChange('hours', e.target.value)}
              onFocus={() => setState(prev => ({ ...prev, activeInput: 'hours' }))}
            >
              {generateOptions(use12Hour ? 12 : 23, use12Hour ? 1 : 0).map(hour => (
                <option key={hour} value={hour}>
                  {hour.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          
          <div className="time-picker-section">
            <label>Minutes</label>
            <select
              value={state.minutes}
              onChange={(e) => handleInputChange('minutes', e.target.value)}
              onFocus={() => setState(prev => ({ ...prev, activeInput: 'minutes' }))}
            >
              {generateOptions(59).map(minute => (
                <option key={minute} value={minute}>
                  {minute.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          
          {showSeconds && (
            <div className="time-picker-section">
              <label>Seconds</label>
              <select
                value={state.seconds}
                onChange={(e) => handleInputChange('seconds', e.target.value)}
                onFocus={() => setState(prev => ({ ...prev, activeInput: 'seconds' }))}
              >
                {generateOptions(59).map(second => (
                  <option key={second} value={second}>
                    {second.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {use12Hour && showAmPm && (
            <div className="time-picker-section">
              <label>AM/PM</label>
              <div className="ampm-toggle">
                <button
                  type="button"
                  className={`ampm-button ${state.ampm === 'AM' ? 'active' : ''}`}
                  onClick={() => handleTimeChange({ ampm: 'AM' })}
                >
                  AM
                </button>
                <button
                  type="button"
                  className={`ampm-button ${state.ampm === 'PM' ? 'active' : ''}`}
                  onClick={() => handleTimeChange({ ampm: 'PM' })}
                >
                  PM
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimePicker;