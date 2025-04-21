import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  hotelName: '',
  dateRange: {
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
  },
  adults: 1,
  children: 0,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setHotelName: (state, action) => {
      state.hotelName = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = {
        startDate: new Date(action.payload.startDate).toISOString(),
        endDate: new Date(action.payload.endDate).toISOString(),
      };
    },
    setAdults: (state, action) => {
      state.adults = action.payload;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
    },
  },
});

export const {
  setLocation,
  setHotelName,
  setDateRange,
  setAdults,
  setChildren,
} = searchSlice.actions;

export default searchSlice.reducer;
