import { useContext } from "react"
import { UserContext } from '../../context/userContext'

export default function Home() {
  const {user} = useContext(UserContext);
  
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Shopping Application!</h1>
      {user ? (
        <>
          <h2 className="home-welcome">Welcome {user.name}!</h2>
        </>
      ) : (
        <h2 className="home-message">Please login to your account to access the showcase</h2>
      )}
    </div>
  );
}
