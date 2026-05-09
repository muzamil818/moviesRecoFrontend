import Navbar from "../components/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Recommendations from "../src/pages/Recommendations";

import { Routes, Route } from "react-router-dom";
import  { UserProvider } from "./context/userContext.tsx";
function App() {
  return (

    <div className="min-h-screen bg-black text-white">
      <UserProvider>


      <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Home />}
          />

        <Route
          path="/movies"
          element={<Movies />}
          />

        <Route
          path="/recommendations"
          element={<Recommendations />}
          />

      </Routes>
          </UserProvider>

    </div>
  );
}

export default App;