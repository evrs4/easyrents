// App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Fleet from './Pages/Fleet';
import Login from './auth/Login';
import Register from './auth/Register';
import Detailcar from './Pages/Detailcar';
import TypePage from './Pages/TypePage';
import ManufacturePage from './Pages/ManufacturePage';
import ErrorPage from './Pages/ErrorPage';
import ContactPages from './Pages/ContactPages';
import AboutPages from './Pages/AboutPages';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/fleet',
    element: <Fleet />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/fleet/:type',
    element: <TypePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/car/:id',
    element: <Detailcar />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/brand/:brandName',
    element: <ManufacturePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contact',
    element: <ContactPages />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: <AboutPages />,
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
