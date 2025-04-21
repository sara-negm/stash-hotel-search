import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import SearchForm from '../../Components/SearchForm/SearchForm';
import hotels from '../../data.json';
import './HotelDetails.scss';

export default function HotelDetails() {
  const { id } = useParams();
  const hotel = hotels.find(h => h.id === parseInt(id));

  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div>
      <Header />
      <SearchForm />

      <div className="hotelDetailsContainer">
        <div className="mainSection">
          <h1 className="hotelTitle">{hotel.name}</h1>
          <div className="subtitle">A Stash Partner Hotel</div>
          <div className="location">{hotel.city}</div>

          <div className="mainImage">
            <img src={hotel.image} alt={hotel.name} />
          </div>

          <p className="description">
            Contemporary boutique with a storied history and intoxicating energy.
            Indulge in a stay like no other at {hotel.name}, perfectly situated in the heart of downtown.
            Step outside your door and find yourself immersed in the energy of local culture.
            Discover hidden gems tailored to your tastes, or simply relax in comfort.
          </p>
        </div>
      </div>
    </div>
  );
}
