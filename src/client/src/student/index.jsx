import { Route, Routes } from "react-router-dom";
import StudentProfile from "./profile";
import StudentQueries from "./raise_query";
import ViewQueries from "./view_queries";
import QueryFeedback from "./query_feedback";
import UpdateQueries from "./update_queries";
import StudentDashboard from "./dashboard";
import { SimpleFooter } from "../components/Footer";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Student() {
  useEffect(() => {
    if (Cookies.get("auth_token") === undefined) {
      alert("Session Expired! Please login again");
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="raise_queries" element={<StudentQueries />} />
        <Route path="view_queries/:qid" element={<ViewQueries />} />
        <Route path="query_feedback" element={<QueryFeedback />} />
        <Route path="update_queries/:qid" element={<UpdateQueries />} />
      </Routes>
      <SimpleFooter />
    </>
  );
}
