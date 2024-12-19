import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)

    setUserData({email: email, password: password})
    console.log(userData)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
      <img src="/uberlogo.png" className="w-16 mb-10" alt="Uber Logo" />
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-lg font-medium mb-2">What&apos;s your email?</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="bg-gray-200 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base transition-shadow duration-200 focus:outline-1 focus:outline-amber-500 focus:shadow-lg"
            required
            placeholder="email@example.com"
            type="email"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <div className="relative mb-7">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base transition-shadow duration-200 focus:outline-1 focus:outline-amber-500 focus:shadow-lg"
              required
              placeholder="password"
              type={visible ? "text" : "password"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {visible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                >
                  <path d="M 23.990234 6 C 16.689139 6 9.961899 9.2791318 5.3867188 14.34375 A 1.5003827 1.5003827 0 1 0 7.6132812 16.355469 C 11.638101 11.900087 17.591329 9 23.990234 9 C 30.389139 9 36.353901 11.901387 40.388672 16.357422 A 1.50015 1.50015 0 1 0 42.611328 14.34375 C 38.026099 9.2797852 31.291329 6 23.990234 6 z M 40.378906 23.976562 A 1.50015 1.50015 0 0 0 39 25.113281 C 37.394678 31.134353 31.078681 36 23.990234 36 C 16.901788 36 10.605963 31.136757 9 25.113281 A 1.50015 1.50015 0 0 0 7.5820312 23.980469 A 1.50015 1.50015 0 0 0 6.1015625 25.886719 C 6.5812081 27.685723 7.3895193 29.36841 8.4375 30.900391 L 5.5898438 33.273438 A 1.50015 1.50015 0 1 0 7.5117188 35.576172 L 10.501953 33.082031 C 11.588158 34.203769 12.753529 35.191289 14.109375 36.021484 L 12.275391 39.199219 A 1.5006638 1.5006638 0 1 0 14.875 40.699219 L 16.773438 37.408203 C 18.586612 38.158503 20.472401 38.715655 22.5 38.876953 L 22.5 42.5 A 1.50015 1.50015 0 1 0 25.5 42.5 L 25.5 38.875 C 27.52533 38.711978 29.410266 38.154587 31.222656 37.404297 L 33.125 40.699219 A 1.5006638 1.5006638 0 1 0 35.724609 39.199219 L 33.888672 36.017578 C 35.244022 35.187838 36.407933 34.200647 37.494141 33.080078 L 40.488281 35.576172 A 1.50015 1.50015 0 1 0 42.410156 33.273438 L 39.560547 30.898438 C 40.608977 29.367241 41.418996 27.684956 41.898438 25.886719 A 1.50015 1.50015 0 0 0 40.378906 23.976562 z"></path>
                </svg>
              )}
            </button>
          </div>
          <button
            className="bg-black text-white py-3 rounded w-full font-semibold"
            type="submit"
          >
            Login
          </button>
          <p className="text-center py-8">Join a fleet? {" "}
          <Link to={"/captainsignup"} className="text-blue-700">Create new Account</Link></p>
        </form>
      </div>
      <div>
        <Link to={"/login"} className="flex flex-col items-center justify-center bg-yellow-600 text-white py-3 rounded w-full font-semibold">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin