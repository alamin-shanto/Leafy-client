import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import MyPlants from "../Pages/MyPlants";
import AllPlants from "../Pages/AllPlants";
import AddPlants from "../Pages/AddPlants";
import Layout from "../Components/Layout";
import PrivateRoutes from "./PrivateRoutes";

const Router = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/myplants"
              element={
                <PrivateRoutes>
                  <MyPlants />
                </PrivateRoutes>
              }
            ></Route>
            <Route
              path="/allplants"
              element={
                <PrivateRoutes>
                  <AllPlants />
                </PrivateRoutes>
              }
            ></Route>
            <Route
              path="/addplants"
              element={
                <PrivateRoutes>
                  <AddPlants />
                </PrivateRoutes>
              }
            ></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Router;
