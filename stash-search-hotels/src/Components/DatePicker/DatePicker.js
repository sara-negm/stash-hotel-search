import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setDateRange } from '../../redux/searchSlice';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DatePicker.scss';

export default function DatePicker({ rangeFromRedux }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const toggleRef = useRef(null);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    if (rangeFromRedux?.startDate && rangeFromRedux?.endDate) {
      setRange([
        {
          startDate: new Date(rangeFromRedux.startDate),
          endDate: new Date(rangeFromRedux.endDate),
          key: 'selection',
        },
      ]);
    }
  }, [rangeFromRedux]);

  const handleClickOutside = (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      !toggleRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRangeChange = (item) => {
    const updatedRange = [item.selection];
    setRange(updatedRange);

    dispatch(
      setDateRange({
        startDate: item.selection.startDate,
        endDate: item.selection.endDate,
      })
    );
  };

  const getNights = () =>
    Math.ceil(
      (range[0].endDate - range[0].startDate) / (1000 * 60 * 60 * 24)
    );

  return (
    <div className="date-range-container" ref={wrapperRef}>
      <button
        ref={toggleRef}
        className="summary-input"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="datePickerDialog"
        aria-label={`Select date range. Currently selected ${format(
          range[0].startDate,
          'MMM dd'
        )} to ${format(range[0].endDate, 'MMM dd')}, ${getNights()} night${getNights() > 1 ? 's' : ''}`}
      >
        📅 {format(range[0].startDate, 'MMM dd')} - {format(range[0].endDate, 'MMM dd')} ({getNights()} night{getNights() > 1 ? 's' : ''})
      </button>

      {open && (
        <div
          id="datePickerDialog"
          className="calendar-wrapper"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your check-in and check-out dates"
        >
          <div className="calHeader">
            <div className="check-row">
              <div className="check-label" id="checkin-label">📅 <strong>Check in:</strong></div>
              <div aria-labelledby="checkin-label">{format(range[0].startDate, 'eee MMM dd')}</div>
            </div>
            <div className="check-row">
              <div className="check-label" id="checkout-label">📅 <strong>Check out:</strong></div>
              <div aria-labelledby="checkout-label">{format(range[0].endDate, 'eee MMM dd')}</div>
            </div>
          </div>

          <DateRange
            ranges={range}
            onChange={handleRangeChange}
            months={2}
            direction="horizontal"
            minDate={new Date()}
            locale={enUS}
            showDateDisplay={false}
            rangeColors={['#d67234']}
            ariaLabels={{
              dateInput: {
                startDate: "Check-in date",
                endDate: "Check-out date"
              },
              monthPicker: "Select month",
              yearPicker: "Select year"
            }}
          />
        </div>
      )}
    </div>
  );
}
