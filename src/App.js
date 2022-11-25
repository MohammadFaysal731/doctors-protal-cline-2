import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import About from "./Pages/About/About";
import Appointment from "./Pages/Appointment/Appointment/Appointment";
import Contact from "./Pages/Contact/Contact";
import AddDoctor from "./Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "./Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import ManageDoctors from "./Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "./Pages/Dashboard/MyAppointment/MyAppointment";
import MyHistory from "./Pages/Dashboard/MyHistory/MyHistory";
import MyReview from "./Pages/Dashboard/MyReview/MyReview";
import Payment from "./Pages/Dashboard/Payment/Payment";
import Home from "./Pages/Home/Home/Home";
import Review from "./Pages/Review/Review";
import Footer from "./Pages/Shared/Footer/Footer";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import RequireAdmin from "./Pages/Shared/RequireAdmin/RequireAdmin";
import RequireAuth from "./Pages/Shared/RequireAuth/RequireAuth";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-12">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/appointment"
          element={
            <RequireAuth>
              <Appointment />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyAppointment />}></Route>
          <Route path="myreview" element={<MyReview />}></Route>
          <Route path="myhistory" element={<MyHistory />}></Route>
          <Route path="payment/:id" element={<Payment />}></Route>
          <Route
            path="allusers"
            element={
              <RequireAdmin>
                <AllUsers />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="adddoctor"
            element={
              <RequireAdmin>
                <AddDoctor />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="managedoctors"
            element={
              <RequireAdmin>
                <ManageDoctors />
              </RequireAdmin>
            }
          ></Route>
        </Route>

        <Route path="/review" element={<Review />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
