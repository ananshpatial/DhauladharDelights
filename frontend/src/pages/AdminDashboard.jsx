import { ClipboardList, Mail, Plus, RefreshCcw, Trash2, Utensils } from "lucide-react";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import api from "../services/api";
import { categories } from "../utils/sampleData";

const blankFood = {
  name: "",
  category: "Pizza",
  price: "",
  image: "",
  description: "",
  rating: 4.5
};

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [foodForm, setFoodForm] = useState(blankFood);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const addLog = (message) => {
    setLogs((current) => [{ message, time: new Date().toLocaleString() }, ...current].slice(0, 12));
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [foodRes, orderRes, messageRes] = await Promise.all([
        api.get("/foods"),
        api.get("/orders"),
        api.get("/contact")
      ]);
      setFoods(foodRes.data);
      setOrders(orderRes.data);
      setMessages(messageRes.data);
      addLog("Dashboard data refreshed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load supervision data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const metrics = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    return [
      { label: "Menu Items", value: foods.length, icon: <Utensils /> },
      { label: "Orders", value: orders.length, icon: <ClipboardList /> },
      { label: "Messages", value: messages.length, icon: <Mail /> },
      { label: "Revenue", value: `Rs. ${revenue}`, icon: <Plus /> }
    ];
  }, [foods, orders, messages]);

  const submitFood = async (event) => {
    event.preventDefault();
    const payload = { ...foodForm, price: Number(foodForm.price), rating: Number(foodForm.rating) };
    try {
      if (editingId) {
        await api.put(`/foods/${editingId}`, payload);
        toast.success("Food updated");
        addLog(`Updated ${payload.name}`);
      } else {
        await api.post("/foods", payload);
        toast.success("Food added");
        addLog(`Added ${payload.name}`);
      }
      setFoodForm(blankFood);
      setEditingId(null);
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Food save failed");
    }
  };

  const editFood = (food) => {
    setEditingId(food._id);
    setFoodForm(food);
  };

  const deleteFood = async (id, name) => {
    try {
      await api.delete(`/foods/${id}`);
      toast.success("Food deleted");
      addLog(`Deleted ${name}`);
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const updateOrder = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      toast.success("Order status updated");
      addLog(`Order ${id.slice(-6)} moved to ${status}`);
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  if (loading) return <Loader label="Loading supervision center" />;

  return (
    <div className="page admin-page">
      <div className="section-title">
        <div>
          <p className="eyebrow">Supervision CRM</p>
          <h1>Operations Dashboard</h1>
        </div>
        <button className="btn ghost" type="button" onClick={fetchAdminData}><RefreshCcw size={17} /> Refresh</button>
      </div>

      <section className="metric-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            {metric.icon}
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="admin-grid">
        <form className="panel form-panel" onSubmit={submitFood}>
          <h2>{editingId ? "Update Food" : "Add Food Item"}</h2>
          <label>Name<input value={foodForm.name} onChange={(event) => setFoodForm({ ...foodForm, name: event.target.value })} required /></label>
          <label>Category
            <select value={foodForm.category} onChange={(event) => setFoodForm({ ...foodForm, category: event.target.value })}>
              {categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>Price<input type="number" value={foodForm.price} onChange={(event) => setFoodForm({ ...foodForm, price: event.target.value })} required /></label>
          <label>Rating<input type="number" step="0.1" max="5" value={foodForm.rating} onChange={(event) => setFoodForm({ ...foodForm, rating: event.target.value })} required /></label>
          <label>Image URL<input value={foodForm.image} onChange={(event) => setFoodForm({ ...foodForm, image: event.target.value })} required /></label>
          <label>Description<textarea rows="4" value={foodForm.description} onChange={(event) => setFoodForm({ ...foodForm, description: event.target.value })} required /></label>
          <button className="btn full" type="submit">{editingId ? "Save Changes" : "Add Food"}</button>
        </form>

        <div className="panel table-panel">
          <h2>Menu CRM</h2>
          <div className="responsive-table">
            <table>
              <thead><tr><th>Food</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food._id}>
                    <td>{food.name}</td>
                    <td>{food.category}</td>
                    <td>Rs. {food.price}</td>
                    <td>
                      <button type="button" onClick={() => editFood(food)}>Edit</button>
                      <button type="button" onClick={() => deleteFood(food._id, food.name)}><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="admin-grid">
        <div className="panel table-panel">
          <h2>Orders</h2>
          <div className="responsive-table">
            <table>
              <thead><tr><th>Customer</th><th>Total</th><th>Status</th><th>Update</th></tr></thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.userId?.name || "Customer"}</td>
                    <td>Rs. {order.totalAmount}</td>
                    <td>{order.status}</td>
                    <td>
                      <select value={order.status} onChange={(event) => updateOrder(order._id, event.target.value)}>
                        {["Placed", "Preparing", "Out for delivery", "Delivered", "Cancelled"].map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h2>Logs and Customer Requests</h2>
          <div className="log-list">
            {logs.map((log) => <p key={`${log.time}-${log.message}`}><strong>{log.time}</strong> {log.message}</p>)}
            {messages.map((message) => (
              <p key={message._id}><strong>{message.name}</strong> {message.message}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
