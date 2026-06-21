import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSidebar = () => {
  const { items, subtotal, total, updateQuantity, removeItem } = useCart();

  return (
    <aside className="cart-sidebar">
      <div className="section-title compact">
        <span className="icon-badge">
          <ShoppingBag size={18} />
        </span>
        <div>
          <p className="eyebrow">Live Cart</p>
          <h2>{items.length} items</h2>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="muted">Add a dish to start your Dhauladhar delivery.</p>
      ) : (
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-row" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>Rs. {item.price}</span>
                <div className="qty-control">
                  <button type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)} aria-label="Decrease">
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)} aria-label="Increase">
                    <Plus size={14} />
                  </button>
                  <button type="button" onClick={() => removeItem(item._id)} aria-label="Remove">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <span>Subtotal</span>
        <strong>Rs. {subtotal}</strong>
        <span>Total estimate</span>
        <strong>Rs. {total}</strong>
      </div>
      <Link className="btn full" to="/order">
        Checkout
      </Link>
    </aside>
  );
};

export default CartSidebar;
