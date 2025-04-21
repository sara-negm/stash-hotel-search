import Header from "../../Components/Header/Header";
import SearchForm from "../../Components/SearchForm/SearchForm";
import hotels from '../../data.json';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SearchResult.scss";
import { useState } from "react";
import Filters from "../../Components/Filters/Filters";

export default function SearchResult() {
  const { location, hotelName } = useSelector((state) => state.search);
  const [sortOption, setSortOption] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [compareList, setCompareList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [memberOnly, setMemberOnly] = useState(false);
  const [minRating, setMinRating] = useState('');

  const searchTerm = location.trim() !== "" ? location.toLowerCase() : hotelName.toLowerCase();
  const navigate = useNavigate();

  const toggleCompare = (hotel) => {
    setCompareList((prev) => {
      const exists = prev.find((h) => h.id === hotel.id);
      if (exists) return prev.filter((h) => h.id !== hotel.id);
      return [...prev, hotel];
    });
  };

  let filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm) ||
    hotel.city.toLowerCase().includes(searchTerm)
  );

  filteredHotels = filteredHotels.filter((hotel) => {
    const price = hotel.daily_rate;
    if (priceFilter === '0-100') return price <= 100;
    if (priceFilter === '100-200') return price > 100 && price <= 200;
    if (priceFilter === '200+') return price > 200;
    return true;
  });
if (memberOnly) {
  filteredHotels = filteredHotels.filter(hotel => hotel.has_member_rate);
}

if (selectedCity) {
  filteredHotels = filteredHotels.filter(hotel =>
    hotel.city.toLowerCase() === selectedCity.toLowerCase()
  );
}

if (minRating) {
  filteredHotels = filteredHotels.filter(hotel =>
    hotel.rating >= parseFloat(minRating)
  );
}

  if (sortOption === 'az') {
    filteredHotels.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'za') {
    filteredHotels.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'low-high') {
    filteredHotels.sort((a, b) => a.daily_rate - b.daily_rate);
  } else if (sortOption === 'high-low') {
    filteredHotels.sort((a, b) => b.daily_rate - a.daily_rate);
  }
  const uniqueCities = [...new Set(filteredHotels.map(h => h.city))];

  return (
    <div>
      <div className="headerContent">
        <Header />
        <SearchForm />
      </div>
      <div className="resultsHeader">
        <Filters
          sortOption={sortOption}
          setSortOption={setSortOption}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          memberOnly={memberOnly}
          setMemberOnly={setMemberOnly}
          minRating={minRating}
          setMinRating={setMinRating}
          availableCities={uniqueCities}
        />

        {compareList.length >= 2 && (
          <div className="compareBtnWrapper">
          <button
            className="compareBtn"
            onClick={() => navigate('/compare', { state: { compareList } })}
          >
            Compare {compareList.length} Hotels
          </button>
          </div>
        )}

      </div>
      {filteredHotels.length > 0 ? (
        <div className="resultsContainer">
          <div className="searchResults">

            {filteredHotels.map((hotel) => {
              const originalPrice = hotel.daily_rate;
              const isMember = hotel.has_member_rate;
              const discountedPrice = isMember ? Math.round(originalPrice * 0.9) : originalPrice;

              return (
                <div className="hotelItem" key={hotel.id}>
                  <div className="hotelImageWrapper">
                    <img src={hotel.image} alt={hotel.name} />
                    <div className="arrow left">‹</div>
                    <div className="arrow right">›</div>
                  </div>

                  <div className="hotelDetails" onClick={() => navigate(`/hotelDetails/${hotel.id}`)}>
                    <h3>{hotel.name}</h3>
                    <div className="location">{hotel.city}</div>
                    <div className="rating">
                      <div className="stars">⭐⭐⭐⭐⭐</div>
                      <div>9.0 / 10</div>
                    </div>
                    <div className="partner">⭐ Stash Partner <div className="points">Earn 10x points</div></div>
                  </div>

                  <div className="priceSection">
                    {isMember && <div className="memberRate">🏷 Member Rate</div>}
                    <div className="price">
                      {isMember && <span className="originalPrice">${originalPrice}</span>}
                      <span>${discountedPrice}</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={!!compareList.find((h) => h.id === hotel.id)}
                        onChange={() => toggleCompare(hotel)}
                        aria-label={`Select ${hotel.name} for comparison`}
                        style={{ "zIndex": 1000 }}
                        title="Compare"
                      />
                      <label>Compare</label>
                    </div>
                    <button className="ctaButton">Select your room</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No hotels found for your search.</p>
      )}
    </div>
  );
}
