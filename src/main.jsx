import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./Layout/RootLayout.jsx";
import Home from "./Pages/Home.jsx";
import AllProducts from "./Pages/AllProducts.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import MyProducts from "./Pages/MyProducts.jsx";
import MyBids from "./Pages/MyBids.jsx";
import CreateProject from "./Pages/CreateProject.jsx";
import ViewDetails from "./Pages/ViewDetails.jsx";
import PrivateRouter from "./Provider/PrivateRouter.jsx";
import Spinner from "./Components/Spinner/Spinner.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/productsDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://smart-deals-server-nine.vercel.app/productsDetails/${params.id}`
            // `https://smart-deals-server-nine.vercel.appproductsDetails/${params.id}`
          ),
        element: (
          <PrivateRouter>
            <ViewDetails></ViewDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myProducts",
        element: (
          <PrivateRouter>
            <MyProducts></MyProducts>
          </PrivateRouter>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRouter>
            <MyBids></MyBids>
          </PrivateRouter>
        ),
      },
      {
        path: "/createProduct",
        element: (
          <PrivateRouter>
            <CreateProject></CreateProject>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
