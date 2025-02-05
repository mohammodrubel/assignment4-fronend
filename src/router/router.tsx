import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import AdminProtected from "./AdminProtected";
import authRouteChildren from "./authChildren";
import dashboardChildren from "./dashboardChildren";
import mainChildren from "./mainChildren";
import userChildren from "./UserChildren";
import ProtectedRouter from "./ProtectedRouter";
import UserLayout from "../layout/UserLayout";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout></MainLayout>,
            children: mainChildren
        },
        {
            path: '/',
            element: <ProtectedRouter><UserLayout></UserLayout></ProtectedRouter>,
            children: userChildren
        },
        {
            path: '/',
            element: <AuthLayout></AuthLayout>,
            children: authRouteChildren
        },
        {
            path: '/',
            element: <AdminProtected><DashboardLayout></DashboardLayout></AdminProtected>,
            children: dashboardChildren
        },
    ]
)

export default router 