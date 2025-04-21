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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function pluralize(count, singular, plural = `${singular}s`) {
    return `${count} ${count === 1 ? singular : plural}`;
  }

  const childrenText = children > 0 ? ` & ${pluralize(children, 'Child', 'Children')}` : '';

  const handleAdultChange = (delta) => {
    const newValue = Math.max(1, adults + delta);
    dispatch(setAdults(newValue));
  };

  const handleChildChange = (delta) => {
    const newValue = Math.max(0, children + delta);
    dispatch(setChildren(newValue));
  };

  return (
    <div className="guest-selector" ref={wrapperRef}>
      <div className="input-wrapper" onClick={() => setIsOpen(true)}>
        <input
          type="text"
          readOnly
          value={`${pluralize(adults, 'Adult')}${childrenText}`}
          className="custom-input"
        />
        <span className="chevron-icon">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {isOpen && (
        <div className="selector-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="row">
            <span>Adults</span>
            <div className="controls">
              <button type="button" onClick={() => handleAdultChange(-1)}>−</button>
              <span>{adults}</span>
              <button type="button" onClick={() => handleAdultChange(1)}>+</button>
            </div>
          </div>
          <div className="row">
            <span>Children</span>
            <div className="controls">
              <button type="button" onClick={() => handleChildChange(-1)}>−</button>
              <span>{children}</span>
              <button type="button" onClick={() => handleChildChange(1)}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
