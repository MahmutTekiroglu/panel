import React from "react"
import { Redirect } from "react-router-dom"

import Login from "../pages/authentication/Login"

import Users from "../pages/user-management/user-list"
import TelegramUsers from "../pages/user-management/telegram-users"
import StocksReports from "../pages/stocks-management/reports"


const userRoutes = [
  { path: "/raporlar", component: StocksReports },
  { path: "/kullanicilar", component: Users },
  { path: "/telegram", component: TelegramUsers },
  { path: "*", component: StocksReports },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/raporlar" /> },
]

const authRoutes = [
  { path: "/giris", component: Login }
]

export { userRoutes, authRoutes }
