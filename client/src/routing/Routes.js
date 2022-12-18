import React from 'react';
import { Route, Switch } from 'react-router-dom'

const ROUTES = [
    {
        path: "/", 
        key: "ROOT", 
        exact: true, 
        element: <Home/>
    },
    {
        path: "/:storeCreator", 
        key: "StoreCreator", 
        exact: true, 
        element: <Store/>
    },
    {
        path: "/items/:tokenId", 
        key: "Items", 
        exact: true, 
        element: <DetailedListing/>
    },
    {
        path: "/sell", 
        key: "Sell", 
        exact: true, 
        element: <Sell/>
    },
    {
        path: "/mynfts", 
        key: "MyNFTS", 
        exact: true, 
        element: <MyNFTS/>
    },
    {
        path: "/:storeCreator", 
        key: "StoreCreator", 
        exact: true, 
        element: <Store/>
    },
    {
        path: "mynfts/:tokenId", 
        key: "DetailedMyNFT", 
        exact: true, 
        element: <DetailedMyNFT/>
    },
    {
        path: "/creatordashboard", 
        key: "CreatorDashboard", 
        exact: true, 
        element: <CreatorDashboard/>
    },
    {
        path: "/creatordashboard/:tokenId", 
        key: "CreatorDashboard", 
        exact: true, 
        element: <DetailedCreation/>
    },
]

export default ROUTES;

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.element {...props} routes={route.routes} />}
            //keep an eye on route.element (tutorial you used component but new react router uses element keyword)
        />
    )
}

