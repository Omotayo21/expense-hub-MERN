import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./redux/hook";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { fetchExpenses, fetchRevenues } from "./utils/fetchData";
import Spinner from "./components/Spinner";

import VerifyEmailSucessfulPage from "./pages/successful";
import VerifyEmailPage from "./pages/verifyEmail";
import ForgotPasswordReset from "./pages/resetpassword";
import ForgotPasswordMail from "./pages/forgotpassword";

const Transactions = lazy(() => import("./pages/transactions"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const LoginPage = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/signup"));
const Notifications = lazy(() => import("./pages/notifications"));
const Add = lazy(() => import("./pages/Add"));
const FirstPage = lazy(() => import("./pages/firstpage"));

// TypeScript props for PrivateRoute
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = Cookies.get("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    fetchExpenses(dispatch);
    fetchRevenues(dispatch);
  }, [dispatch]);

  const showNavbarAndSidebar = [
    "/dashboard",
    "/profile",
    "/notifications",
    "/transactions",
    "/add",
  ].includes(location.pathname);

  return (
    <div>
      <ToastContainer />
      {showNavbarAndSidebar && <Navbar />}
      <div style={{ display: "flex" }}>
        {showNavbarAndSidebar && <Sidebar />}
        <main style={{ flex: 1, padding: showNavbarAndSidebar ? "1rem" : "0" }}>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<FirstPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/successful"
                element={<VerifyEmailSucessfulPage />}
              />
              <Route path="/verifyEmail" element={<VerifyEmailPage />} />
              <Route path="/resetpassword" element={<ForgotPasswordReset />} />
              <Route path="/forgotpassword" element={<ForgotPasswordMail />} />
              <Route
                path="/transactions"
                element={
                  <PrivateRoute>
                    <Transactions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <PrivateRoute>
                    <Add />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
