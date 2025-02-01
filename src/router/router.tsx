import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import authRouteChildren from "./authChildren";
import dashboardChildren from "./dashboardChildren";
import mainChildren from "./mainChildren";
import AdminProtected from "./AdminProtected";

const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<MainLayout></MainLayout>,
            children:mainChildren
        },
        {
            path:'/',
            element:<AuthLayout></AuthLayout>,
            children:authRouteChildren
        },
        {
            path:'/',
            element:<AdminProtected><DashboardLayout></DashboardLayout></AdminProtected>,
            children:dashboardChildren
        },
    ]
)

export default router 