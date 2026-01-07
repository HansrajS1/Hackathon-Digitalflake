import { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import DataTable from "../components/DataTable";
import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import categoryIcon from "../assets/images/category.svg";
import edit from "../assets/images/edit.svg";
import deleteicon from "../assets/images/delete.svg";

const columnHelper = createColumnHelper();

export default function Category() {
  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/category/");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const columns = [
    columnHelper.accessor("_id", { header: "Id" }),
    columnHelper.accessor("name", { header: "Category name" }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ getValue }) =>
        getValue ? (
          <img
            src={getValue()}
            alt="category"
            className="h-10 w-10 object-cover rounded"
          />
        ) : (
          "📷"
        ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => (
        <span
          className={
            getValue() === "Active"
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Link to={`/category/edit/${row.original._id}`}>
            <img src={edit} alt="edit" className="h-[24px] w-[24px]" />
          </Link>

          <button
            onClick={() => {
              setSelectedId(row.original._id);
              setDeleteOpen(true);
            }}
          >
            <img src={deleteicon} alt="delete" className="h-[24px] w-[24px]" />
          </button>
        </div>
      ),
    }),
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <img src={categoryIcon} alt="Category" className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Category</h2>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded w-[534px]"
          />
        </div>

        <Link
          to="/category/add"
          className="bg-[#662671] text-white px-4 py-2 rounded"
        >
          Add New
        </Link>
      </div>

      <DataTable columns={columns} data={filteredData} />

      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/30">
          <div className="bg-white rounded-lg border-2 border-blue-500 w-[380px] p-6 text-center">
            <div className="flex justify-center mb-3">
              <span className="text-red-600 text-3xl">⚠️</span>
            </div>

            <h3 className="text-lg font-semibold mb-2">Delete Category</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this category?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteOpen(false)}
                className="px-6 py-2 border rounded text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await fetch(
                      `http://localhost:5000/api/category/${selectedId}`,
                      { method: "DELETE" }
                    );
                    setData((prev) =>
                      prev.filter((item) => item._id !== selectedId)
                    );
                  } catch (err) {
                    console.error("Delete failed:", err);
                  }
                  setDeleteOpen(false);
                }}
                className="px-6 py-2 bg-[#662671] text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
