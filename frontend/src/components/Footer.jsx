import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Footer = () => (
  <footer className="footer">
    <div>
      <h2>Dhauladhar Delights</h2>
      <p>Premium food delivery inspired by Kangra valley flavors, built for quick city cravings.</p>
    </div>
    <div>
      <h3>Contact</h3>
      <p><MapPin size={16} /> Dharamshala, Himachal Pradesh</p>
      <p><Phone size={16} /> +91 98765 43210</p>
      <p><Mail size={16} /> hello@dhauladhardelights.com</p>
    </div>
    <div>
      <h3>Follow</h3>
      <p><Instagram size={16} /> Instagram</p>
      <p><Facebook size={16} /> Facebook</p>
    </div>
  </footer>
);

export default Footer;
