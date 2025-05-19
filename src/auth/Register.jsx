import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import bgImage from "../assets/bg-home.jpg"; // Adjust path if needed

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation
    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some(user => user.email === email)) {
        setError("User with this email already exists");
      } else {
        // Store new user with fullName
        users.push({ fullName, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify({ email, fullName }));
        navigate("/");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
       backgroundImage: 'url(https://images.unsplash.com/photo-1498464619740-386503e7e7f5?q=80&w=2082&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-90 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400">Welcome to EasyRent</h2>
          <h3 className="text-l font-bold text-red-500">Create an account</h3>
          <p className="mt-2 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-400 hover:underline">Sign in</Link>
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-white bg-red-400 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;