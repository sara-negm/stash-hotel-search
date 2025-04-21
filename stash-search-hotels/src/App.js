import './App.css';
import Home from './Pages/Home/Home';
import store, { persistor } from "./redux/store"; // ✅ import your store here
import HotelDetails from "./Pages/HotelDetails/HotelDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import SearchResult from './Pages/SearchResult/SearchResult';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchResult" element={<SearchResult />} />
        <Route path="/HotelDetails/:id" element={<HotelDetails />} />
      </Routes>
    </Router>
   </PersistGate>
  </Provider>
  );
}

export default App;
