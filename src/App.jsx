import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import SubCategory from "./pages/SubCategory";
import AddSubCategory from "./pages/AddSubCategory";
import EditSubCategory from "./pages/EditSubCategory";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/category/add" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path="/category/edit/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />

        <Route path="/subcategory" element={<ProtectedRoute><SubCategory /></ProtectedRoute>} />
        <Route path="/subcategory/add" element={<ProtectedRoute><AddSubCategory /></ProtectedRoute>} />
        <Route path="/subcategory/edit/:id" element={<ProtectedRoute><EditSubCategory /></ProtectedRoute>} />

        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
