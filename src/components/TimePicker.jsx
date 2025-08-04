import React, { useState, useRef, useEffect } from 'react'
import './TimePicker.css'

const TimePicker = ({ 
  value = '', 
  onChange, 
  format = '24', 
  placeholder = 'Select time',
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [period, setPeriod] = useState('AM')
  const containerRef = useRef(null)

  // Parse initial value
  useEffect(() => {
    if (value) {
      const parsed = parseTime(value, format)
      if (parsed) {
        setHours(parsed.hours.toString().padStart(2, '0'))
        setMinutes(parsed.minutes.toString().padStart(2, '0'))
        setPeriod(parsed.period || 'AM')
        setInputValue(value)
      }
    }
  }, [value, format])

  // Parse time string based on format
  const parseTime = (timeStr, timeFormat) => {
    if (!timeStr) return null

    if (timeFormat === '12') {
      // Parse 12-hour format (e.g., "09:30 AM", "2:45 PM")
      const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
      if (match) {
        let hours = parseInt(match[1])
        const minutes = parseInt(match[2])
        const period = match[3].toUpperCase()
        
        if (hours === 12) {
          hours = period === 'PM' ? 12 : 0
        } else if (period === 'PM') {
          hours += 12
        }
        
        return { hours, minutes, period }
      }
    } else {
      // Parse 24-hour format (e.g., "14:30", "09:15")
      const match = timeStr.match(/^(\d{1,2}):(\d{2})$/)
      if (match) {
        const hours = parseInt(match[1])
        const minutes = parseInt(match[2])
        return { hours, minutes }
      }
    }
    return null
  }

  // Format time for display
  const formatTime = (hours, minutes, period = 'AM') => {
    if (format === '12') {
      let displayHours = hours
      if (hours === 0) {
        displayHours = 12
      } else if (hours > 12) {
        displayHours = hours - 12
      }
      return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }
  }

  // Convert 12-hour to 24-hour
  const convertTo24Hour = (hours, period) => {
    if (period === 'PM' && hours !== 12) {
      return hours + 12
    } else if (period === 'AM' && hours === 12) {
      return 0
    }
    return hours
  }

  // Convert 24-hour to 12-hour
  const convertTo12Hour = (hours) => {
    if (hours === 0) return 12
    if (hours > 12) return hours - 12
    return hours
  }

  // Handle time selection
  const handleTimeSelect = (newHours, newMinutes, newPeriod = period) => {
    const validHours = Math.max(0, Math.min(format === '12' ? 12 : 23, newHours))
    const validMinutes = Math.max(0, Math.min(59, newMinutes))
    
    setHours(validHours.toString().padStart(2, '0'))
    setMinutes(validMinutes.toString().padStart(2, '0'))
    if (format === '12') {
      setPeriod(newPeriod)
    }

    const formattedTime = formatTime(validHours, validMinutes, newPeriod)
    setInputValue(formattedTime)
    onChange?.(formattedTime)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    const parsed = parseTime(newValue, format)
    if (parsed) {
      setHours(parsed.hours.toString().padStart(2, '0'))
      setMinutes(parsed.minutes.toString().padStart(2, '0'))
      if (parsed.period) setPeriod(parsed.period)
      onChange?.(newValue)
    }
  }

  // Handle input blur
  const handleInputBlur = () => {
    const parsed = parseTime(inputValue, format)
    if (parsed) {
      const formattedTime = formatTime(parsed.hours, parsed.minutes, parsed.period)
      setInputValue(formattedTime)
      onChange?.(formattedTime)
    }
  }

  // Generate hour options
  const generateHourOptions = () => {
    const maxHour = format === '12' ? 12 : 23
    const options = []
    
    for (let i = format === '12' ? 1 : 0; i <= maxHour; i++) {
      options.push(i.toString().padStart(2, '0'))
    }
    return options
  }

  // Generate minute options
  const generateMinuteOptions = () => {
    const options = []
    for (let i = 0; i < 60; i++) {
      options.push(i.toString().padStart(2, '0'))
    }
    return options
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="time-picker-container" ref={containerRef}>
      <div className="time-picker-input-wrapper">
        <input
          type="text"
          className="time-picker-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Time input"
        />
        <button
          type="button"
          className="time-picker-toggle"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label="Toggle time picker"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="time-picker-dropdown">
          <div className="time-picker-section">
            <label className="time-picker-label">Hours</label>
            <select
              className="time-picker-select"
              value={hours}
              onChange={(e) => handleTimeSelect(parseInt(e.target.value), parseInt(minutes))}
            >
              {generateHourOptions().map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </div>

          <div className="time-picker-separator">:</div>

          <div className="time-picker-section">
            <label className="time-picker-label">Minutes</label>
            <select
              className="time-picker-select"
              value={minutes}
              onChange={(e) => handleTimeSelect(parseInt(hours), parseInt(e.target.value))}
            >
              {generateMinuteOptions().map(minute => (
                <option key={minute} value={minute}>{minute}</option>
              ))}
            </select>
          </div>

          {format === '12' && (
            <>
              <div className="time-picker-separator"></div>
              <div className="time-picker-section">
                <label className="time-picker-label">Period</label>
                <div className="time-picker-period-buttons">
                  <button
                    type="button"
                    className={`time-picker-period-btn ${period === 'AM' ? 'active' : ''}`}
                    onClick={() => handleTimeSelect(parseInt(hours), parseInt(minutes), 'AM')}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    className={`time-picker-period-btn ${period === 'PM' ? 'active' : ''}`}
                    onClick={() => handleTimeSelect(parseInt(hours), parseInt(minutes), 'PM')}
                  >
                    PM
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default TimePicker