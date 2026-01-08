import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { NewCar } from "./pages/dashboard/newCar";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { PrivateRoute } from "./routes/privateRoute";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/car/:id",
                element: <NewCar/>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
            {
                path: "/dashboard/newcar",
                element: <PrivateRoute><NewCar/></PrivateRoute>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
])