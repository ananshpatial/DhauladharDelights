import { Search } from "lucide-react";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import CartSidebar from "../components/CartSidebar";
import CategoryFilter from "../components/CategoryFilter";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import api from "../services/api";
import { fallbackFoods } from "../utils/sampleData";

const Menu = () => {
  const [searchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/foods", { params: { search: query, category } });
        setFoods(data.length ? data : fallbackFoods);
      } catch (error) {
        setFoods(fallbackFoods);
        toast.error("Using demo menu until the API is connected");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [query, category]);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const categoryMatch = category === "All" || food.category === category;
      const queryMatch = food.name.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [foods, category, query]);

  return (
    <div className="page menu-layout">
      <section className="menu-main">
        <div className="section-title">
          <div>
            <p className="eyebrow">Fresh menu</p>
            <h1>Order what feels right</h1>
          </div>
        </div>
        <label className="inline-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search food items" />
        </label>
        <CategoryFilter activeCategory={category} onChange={setCategory} />
        {loading ? (
          <Loader />
        ) : (
          <div className="food-grid">
            {filteredFoods.map((food) => <FoodCard food={food} key={food._id} />)}
          </div>
        )}
      </section>
      <CartSidebar />
    </div>
  );
};

export default Menu;
