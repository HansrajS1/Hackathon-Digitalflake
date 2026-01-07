import { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import categoryIcon from "../assets/images/category.svg";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("https://hackathon-digitalflake.onrender.com/api/category", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Category added successfully!");
        setTimeout(() => {
          navigate("/category");
        }, 1000);
      } else {
        setMessage(data.message || "Failed to add category");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/category" className="p-2 text-2xl rounded hover:bg-gray-100">
          ←
        </Link>
        <img src={categoryIcon} alt="Category" className="h-8 w-8" />
        <h2 className="text-xl font-semibold">Add Category</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl">
        <div className="mb-6 w-[360px]">
          <label className="block text-sm font-medium mb-1">Category Name</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>

        <div className="mb-12">
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


        <div className="flex justify-end gap-4">
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
