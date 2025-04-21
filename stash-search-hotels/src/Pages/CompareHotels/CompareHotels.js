import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import SearchForm from '../../Components/SearchForm/SearchForm';
import './CompareHotels.scss';

export default function CompareHotels() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const hotelsToCompare = state?.compareList || [];

    const attributeRows = [
        { label: "Name", accessor: "name" },
        { label: "City", accessor: "city" },
        { label: "Price", accessor: "daily_rate", isCurrency: true },
        { label: "Member Rate", accessor: "has_member_rate", format: val => val ? "Yes" : "No" },
    ];

    return (
        <div className="compareTableContainer">
            <div className="headerContent">
                <Header />
                <SearchForm />
            </div>
            <h2>Compare Hotels</h2>
            <div className="compareGrid">
  {hotelsToCompare.map(hotel => (
    <div key={hotel.id} className="hotelCard" onClick={() => navigate(`/hotelDetails/${hotel.id}`)}>
      <img src={hotel.image} alt={hotel.name} className="hotelImage" />

      <div className="cardBody">
        <div className="priceRating">
          <span className="price">${hotel.daily_rate}<span className="perNight">/night</span></span>
          <span className="rating">⭐ 5.0</span>
        </div>

        <div className="locationRow">
          <span className="icon">📍</span>
          <span>{hotel.city}</span>
        </div>

        <h3 className="hotelName">{hotel.name}</h3>

        <p className="description">
          Enjoy a stylish stay at our {hotel.name} with prime access to {hotel.city}'s attractions.
        </p>

        <button className="chooseRoomBtn">Choose Room</button>
      </div>
    </div>
  ))}
</div>

        </div>
    );
}
