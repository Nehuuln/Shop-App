import { Link } from 'react-router-dom';
import { useContext, useState } from "react"
import { UserContext } from '../../context/userContext'
import UserInfoTooltip from './UserInfoTooltip';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import logo from "../assets/Wyth&co-LOGO.png"

export default function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleLogout = () => {
    try {
      document.cookie = 'token=; expires=Thu, 01 Jan 1978 UTC; path=/';
      navigate('/');
      window.location.reload();
      toast.success('Logged out!')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      
      {user ? (
        <>
          <Link to="/product" className="nav-item">Products</Link>
          <Link to="/cart" className="nav-item">Cart</Link>
          <div
            className="user-info-container"
            onMouseEnter={() => setShowUserInfo(true)}
            onMouseLeave={() => setShowUserInfo(false)}
          >
            <div className="user-info-trigger">Welcome, {user.name}</div>
            {showUserInfo && <UserInfoTooltip user={user} />}
          </div>
          <button onClick={handleLogout} className="nav-item logout-btn">Logout</button>
        </>
      ) : (
        <div className="auth-links">
          <div className='auth-links-box'>
            <Link to="/register">Register</Link>
          </div>
          <div className='auth-links-box'>
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
