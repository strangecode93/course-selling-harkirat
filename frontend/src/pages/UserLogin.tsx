import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        navigate('/courses'); // Navigate to courses page after login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err: any) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className='border p-16 rounded'>
      <h1 className="text-xl text-center md:text-3xl font-bold">User Login</h1>
      <form onSubmit={handleSubmit} className="mt-5 p-5 text-xl">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
          className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
          className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-black text-white font-bold py-2 px-4 mt-5 rounded"
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/user/signup" className="underline font-medium">
          Sign up
        </Link>
      </p>
      </div>
    </div>
  );
};

export default UserLogin;
