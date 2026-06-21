import { Plus, Star } from "lucide-react";
import React from "react";
import { useCart } from "../context/CartContext";

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <img src={food.image} alt={food.name} />
        <span className="rating-pill">
          <Star size={15} fill="currentColor" /> {food.rating}
        </span>
      </div>
      <div className="food-card-body">
        <div>
          <p className="eyebrow">{food.category}</p>
          <h3>{food.name}</h3>
          <p>{food.description}</p>
        </div>
        <div className="food-card-bottom">
          <strong>Rs. {food.price}</strong>
          <button className="icon-btn primary" type="button" onClick={() => addToCart(food)} aria-label={`Add ${food.name}`}>
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
