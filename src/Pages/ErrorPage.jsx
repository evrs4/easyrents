import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Page Not Found</p>
      <Link to="/" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
        Back to Home
      </Link>
    </div>
  );
}
