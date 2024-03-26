import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import './App.css';

import RootLayout from './RootLayout';
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login"
import Contact from "./pages/Contact";

import MyProfile from "./pages/myProfile/MyProfile"
import Category from "./pages/category/Category";
import RequestQuotationForm from './pages/requestQuotationForm/RequestQuotationForm';
import QuotationReport from './pages/quotationReport/QuotationReport';
import Report from './pages/report/Report';

import Products from './pages/products/Products'
import AddProduct from './pages/addProduct/AddProduct';
import Quotation from './pages/quotation/Quotation';
import RequestView from './pages/requestView/RequestView'
import PrivateRoute from './privateRoute/PrivateRoute';

import NotFound from './pages/NotFound';




function App() {
  

  let browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/category",
          element: <Category />
        },
        {
          path: "/myProfile",
          element: <PrivateRoute><MyProfile /></PrivateRoute>
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/quotationreport",
          element: <PrivateRoute><QuotationReport /></PrivateRoute>
        },
        {
          path: "/report",
          element: <PrivateRoute><Report /></PrivateRoute>
        },
        {
          path: "/products",
          element: <PrivateRoute><Products /></PrivateRoute>
        },
        {
          path: "/quotation",
          element: <PrivateRoute><Quotation /></PrivateRoute>
        },
        {
          path: "/requestView",
          element: <PrivateRoute><RequestView /></PrivateRoute>
        },
        {
          path: "/addProduct",
          element: <PrivateRoute><AddProduct /></PrivateRoute>
        },
        {
          path: "/requestQuotationForm",
          element: <PrivateRoute><RequestQuotationForm /></PrivateRoute>
        }
      ]
    },
    
        {
          path: "*",
          element: <NotFound/>
        }
  ]);
  return <RouterProvider router={browserRouter} />;

}

export default App;
