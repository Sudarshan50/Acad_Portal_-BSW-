import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Mentors from "./Mentor";
import Dashboard from "./dashboard";
import SignIn from "./Auth";
import MentorProfile from "./profile/mentor_profile";
import Profile from "./profile";
import Students from "./student";
import StudentProf from "./profile/student_profile";
import Cookies from "js-cookie";
import { SimpleFooter } from "../components/Footer";

export default function Mod() {
  useEffect(()=>{
    if (Cookies.get("auth_token") === undefined) {
      alert("Session Expired! Please login again");
      window.location.href = "/mod";
    }
  },[])
  return (
    <>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/mentor/:kerberos" element={<MentorProfile />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/students" element={<Students />} />
      <Route path="/profile/student/:kerberos" element={<StudentProf />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
    <SimpleFooter />
    </>
  );
}
