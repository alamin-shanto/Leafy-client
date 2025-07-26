import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";

import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import MyPlants from "../Pages/MyPlants";
import AllPlants from "../Pages/AllPlants";
import AddPlants from "../Pages/AddPlants";
import Layout from "../Components/Layout";
import PrivateRoutes from "./PrivateRoutes";
import PlantDetails from "../Pages/PlantDetails";
import Spinner from "../Components/Spinner";
import UpdatePlant from "./../Pages/UpdatePlant";

// A wrapper component that tracks location changes and shows spinner on route change
const RouterWithLoading = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show spinner immediately when location changes
    setLoading(true);

    // Hide spinner after a short delay (simulate loading)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // Adjust delay time as needed

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/myplants"
          element={
            <PrivateRoutes>
              <MyPlants />
            </PrivateRoutes>
          }
        />
        <Route
          path="/allplants"
          element={
            <PrivateRoutes>
              <AllPlants />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addplants"
          element={
            <PrivateRoutes>
              <AddPlants />
            </PrivateRoutes>
          }
        />

        <Route
          path="/plants/update/:id"
          element={
            <PrivateRoutes>
              <UpdatePlant />
            </PrivateRoutes>
          }
        />
        <Route path="/plants/:id" element={<PlantDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Router = () => {
  return (
    <HashRouter>
      <RouterWithLoading />
    </HashRouter>
  );
};

export default Router;
