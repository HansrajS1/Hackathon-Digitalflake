import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditSubCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/subcategory/${id}`);
        const json = await res.json();
        setName(json.name);
        setCategoryId(json.category?._id || "");
        setStatus(json.status);
        setPreview(json.image);
      } catch (err) {
        console.error("Failed to fetch subcategory:", err);
      }
    };
    fetchSubCategory();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/category/");
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
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`http://localhost:5000/api/subcategory/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Subcategory updated successfully!");
        setTimeout(() => {
          navigate("/subcategory");
        }, 1000);
      } else {
        alert(data.message || "Failed to update subcategory");
      }
    } catch (err) {
      console.error("Error updating subcategory:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/subcategory" className="text-2xl p-2 rounded hover:bg-gray-100">
          ←
        </Link>
        <h2 className="text-xl font-semibold">Edit Subcategory</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm max-w-5xl">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Subcategory</label>
            <input
              type="text"
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
        </div>

        <div className="mb-10">
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
                  setImage(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
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
