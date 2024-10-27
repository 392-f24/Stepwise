import { handleSignIn, handleSignOut } from '@utils/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const logIn = async () => {
    const existingUser = await handleSignIn();
    if (existingUser) {
      console.log('Welcome back, existing user!');
    } else {
      console.log('New user profile created.');
    }
  };

  const logOut = async () => {
    await handleSignOut(navigate);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logIn}>Log In</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Home;
