import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Student from "./student/index";
import SignIn from "./sign_in/index";
import Register from "./sign_in/register";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Mentor from "./mentor";
import Mod from "./mod";
import Sign1 from "./mentor/Auth"
import Sign2 from "./mod/Auth"

function PrivateRoute({ children }) {
  const location = useLocation();
  let isAuthenticated = children;
  // const isAuthenticated = Cookies.get('kerberos') !==undefined || Cookies.get('token') !== undefined;
  // return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} />;
  return children;
}

const App = () => {
  return (
    <main>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentor" element={<Sign1 />} />
        <Route path="/mod" element={<Sign2 />} />
        <Route
          path="student/*"
          element={
            <PrivateRoute>
              <Student />
            </PrivateRoute>
          }
        />
        <Route
          path="mentor/*"
          element={
            <PrivateRoute>
              <Mentor />
            </PrivateRoute>
          }
        />
        <Route
          path="mod/*"
          element={
            <PrivateRoute>
              <Mod />
            </PrivateRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
