import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`https://hackathon-digitalflake.onrender.com/api/category/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch category");
        const json = await res.json();
        setName(json.name || "");
        setStatus(json.status || "Active");
        setPreview(json.image ? `https://hackathon-digitalflake.onrender.com/${json.image}` : null);
      } catch (err) {
        console.error("Failed to fetch category:", err);
      }
    };
    if (id) fetchCategory();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`https://hackathon-digitalflake.onrender.com/api/category/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Category updated successfully!");
        setTimeout(() => {
          navigate("/category");
        }, 1000);
      } else {
        alert(data.message || "Failed to update category");
      }
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/category" className="text-2xl p-2 rounded hover:bg-gray-100">
          ←
        </Link>
        <h2 className="text-xl font-semibold">Edit Category</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm max-w-5xl">
        <div className="grid grid-cols-4 gap-2 mb-10">
          <div>
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <div className="w-42 h-32 border rounded flex items-center justify-center">
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
          </div>

          <div className="flex items-end">
            <label className="w-42 h-32 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:border-purple-600">
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
        {message && (<p className="text-black-600 text-2xl text-center mb-4">{message}</p>)}
        <div className="flex justify-end gap-4 mt-24">
          <button
            onClick={() => navigate("/category")}
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
