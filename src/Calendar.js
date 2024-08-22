import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const currentDate = new Date();

  const getDaysInMonth = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    
    // Fill days from previous month if necessary
    const daysToFill = (firstDay === 0 ? 6 : firstDay - 1);
    for (let i = daysInPreviousMonth - daysToFill + 1; i <= daysInPreviousMonth; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
    
    // Fill days for the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    
    // Fill days for the next month if necessary
    const totalDays = days.length;
    const daysInNextMonth = 42 - totalDays;
    for (let i = 1; i <= daysInNextMonth; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
    
    return days;
  };

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const handleDayClick = (day) => {
    if (day.isCurrentMonth) {
      setSelectedDate(new Date(currentYear, currentMonth, day.day));
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header d-flex justify-content-between align-items-center">
        <div className="month-controls d-flex align-items-center">
          <button onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)} className="btn btn-link px-0">&lt;</button>
          <span id="month" className="ms-2">{monthNames[currentMonth]}</span>
          <button onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)} className="btn btn-link px-0 ms-2">&gt;</button>
        </div>
        <div className="year-controls d-flex align-items-center">
          <button onClick={() => setCurrentYear(currentYear - 1)} className="btn btn-link px-0">&lt;</button>
          <span id="year" className="ms-2">{currentYear}</span>
          <button onClick={() => setCurrentYear(currentYear + 1)} className="btn btn-link px-0 ms-2">&gt;</button>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-days">
          {daysOfWeek.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div id="calendarDates" className="calendar-dates">
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day.isCurrentMonth ? 'current-month-date' : 'adjacent-month-date'} 
                          ${day.isCurrentMonth && day.day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? 'current-date-marker' : ''}
                          ${selectedDate && day.isCurrentMonth && day.day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear() ? 'selected-date' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
