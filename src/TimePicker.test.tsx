import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimePicker from './TimePicker';

describe('TimePicker', () => {
  it('renders without crashing', () => {
    render(<TimePicker />);
    expect(screen.getByText('Select time')).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(<TimePicker placeholder="Custom placeholder" />);
    expect(screen.getByText('Custom placeholder')).toBeInTheDocument();
  });

  it('displays value when provided', () => {
    render(<TimePicker value="14:30" />);
    expect(screen.getByText('14:30')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<TimePicker />);
    const input = screen.getByText('Select time').parentElement;
    fireEvent.click(input!);
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
  });

  it('calls onChange when time is selected', () => {
    const mockOnChange = jest.fn();
    render(<TimePicker onChange={mockOnChange} />);
    
    const input = screen.getByText('Select time').parentElement;
    fireEvent.click(input!);
    
    const hoursSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(hoursSelect, { target: { value: '14' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('14:00');
  });

  it('supports 12-hour format', () => {
    render(<TimePicker use12Hour={true} />);
    const input = screen.getByText('Select time').parentElement;
    fireEvent.click(input!);
    
    // Should show AM/PM buttons
    expect(screen.getByText('AM')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('supports seconds when showSeconds is true', () => {
    render(<TimePicker showSeconds={true} />);
    const input = screen.getByText('Select time').parentElement;
    fireEvent.click(input!);
    
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<TimePicker disabled={true} />);
    const container = screen.getByText('Select time').closest('.react-time-picker');
    
    expect(container).toHaveClass('disabled');
  });
});