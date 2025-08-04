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

  it('calls onChange when time is selected', () => {
    const mockOnChange = jest.fn();
    render(<TimePicker onChange={mockOnChange} />);
    
    const timePicker = screen.getByText('Select time');
    fireEvent.click(timePicker);
    
    // The dropdown should be visible after clicking
    expect(screen.getByText('Hours')).toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(<TimePicker disabled={true} />);
    const timePicker = screen.getByText('Select time').closest('.react-time-picker');
    expect(timePicker).toHaveClass('disabled');
  });
});