import Register from "./pages/Register";
import Login from "./pages/Login";

export const privateRoutes = [
    {path: '/register', component: Register, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]