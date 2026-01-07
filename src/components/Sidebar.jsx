import { useState } from "react";
import { NavLink } from "react-router-dom";
import home from "../assets/images/home.svg";
import list1 from "../assets/images/list1.svg";
import product from "../assets/images/product.svg";
import arrow from "../assets/images/arrow.svg";
import category from "../assets/images/category.svg";

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`flex justify-between items-center p-2 rounded cursor-pointer
            ${isActive ? "bg-[#FFF8B7]" : "bg-white hover:bg-purple-100"}`}
        >
          <div className="flex items-center gap-3">
            <img src={icon} alt={label} className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-sm sm:text-base">{label}</span>
          </div>
          <img
            src={arrow}
            alt="Arrow"
            className={`h-5 w-5 sm:h-6 sm:w-6 ${
              isActive ? "opacity-100" : "opacity-40"
            }`}
          />
        </div>
      )}
    </NavLink>
  );
};

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        ☰
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full bg-white shadow-md
        w-64 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <nav className="p-4 space-y-2">
          <NavItem to="/dashboard" icon={home} label="Home" />
          <NavItem to="/category" icon={category} label="Category" />
          <NavItem to="/subcategory" icon={list1} label="Subcategory" />
          <NavItem to="/products" icon={product} label="Products" />
        </nav>
      </aside>
    </>
  );
}
