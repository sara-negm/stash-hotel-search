import Header from "../../Components/Header/Header";
import SearchForm from "../../Components/SearchForm/SearchForm";
import hotels from '../../data.json';
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import "./SearchResult.scss";

export default function SearchResult(){
    const { location, hotelName } = useSelector((state) => state.search);
    const searchTerm = location.trim() !== "" ? location.toLowerCase() : hotelName.toLowerCase();
    const filteredHotels = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchTerm) ||
      hotel.city.toLowerCase().includes(searchTerm)
    );
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <SearchForm />
   

        {filteredHotels.length > 0 ? (
               <div className="searchResults">
               <h2>Results for "{searchTerm}"</h2>
           
          {filteredHotels.map((hotel) =>{
                  const originalPrice = hotel.daily_rate;
                  const isMember = hotel.has_member_rate;
                  const discountedPrice = isMember ? Math.round(originalPrice * 0.9) : originalPrice;
                
              return (
                <div className="hotelItem" key={hotel.id} onClick={()=> navigate(`/hotelDetails/${hotel.id}`)}>
                <div className="hotelImageWrapper">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="arrow left">‹</div>
                  <div className="arrow right">›</div>
                </div>
          
                <div className="hotelDetails">
                  <h3>{hotel.name}</h3>
                  <div className="location">{hotel.city}</div>
                  <div className="rating">
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <div>9.0 / 10</div>
                  </div>
                  <div className="partner">⭐ Stash Partner <div className="points">Earn 10x points</div></div>
                </div>
          
                <div className="priceSection">
                  {isMember && (
                    <div className="memberRate">🏷 Member Rate</div>
                  )}
                  <div className="price">
                    {isMember && <span className="originalPrice">${originalPrice}</span>}
                    <span>${discountedPrice}</span>
                  </div>
                  <button className="ctaButton">Select your room</button>
                </div>
              </div>
          )}
          )}
          </div>
        ) : (
          <p>No hotels found for your search.</p>
        )}
      </div>
    );
}