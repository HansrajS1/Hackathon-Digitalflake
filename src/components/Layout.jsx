import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
        <Header />
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
    </>
  );
}