import { useContext } from "react"
import { UserContext } from '../../context/userContext'

export default function Home() {
  const {user} = useContext(UserContext);
  
  return (
    <div>
      <h1>Welcome to the Shopping Application!</h1>
      {user ? (
        <>
          <h2>Welcome {user.name}!</h2>
        </>
      ) : (
        <h2>Please login to your account to access the showcase</h2>
      )}
    </div>
  );
}
