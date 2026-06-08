import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [product, setProduct] = useState({
    title: "",
    description: ""
  });

  const [image, setImage] = useState(null);

  const submitProduct = () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("userId", userId);
    formData.append("image", image);

    api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      alert("Product added successfully");
      navigate("/");
    })
    .catch(() => alert("Failed to add product"));
  };

  return (
    <div style={container}>
      <h2>Add New Product</h2>

      <input
        placeholder="Product title (e.g. Phone, Chair, Laptop)"
        value={product.title}
        onChange={e => setProduct({ ...product, title: e.target.value })}
        style={input}
      />

      <textarea
        placeholder="Describe your product"
        value={product.description}
        onChange={e =>
          setProduct({ ...product, description: e.target.value })
        }
        style={textarea}
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
        style={{ marginBottom: "15px" }}
      />

      <button onClick={submitProduct} style={button}>
        Add Product
      </button>
    </div>
  );
}

/* STYLES (same as AddSkill) */
const container = {
  maxWidth: "400px",
  margin: "60px auto",
  padding: "30px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.15)"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#28a745", // product ko thoda green feel 😄
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AddProduct;
