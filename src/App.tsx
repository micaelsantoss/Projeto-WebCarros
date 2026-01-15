import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { NewCar } from "./pages/dashboard/newCar";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { PrivateRoute } from "./routes/privateRoute";
import { EditCar } from "./pages/dashboard/editCar";
import { CarDetail } from "./pages/carDetail";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
            {
                path: "/dashboard/newcar",
                element: <PrivateRoute><NewCar/></PrivateRoute>
            },
            {
                path: "/dashboard/editcar/:id",
                element: <PrivateRoute><EditCar/></PrivateRoute>
            },
            {
                path: "/car/:id",
                element: <CarDetail/>
            },
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