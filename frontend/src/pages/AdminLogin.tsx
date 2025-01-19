// AdminLogin.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/admin/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className='border p-16 rounded'>
      <h1 className="text-xl text-center md:text-3xl font-bold">
        Admin Login
      </h1>
      <form onSubmit={handleSubmit} className="mt-5 p-5 text-xl">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-black text-white font-bold py-2 px-4 mt-5 rounded">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/admin/signup" className='font-medium underline'>Sign up</Link>
      </p>
      </div>
    </div>
  );
};

export default AdminLogin;