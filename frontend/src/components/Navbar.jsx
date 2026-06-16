import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Navbar() {
  const { user, setuser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setuser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        Online Judge
      </Link>
      <div className="navbar-menu">
        {/* <Link
          to="/dashboard"
          className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          Dashboard
        </Link> */}
        {/* <Link
          to="/problems"
          className={`nav-link ${location.pathname.startsWith("/problems") ? "active" : ""}`}
        >
          Problems
        </Link> */}
      </div>
      <div className="navbar-actions">
        <span className="user-badge">Hello, {user.name}</span>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}
