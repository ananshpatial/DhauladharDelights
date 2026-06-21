import { CreditCard, MapPin, Minus, PackageCheck, Plus, Trash2, Truck } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

const initialAddress = {
  fullName: "",
  phone: "",
  line1: "",
  city: "",
  state: "Himachal Pradesh",
  pincode: ""
};

const Order = () => {
  const { items, subtotal, deliveryFee, taxes, total, updateQuantity, removeItem, clearCart } = useCart();
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [placing, setPlacing] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);

  const handleChange = (event) => {
    setAddress({ ...address, [event.target.name]: event.target.value });
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    setPlacing(true);
    try {
      const payload = {
        items: items.map((item) => ({
          foodId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: total,
        address,
        paymentMethod
      };
      const { data } = await api.post("/orders", payload);
      setLatestOrder(data);
      clearCart();
      toast.success("Order placed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="page order-grid">
      <section className="panel">
        <div className="section-title compact">
          <PackageCheck />
          <div>
            <p className="eyebrow">Checkout</p>
            <h1>Your Cart</h1>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is clear.</p>
            <Link className="btn" to="/menu">Browse Menu</Link>
          </div>
        ) : (
          items.map((item) => (
            <div className="checkout-row" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>Rs. {item.price}</span>
              </div>
              <div className="qty-control">
                <button type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)}><Minus size={14} /></button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)}><Plus size={14} /></button>
                <button type="button" onClick={() => removeItem(item._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))
        )}

        <div className="bill-box">
          <span>Subtotal</span><strong>Rs. {subtotal}</strong>
          <span>Delivery</span><strong>Rs. {deliveryFee}</strong>
          <span>Taxes</span><strong>Rs. {taxes}</strong>
          <span>Total</span><strong>Rs. {total}</strong>
        </div>
      </section>

      <form className="panel form-panel" onSubmit={placeOrder}>
        <div className="section-title compact">
          <MapPin />
          <div>
            <p className="eyebrow">Delivery</p>
            <h2>Address Details</h2>
          </div>
        </div>
        <div className="form-grid">
          {Object.entries(address).map(([key, value]) => (
            <label key={key}>
              {key.replace(/([A-Z])/g, " $1")}
              <input name={key} value={value} onChange={handleChange} required />
            </label>
          ))}
        </div>
        <div className="payment-box">
          <h3><CreditCard size={18} /> Payment Demo</h3>
          {["Cash on Delivery", "UPI", "Card"].map((method) => (
            <label className="radio-row" key={method}>
              <input type="radio" name="payment" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
              <span>{method}</span>
            </label>
          ))}
        </div>
        <button className="btn full" disabled={placing} type="submit">
          {placing ? "Placing..." : "Place Order"}
        </button>
        {latestOrder && (
          <div className="tracking-card">
            <Truck />
            <div>
              <strong>Order tracking</strong>
              <p>#{latestOrder._id} is {latestOrder.status}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Order;
