// src/components/layout/Navbar.jsx
import { useAuth } from '../../hooks/useAuth';
import '../../index.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Social Feed</h2>
        </div>

        <div className="navbar-menu">
          <div className="navbar-user">
            <span className="user-name">
              {user?.firstName} {user?.lastName}
            </span>
            <div className="user-avatar">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;