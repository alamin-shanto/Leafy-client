import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyPlants from "../Pages/MyPlants";
import AllPlants from "../Pages/AllPlants";
import AddPlants from "../Pages/AddPlants";
import Layout from "../Components/Layout";

const Router = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/myplants" element={<MyPlants />}></Route>
            <Route path="/allplants" element={<AllPlants />}></Route>
            <Route path="/addplants" element={<AddPlants />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Router;
