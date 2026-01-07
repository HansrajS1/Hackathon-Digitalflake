import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://hackathon-digitalflake.onrender.com/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const json = await res.json();
        setName(json.name || "");
        setCategoryId(json.category?._id || "");
        setSubcategoryName(json.subcategory?.name || "");
        setStatus(json.status || "Active");
        // ✅ prepend server URL if needed
        setPreview(json.image ? `https://hackathon-digitalflake.onrender.com/${json.image}` : null);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    if (id) fetchProduct();
  }, [id]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://hackathon-digitalflake.onrender.com/api/category/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json = await res.json();
        setCategories(json);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", categoryId);
      formData.append("status", status);
      if (image) formData.append("image", image);

      const res = await fetch(`https://hackathon-digitalflake.onrender.com/api/product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Product updated successfully!");
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/products" className="border p-2 rounded hover:bg-gray-100">
          ←
        </Link>
        <h2 className="text-xl font-semibold">Edit Product</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm max-w-5xl">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subcategory</label>
            <input
              type="text"
              value={subcategoryName}
              className="w-full border rounded px-3 py-2 bg-gray-50"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <div className="flex gap-4">
              <div className="w-32 h-32 border rounded flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
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
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
                <span className="text-2xl">📷</span>
                <p className="text-xs text-gray-500 text-center mt-1">
                  Upload Image <br /> Max 10MB
                </p>
              </label>
            </div>
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
