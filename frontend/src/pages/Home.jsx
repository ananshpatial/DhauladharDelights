import { ArrowRight, Clock, MapPin, Search, ShieldCheck, Sparkles, Star } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { fallbackFoods, reviews } from "../utils/sampleData";

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("search");
    navigate(`/menu?search=${encodeURIComponent(value || "")}`);
  };

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Dharamshala's premium delivery kitchen</p>
          <h1>Dhauladhar Delights</h1>
          <p>Order mountain-inspired comfort food, sizzling fast bites and chilled drinks delivered fresh to your door.</p>
          <form className="search-bar" onSubmit={handleSearch}>
            <Search size={20} />
            <input name="search" placeholder="Search pizza, siddu, burger, dessert..." />
            <button type="submit">Find Food</button>
          </form>
          <div className="hero-stats">
            <span><Clock size={18} /> 30 min delivery</span>
            <span><Star size={18} fill="currentColor" /> 4.8 kitchen rating</span>
            <span><ShieldCheck size={18} /> Hygienic packing</span>
          </div>
        </div>
      </section>

      <section className="content-section category-band">
        {["Pizza", "Burger", "Drinks", "Dessert"].map((category) => (
          <Link className="category-card" to={`/menu?category=${category}`} key={category}>
            <span>{category}</span>
            <ArrowRight size={18} />
          </Link>
        ))}
      </section>

      <section className="content-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">Chef picks</p>
            <h2>Featured Food</h2>
          </div>
          <Link className="text-link" to="/menu">View menu</Link>
        </div>
        <div className="food-grid">
          {fallbackFoods.slice(0, 3).map((food) => <FoodCard food={food} key={food._id} />)}
        </div>
      </section>

      <section className="offer-banner">
        <div>
          <p className="eyebrow">Special Offer</p>
          <h2>Flat 20% off on family combos tonight</h2>
          <p>Use demo code HILLS20 at checkout and preview the payment UI before placing your order.</p>
        </div>
        <Sparkles size={46} />
      </section>

      <section className="content-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">Trusted locally</p>
            <h2>Customer Reviews</h2>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="stars">★★★★★</div>
              <p>{review.text}</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="location-strip">
        <MapPin size={22} />
        <span>Delivering across Dharamshala, McLeod Ganj, Kangra and nearby neighborhoods.</span>
      </section>
    </div>
  );
};

export default Home;
