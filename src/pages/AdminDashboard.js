import React, { useEffect, useState } from "react";
import { Delete, Get, Post, Put } from "../utilities/HttpService (3)";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [category, setCategory] = useState("lipstick");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    image: "",
    description: "",
    price: "",
    originalPrice: "",
    discount: ""
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await Get(`http://localhost:8888/products?category=${category.toLowerCase()}`);
      setProducts(res);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    const { image, description, price } = form;
    if (!image || !description || !price) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (isNaN(price)) {
      setError("Price must be a number.");
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    try {
      const newProduct = {
        ...form,
        id: Date.now().toString(),
        category: category.toLowerCase()
      };
      await Post("http://localhost:8888/products", newProduct);
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Delete(`http://localhost:8888/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsUpdate(true);
    setError("");
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      await Put(`http://localhost:8888/products/${form.id}`, form);
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const resetForm = () => {
    setForm({
      image: "",
      description: "",
      price: "",
      originalPrice: "",
      discount: ""
    });
    setIsUpdate(false);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    alert("Logged out successfully");
    navigate("/adminlogin");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger">Admin Product Dashboard</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={goHome}>
            Go to Home
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="mb-4">
        <select
          className="form-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            resetForm();
          }}
        >
          <option value="lipstick">Lipstick</option>
          <option value="blush">Blush</option>
          <option value="foundation">Foundation</option>
          <option value="eyeshadow">Eyeshadow</option>
        </select>
      </div>

      <div className="card p-4 mb-5 shadow-sm">
        <h5>{isUpdate ? "Update Product" : "Add New Product"}</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-3">
          {["image", "description", "price", "originalPrice", "discount"].map((field) => (
            <div className="col-md-6" key={field}>
              <input
                type="text"
                name={field}
                value={form[field]}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="col-12">
            {isUpdate ? (
              <button className="btn btn-warning w-100" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="btn btn-success w-100" onClick={handleAdd}>
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>

      <h4 className="text-center">All {category} Products</h4>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Original</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>
                  <img
                    src={prod.image}
                    alt={prod.description}
                    width="60"
                  />
                </td>
                <td>{prod.description}</td>
                <td>{prod.price}</td>
                <td>{prod.originalPrice || "—"}</td>
                <td>{prod.discount || "—"}%</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(prod)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(prod.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-muted">
                  No products found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
