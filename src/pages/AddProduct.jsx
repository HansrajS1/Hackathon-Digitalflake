import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import productIcon from "../assets/images/product.svg";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://hackathon-digitalflake.onrender.com/api/category/");
        const json = await res.json();
        setCategories(json);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch("https://hackathon-digitalflake.onrender.com/api/subcategory/");
        const json = await res.json();
        setSubcategories(json);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      }
    };
    fetchSubcategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", categoryId);
      formData.append("subcategory", subcategoryId);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("https://hackathon-digitalflake.onrender.com/api/product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Product added successfully!");
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        setMessage(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/products" className="text-3xl p-2 rounded hover:bg-gray-100">
          ←
        </Link>
        <img src={productIcon} alt="Product" className="h-8 w-8" />
        <h2 className="text-xl font-semibold">Add Product</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm max-w-5xl">
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subcategory</label>
            <select
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none"
            >
              <option value="">Select subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-10">
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <div className="flex gap-4">
            <div className="w-32 h-32 border rounded flex items-center justify-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="h-full w-full object-cover rounded"
                />
              ) : (
                <span className="text-gray-400">Preview</span>
              )}
            </div>
            <label className="w-32 h-32 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:border-purple-600">
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <span className="text-2xl">📷</span>
              <p className="text-xs text-gray-500 text-center mt-1">
                Upload Image <br /> Max 10MB
              </p>
            </label>
          </div>
        </div>

        {message && (<p className="text-black-600 text-2xl text-center mb-4">{message}</p>)}

        <div className="flex justify-end gap-4 mt-24">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 border rounded-full text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#662671] text-white rounded-full hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
}
