import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx"
import Home from "./pages/Home/Home.jsx"
import Order from "./pages/Order/Order.jsx"
import Register from "./pages/Register/Register.jsx"
import UserDashboard from "./pages/Dashboards/UserDashboard.jsx"
import UserOrders from "./pages/Dashboards/UserOrders.jsx"
import UserTickets from "./components/Dashboards/UserTickets.jsx"

const routes = [
  { path: '/', element: <Home /> },
  {
    path: '/order',
    element: <PrivateRoute reDirectPath='/register'> <Order /> </PrivateRoute>
  },
  { path: '/register', element: <Register /> },
  {
    path: '/dashboard',
    element: <PrivateRoute reDirectPath='/dashboard'> <UserDashboard /> </PrivateRoute>,
    children: [
      { path: '/dashboard/orders', element: <UserOrders /> },
      { path: '/dashboard/tickets', element: <UserTickets /> }
    ]
  },
]

export { routes }