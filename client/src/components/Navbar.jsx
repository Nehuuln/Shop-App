import { Link } from 'react-router-dom';
import { useContext } from "react"
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1978 UTC; path=/';

    navigate('/');
    window.location.reload();
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
