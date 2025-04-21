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
            <Header />
            <SearchForm />
            <h2>Compare Hotels</h2>
            <div className="compareTable">
                <div className="compareRow">
                    <div className="compareCell labelCell"></div>
                    {hotelsToCompare.map(hotel => (
                        <div
                            key={hotel.id}
                            className="compareColumn"
                            onClick={() => navigate(`/hotelDetails/${hotel.id}`)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && navigate(`/hotelDetails/${hotel.id}`)}
                            aria-label={`View details for ${hotel.name}`}
                        >
                            <div className="compareCell imageCell">
                                <img src={hotel.image} alt={hotel.name} />
                            </div>
                        </div>
                    ))}
                </div>

                {attributeRows.map(row => (
                    <div className="compareRow" key={row.accessor}>
                        <div className="compareCell labelCell">{row.label}</div>
                        {hotelsToCompare.map(hotel => {
                            const value = hotel[row.accessor];
                            return (
                                <div
                                    key={hotel.id}
                                    className="compareColumn"
                                    onClick={() => navigate(`/hotelDetails/${hotel.id}`)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => e.key === 'Enter' && navigate(`/hotelDetails/${hotel.id}`)}
                                    aria-label={`View details for ${hotel.name}`}
                                >
                                    <div className="compareCell">
                                        {row.isCurrency
                                            ? `$${value}`
                                            : row.format
                                                ? row.format(value)
                                                : value}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
