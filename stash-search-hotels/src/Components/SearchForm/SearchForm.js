import React, { useEffect, useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import GuestSelection from "../GuestSelection/GuestSelection";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setHotelName,
  setDateRange,
  setAdults,
  setChildren,
} from "../../redux/searchSlice";
import "./SearchForm.scss";

export default function SearchForm() {
  const { adults, children, dateRange, location, hotelName } = useSelector((state) => state.search);
  const res = location.trim() !== '' ? hotelName : location;
  const [searchInput, setSearchInput] = useState(res);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const isCity = /^[a-zA-Z\s]+$/.test(searchInput.trim());
    if (isCity) {
      dispatch(setLocation(searchInput.trim()));
      dispatch(setHotelName(""));
    } else {
      dispatch(setHotelName(searchInput.trim()));
      dispatch(setLocation(""));
    }

    dispatch(setDateRange({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }));
    dispatch(setAdults(adults));
    dispatch(setChildren(children));
    navigate('/searchResult')
  };
  useEffect(() => {
    const defaultInput = location.trim() !== "" ? location : hotelName;
    setSearchInput(defaultInput);
  }, [location, hotelName]);

  return <form onSubmit={handleSearch} className="formContainer">
    <div className="searchForm">
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <DatePicker rangeFromRedux={dateRange} />
      <GuestSelection
        onSetAdults={(val) => dispatch(setAdults(val))}
        onSetChildren={(val) => dispatch(setChildren(val))}
      />
      <button className="searchBtn" type="submit" disabled={searchInput.trim() === ""}>Search</button>
    </div>
  </form>

}