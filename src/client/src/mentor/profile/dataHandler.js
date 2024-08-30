import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";



export const activityHandler = (allQueries,allAttendances,allOpportunities) => {

    const approvedQueries = allQueries.filter(
      (query) => query.status === "APPROVED"
    );
    const approvedAttendances = allAttendances.filter(
      (attendance) => attendance.status === "APPROVED"
    );
    const otherQueries = allQueries.filter(
      (query) => query.status !== "APPROVED" || query.status !== "REJECTED"
    );
    const rejectedQueries = allQueries.filter(
      (query) => query.status === "REJECTED"
    );
    const expiredOpportunities = allOpportunities.filter(
      (opportunity) => opportunity.creator?.kerberos === Cookies.get("kerberos")
    );
    const takenOpportunities = allOpportunities.filter(
      (opportunity) => opportunity.taker?.kerberos === Cookies.get("kerberos")
    );
    const rejectedAttendances = allAttendances.filter((attendance) => {
      return attendance.status === "DISAPPROVED";
    });
    return {
      approvedQueries,
      approvedAttendances,
      otherQueries,
      rejectedQueries,
      expiredOpportunities,
      takenOpportunities,
      rejectedAttendances,
    };
};
