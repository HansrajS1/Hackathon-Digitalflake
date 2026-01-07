import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Did you forget password?</h2>
        <input className="w-full border p-2 mb-4" placeholder="Email address" />
        <button className="w-full bg-purple-700 text-white py-2 rounded">Request reset link</button>
        <Link to="/" className="block text-center mt-4 text-sm">Back to login</Link>
      </div>
    </div>
  );
}