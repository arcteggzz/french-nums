import { Route, Routes, useLocation } from "react-router-dom";
import { HOME, FRENCH_NUMS, FRENCH_TENSES } from "./routePaths";

import { HomePage, FrenchNumbersPage, FrenchTensesPage } from "../pages";

const AllRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path={HOME} element={<HomePage />} />
        <Route path={FRENCH_NUMS} element={<FrenchNumbersPage />} />
        <Route path={FRENCH_TENSES} element={<FrenchTensesPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
