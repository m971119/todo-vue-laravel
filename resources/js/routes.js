import App from "./App.vue";
import LandingPage from "./components/marketing/LandingPage";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";

const routes = [
    {
        path: "/",
        name: "home",
        component: LandingPage
    },
    {
        path: "/todo",
        name: "todo",
        component: App,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: "/logout",
        name: "logout",
        component: Logout
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            requiresVisitor: true
        }
    }
];

export default routes;
