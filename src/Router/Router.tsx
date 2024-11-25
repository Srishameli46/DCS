import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { HOME, LOGIN, PROFILES } from "../constants";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import DoctorProfile from "../pages/DoctorProfile";
import { AppProvider } from "../context/AppContext";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import { Login } from "../pages/Login";
import { Authprovider } from "../context/Authcontext";
import AppointmentList from "../components/Appointment/Appointment.list";
import PatientForm from "../components/Patient/PatientRegister";
import PrivateRoute from "./PrivateRouter";
export function Router() {
  return (
    <>
      <BrowserRouter>
      <AppProvider>
        <Authprovider>
          <Routes>
            <Route path={LOGIN} element={<Login />} />
            <Route index element={<Navigate to={LOGIN} />} />
            <Route path="/" element={<Layout />}>
               <Route path={HOME} element={<Home />} />
               <Route path = "register" element={<PatientForm/>}/>
              <Route path={PROFILES} element={<DoctorProfile />} />
              <Route path="/profiles/appointment" element={<PrivateRoute Component={AppointmentForm}/>} />
              <Route path="/appointments" element={<AppointmentList/>}></Route>
            </Route>
          </Routes>
          </Authprovider>
          </AppProvider>
      </BrowserRouter>
    </>
  );
}
