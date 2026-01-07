import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogoutOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="bg-[#662671] text-white flex justify-between items-center p-4 relative z-10">
        <img src={logo} alt="logo" className="w-[296px] h-[46px]" />

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full px-3"
          >
            {/* avatar icon */}
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 3.75C12.1444 3.75 3.75 12.1444 3.75 22.5C3.75 32.8556 12.1444 41.25 22.5 41.25C32.8556 41.25 41.25 32.8556 41.25 22.5C41.25 12.1444 32.8556 3.75 22.5 3.75Z"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M8.00818 34.3988C8.00818 34.3988 12.1876 29.0625 22.5001 29.0625C32.8126 29.0625 36.9938 34.3988 36.9938 34.3988"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M22.5 22.5C25.6076 22.5 28.125 19.9826 28.125 16.875C28.125 13.7674 25.6076 11.25 22.5 11.25C19.3924 11.25 16.875 13.7674 16.875 16.875C16.875 19.9826 19.3924 22.5 22.5 22.5Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow rounded w-40">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setLogoutOpen(true);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      {logoutOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/30">
          <div className="bg-white rounded-lg border-2 border-blue-500 w-[380px] p-6 text-center">
            <div className="flex justify-center mb-3">
              <span className="text-red-600 text-3xl">⚠️</span>
            </div>

            <h3 className="text-lg font-semibold mb-2">Log Out</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLogoutOpen(false)}
                className="px-6 py-2 border rounded text-gray-500"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-[#662671] text-white rounded"
                onClick={handleLogout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
