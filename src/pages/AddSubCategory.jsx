import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import list1 from "../assets/images/list1.svg";

export default function AddSubCategory() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", categoryId);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("https://hackathon-digitalflake.onrender.com/api/subcategory", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Subcategory added successfully!");
        setTimeout(() => {
          navigate("/subcategory");
        }, 1500);
      } else {
        setMessage(data.message || "Failed to add subcategory");
      }
    } catch (err) {
      console.error("Error adding subcategory:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/subcategory"
          className="p-2 text-2xl text-gray-500 rounded hover:bg-gray-100"
        >
          ←
        </Link>
        <img src={list1} alt="Category" className="h-8 w-8" />
        <h2 className="text-xl font-semibold">Add Sub Category</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Sub Category
            </label>
            <input
              type="text"
              placeholder="Enter sub category"
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
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
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

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/subcategory")}
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
