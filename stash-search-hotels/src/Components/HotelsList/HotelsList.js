import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hotels from '../../data.json';
import './HotelsList.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HotelList() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % hotels.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + hotels.length) % hotels.length);
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, []);

    const hotel = hotels[currentIndex];

    return (
        <div className="slideshowWrapper">
            <div className="arrow left" onClick={goToPrev}><ChevronLeft /></div>

            <div className="slide" onClick={() => navigate(`/hotelDetails/${hotel.id}`)}>
                <img src={hotel.image} alt={hotel.name} />
                <div className="info">
                    <h2>{hotel.name}</h2>
                    <p>{hotel.city}</p>
                    <p>${hotel.daily_rate}</p>
                </div>
            </div>
            <div className="arrow right" onClick={goToNext}><ChevronRight /></div>
        </div>
    );
}
