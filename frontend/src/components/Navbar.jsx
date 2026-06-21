import { Menu, Moon, ShoppingCart, Sun, UserRound, X } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("dd_theme") === "dark");
  const { items } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("dd_theme", dark ? "dark" : "light");
  }, [dark]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span>DD</span>
        <div>
          <strong>Dhauladhar Delights</strong>
          <small>Fresh from the hills</small>
        </div>
      </Link>

      <nav className={open ? "nav-links open" : "nav-links"}>
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/menu" onClick={() => setOpen(false)}>Menu</NavLink>
        <NavLink to="/order" onClick={() => setOpen(false)}>Order</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
        {user?.role === "admin" && <NavLink to="/admin" onClick={() => setOpen(false)}>Supervision</NavLink>}
      </nav>

      <div className="nav-actions">
        <button className="icon-btn" type="button" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link className="cart-link" to="/order" aria-label="Cart">
          <ShoppingCart size={18} />
          {itemCount > 0 && <span>{itemCount}</span>}
        </Link>
        {user ? (
          <button className="user-pill" type="button" onClick={logout}>
            <UserRound size={16} /> Logout
          </button>
        ) : (
          <Link className="user-pill" to="/login">
            <UserRound size={16} /> Login
          </Link>
        )}
        <button className="icon-btn mobile-only" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
