import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/contact", form);
      toast.success("Message sent");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send message");
    }
  };

  return (
    <div className="page contact-grid">
      <section className="panel">
        <p className="eyebrow">Talk to us</p>
        <h1>Contact Dhauladhar Delights</h1>
        <p className="muted">Questions about catering, delivery, food safety or an order? Send a note and our team will respond soon.</p>
        <div className="contact-info">
          <p><MapPin /> Temple Road, Dharamshala, Himachal Pradesh</p>
          <p><Phone /> +91 98765 43210</p>
          <p><Mail /> hello@dhauladhardelights.com</p>
        </div>
        <div className="map-box">
          <iframe
            title="Dharamshala map"
            src="https://www.google.com/maps?q=Dharamshala%20Himachal%20Pradesh&output=embed"
            loading="lazy"
          />
        </div>
      </section>
      <form className="panel form-panel" onSubmit={submit}>
        <h2>Send Message</h2>
        <label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
        <label>Message<textarea rows="7" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required /></label>
        <button className="btn full" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
