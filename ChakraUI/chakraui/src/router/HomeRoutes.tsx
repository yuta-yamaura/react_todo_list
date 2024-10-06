import { Home } from "../components/pages/Home"
import { Setting } from "../components/pages/Setting"
import { UserManagement } from "../components/pages/UserManagement"

export const homeRoutes = [
    {
        path: "",
        element: <Home />
    },
    {
        path: "home/user_management",
        element: <UserManagement />
    },
    {
        path: "home/setting",
        element: <Setting />
    },
]