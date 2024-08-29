import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Auth";
import Dashboard from "./Dashboard";
import MarkAttendance from "./MarkAttendance";
import FloatOpportunity from "./FloatOppurtunity";
import Profile from "./profile/Profile";
import ViewQueries from "./ViewQuery";
import StudentProfile from "./profile/StudentProfile";
import Student from "./Student";
import Cookies from "js-cookie";

export default function Mentor() {
  useEffect(() => {
    if (Cookies.get("auth_token") === undefined) {
      alert("Session Expired! Please login again");
      window.location.href = "/mentor";
    }
  }, []);
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mark_attendance" element={<MarkAttendance />} />
      <Route path="/float_opportunity" element={<FloatOpportunity />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/students" element={<Student />} />
      <Route path="/profile/student/:kerberos" element={<StudentProfile />} />
      <Route path="/view_queries/:qid" element={<ViewQueries />} />
      {/* <Route path="raise_queries" element={< />} /> */}
      {/* <Route path="view_queries/:qid" element={< />} /> */}
      {/* <Route path="query_feedback" element={<= />} /> */}
      {/* <Route path="update_queries/:qid" element={<= />} /> */}
    </Routes>
  );
}
