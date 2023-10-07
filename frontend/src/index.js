import React from 'react';
import ReactDOM from 'react-dom/client';
import Welcome from "./WelcomePage/welcome.js"
import MainPage from './MainPage/MainPage.js';
import ErrorPage from "./error-page"
import CheckOut from './CheckOut/CheckOut.js';
import ItemPage from './ItemPage/itemPage.js';
import LoginAndRegister from './Register/LoginAndRegister.js';
import MyAccount from './MyAccount/MyAccount.js';
import ShippingData from './MyAccount/ShippingData.js';
import "./index.css"
import MyAddreses from './MyAccount/MyAddreses.js';
import PersonalDataPage from './MyAccount/PersonalDataPage.js';
import PaymentSuccesful from './PaymentResult/paymentSuccesful.js';
import Orderhistory from './MyAccount/orderhistory.js';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Welcome />,
        errorElement: <ErrorPage />,
    },
    {
        path:"/home",
        element : <MainPage />
    },
    {
        path:"/home/products/:kind",
        element : <MainPage />
    },
    {
        path: "/home/:item_id",
        element : <ItemPage />,
    },
    {
        path:"/home/search/:productTitles",
        element : <MainPage />
    },
    {
        path:"/home/cart",
        element: <CheckOut />,
    },
    {
        path:"/home/login",
        element : <LoginAndRegister />
    },
    {
        path:"/home/MyAccount",
        element: <MyAccount />
    },
    {
        path: "/home/MyAccount/ShippingData",
        element: <ShippingData />
    },
    {
        path: "/home/MyAccount/Addresess",
        element: <MyAddreses />
    },
    {
        path: "/home/MyAccount/PersonalData",
        element: <PersonalDataPage />
    },
    {
        path: "/home/MyAccount/ShippingData/:cartRedirect",
        element : <ShippingData />
    },
    {
        path:"/payment-resolved",
        element : <PaymentSuccesful/>
    },
    {
        path: "/home/MyAccount/orderHistory",
        element : <Orderhistory />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
       <RouterProvider router={router} />  
    </>
);
