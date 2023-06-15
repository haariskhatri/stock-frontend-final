import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import IpoRegister from "./pages/IpoRegister";
import './App.css'
import BuySellCard from "./components/BuySellCard";
import MarketPage from "./pages/MarketPage";
import ReadMore from "./components/ReadMore";
import HomePage from "./pages/HomePage";
import { Getipodata } from "./pages/Getipodata";
import { GetSharesList } from "./pages/GetSharesList";
import { UserRegistration } from "./pages/UserRegistration";
import { Getinvestment } from "./components/getinvestment";
import { UserHistory } from "./components/UserHistory";
import { History } from "./pages/History";
import { Investment } from "./pages/Investment";
import { Adminlogin } from "./pages/Adminlogin";
import { SharesList } from "./components/SharesList";
import Marketdepth from "./components/Marketdepth";
import { Adminipo } from "./pages/AdminIpo";
import { AdminDetailsPage } from "./pages/AdminDetailsPage";
import { IpList } from "./pages/IpList";



const router = createBrowserRouter([

  {
    path: '/sharelist',
    element: <SharesList />
  },
  {
    path: '/market',
    element: <Marketdepth />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: '/register',
    element: <IpoRegister />
  },
  {
    path: '/buy',
    element: <MarketPage />
  },
  {
    path: '/',
    element: <UserRegistration />
  },
  {
    path: '/getipo',
    element: <Getipodata />
  },
  {
    path: '/getshares',
    element: <GetSharesList />
  },
  {
    path: '/detail/:companyId',
    element: <MarketPage />
  },
  {
    path: '/admincompony',
    element: <Adminipo />
  },
  {
    path: '/user',
    element: <UserHistory />
  },
  {
    path: '/Investment',
    element: <Investment />
  },
  {
    path: '/History',
    element: <History />
  },
  {
    path: '/admin',
    element: <Adminlogin />
  },
  {
    path: '/adminhome',
    element: <AdminDetailsPage />
  },
  {
    path: '/list',
    element: <IpList />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // {/* </React.StrictMode> */}
);