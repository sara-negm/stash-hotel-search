import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdults, setChildren } from '../../redux/searchSlice';
import './GuestSelection.scss';

export default function GuestSelection() {
  const dispatch = useDispatch();
  const { adults, children } = useSelector((state) => state.search);

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function pluralize(count, singular, plural = `${singular}s`) {
    return `${count} ${count === 1 ? singular : plural}`;
  }

  const childrenText = children > 0 ? ` & ${pluralize(children, 'Child', 'Children')}` : '';

  const handleAdultChange = (delta) => {
    dispatch(setAdults(Math.max(1, adults + delta)));
  };

  const handleChildChange = (delta) => {
    dispatch(setChildren(Math.max(0, children + delta)));
  };

  return (
    <div className="guest-selector" ref={wrapperRef}>
      <button
        className="input-wrapper"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="guestDropdown"
        ref={buttonRef}
        aria-label={`Guest selector. Currently selected ${pluralize(adults, 'Adult')}${childrenText}`}
      >
        <input
          type="text"
          readOnly
          value={`${pluralize(adults, 'Adult')}${childrenText}`}
          className="custom-input"
          aria-hidden="true"
          tabIndex={-1}
        />
        <span className="chevron-icon" aria-hidden="true">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      {isOpen && (
        <div
          id="guestDropdown"
          className="selector-dropdown"
          role="dialog"
          aria-label="Select number of guests"
        >
          <div className="row">
            <label id="adults-label" className="sr-only">Adults</label>
            <span aria-labelledby="adults-label">Adults</span>
            <div className="controls" role="group" aria-label="Adults count">
              <button
                type="button"
                onClick={() => handleAdultChange(-1)}
                aria-label="Decrease adults"
              >
                −
              </button>
              <span aria-live="polite">{adults}</span>
              <button
                type="button"
                onClick={() => handleAdultChange(1)}
                aria-label="Increase adults"
              >
                +
              </button>
            </div>
          </div>

          <div className="row">
            <label id="children-label" className="sr-only">Children</label>
            <span aria-labelledby="children-label">Children</span>
            <div className="controls" role="group" aria-label="Children count">
              <button
                type="button"
                onClick={() => handleChildChange(-1)}
                aria-label="Decrease children"
              >
                −
              </button>
              <span aria-live="polite">{children}</span>
              <button
                type="button"
                onClick={() => handleChildChange(1)}
                aria-label="Increase children"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
