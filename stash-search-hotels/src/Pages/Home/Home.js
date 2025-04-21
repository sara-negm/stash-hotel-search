import React from "react";
import Header from "../../Components/Header/Header";
import HotelList from "../../Components/HotelsList/HotelsList";
import SearchForm from "../../Components/SearchForm/SearchForm";
import "./Home.scss";

export default function Home() {
    return <>
        <Header />
        <SearchForm />
        <div className="mainBody">
            <h1>The best hotels are independent hotels.</h1>
            <h2>That's not hyperbole. It's a fact.</h2>
            <p>It’s why you love them. It’s why we stand up for them. It's why travel magazines rave about them.
                And it’s why the big chains are going to great lengths to mimic them.
                At Stash, we’re obsessed with the real-deal: Grade-A, free-range, certified-independent hotels.
                So that’s what our loyalty program delivers.  (You really can taste the difference.)</p>
            <h1>Stash Partner Hotels</h1>
            <HotelList />
        </div>
    </>
}