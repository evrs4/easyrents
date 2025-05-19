import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Find user with matching email and password
      const user = users.find(
        user => user.email === email && user.password === password
      );
      
      if (!user) {
        setError("Invalid email or password");
      } else {
        // Store current user (just email for simplicity)
        localStorage.setItem("currentUser", JSON.stringify({ email: user.email }));
        navigate("/");
      }
      
    // Inside handleLogin function, after successful login:
if (user) {
  localStorage.setItem("currentUser", JSON.stringify({
    email: user.email,
    fullName: user.fullName || user.full_name || ""
  }));
  
  // Dispatch custom event to notify header
  window.dispatchEvent(new Event("userChange"));
  
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
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md bg-opacity-90">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-1 text-red-400 hover:underline text-sm"
        >
          &larr; Back to Home
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400">Welcome to EasyRent</h2>
          <h3 className="text-l font-bold text-red-500">Sign in to your account</h3>
          <p className="mt-2 text-gray-600">
            Dont have an account?{" "}
            <Link to="/register" className="text-red-400 hover:underline">Register Now</Link>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-red-400 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="text-red-400 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>

          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-white bg-red-400 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;