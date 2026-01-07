import { NavLink } from "react-router-dom";
import home from "../assets/images/home.svg";
import list1 from "../assets/images/list1.svg";
import product from "../assets/images/product.svg";
import arrow from "../assets/images/arrow.svg";
import category from "../assets/images/category.svg";

export default function Sidebar() {
  const linkBase =
    "block p-2 rounded hover:bg-purple-100";

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="p-4 space-y-2">

        <NavLink to="/dashboard" className={linkBase}>
          {({ isActive }) => (
            <div className={`flex justify-between p-2 items-center ${
                  isActive ? "bg-[#FFF8B7]" : "bg-white"
                }`}>
              <img src={home} alt="Home" className="h-[32px] w-[32px]" />
              <span>Home</span>
              <img
                src={arrow}
                alt="Arrow"
                className={`h-[24px] w-[24px] ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/category" className={linkBase}>
          {({ isActive }) => (
            <div className={`flex justify-between p-2 items-center ${
                  isActive ? "bg-[#FFF8B7]" : "bg-white"
                }`}>
              <img src={category} alt="Category" className="h-[32px] w-[32px]" />


              <span>Category</span>

              <img
                src={arrow}
                alt="Arrow"
                className={`h-[24px] w-[24px] ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/subcategory" className={linkBase}>
          {({ isActive }) => (
            <div className={`flex justify-between p-2 items-center ${
                  isActive ? "bg-[#FFF8B7]" : "bg-white"
                }`}>
              <img src={list1} alt="Subcategory" className="h-[32px] w-[32px]" />
              <span>Subcategory</span>
              <img
                src={arrow}
                alt="Arrow"
                className={`h-[24px] w-[24px] ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/products" className={linkBase}>
          {({ isActive }) => (
            <div className={`flex justify-between p-2 items-center ${
                  isActive ? "bg-[#FFF8B7]" : "bg-white"
                }`}>
              <img src={product} alt="Products" className="h-[32px] w-[32px]" />
              <span>Products</span>
              <img
                src={arrow}
                alt="Arrow"
                className={`h-[24px] w-[24px] ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              />
            </div>
          )}
        </NavLink>

      </nav>
    </aside>
  );
}
