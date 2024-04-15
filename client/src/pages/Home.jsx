import { useContext } from "react"
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext'

export default function Home() {
  const {user} = useContext(UserContext);
  
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Wyth & Co. the official shop clothes !</h1>
      <h2 className="home-slogan">Make your shopping great again !</h2>
      {user ? (
        <>
          <h2 className="home-welcome">Welcome {user.name}!</h2>
          <h2 className="home-welcome">Check the <Link to="/product">Products</Link> !</h2>
        </>
      ) : (
        <h2 className="home-message">Please login to your account to access the showcase</h2>
      )}
    </div>
  );
}
