// AdminSignup.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/v1/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
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
      <h1 className="text-xl text-center md:text-3xl font-bold">
        Admin Sign up
      </h1>
      <form onSubmit={handleSubmit} className="mt-5 p-5 text-xl">
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
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
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-black text-white font-bold py-2 px-4 mt-5 rounded">
          Sign up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/admin/login" className='font-medium underline'>Login</Link>
      </p>
    </div>
  );
};

export default AdminSignup;