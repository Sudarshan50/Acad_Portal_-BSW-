import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const handleApproveQuery = async (id) => {
  try {
    const res = await axios.post(
      `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/queries/make_available/${id}`,
      {
        kerberos: Cookies.get("kerberos"),
      },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("auth_token"),
        },
      }
    );
    if (res.status === 200) {
      toast.success("Query Approved");
    }
  } catch (err) {
    toast.error("Sever Error!");
    console.log(err);
  }
};
export const handleRejectQuery = async (id) => {
  try {
    const res = await axios.post(
      `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/queries/dismiss/${id}`,
      {
        kerberos: Cookies.get("kerberos"),
      },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("auth_token"),
        },
      }
    );
    if (res.status === 200) {
      toast.success("Query Rejected");
    }
  } catch (err) {
    toast.error("Sever Error!");
    console.log(err);
  }
};
export const handleApproveAttendance = async (id, hours) => {
  try {
    const res = await axios.post(
      `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/attendance/approve/${id}`,
      {
        kerberos: Cookies.get("kerberos"),
        hours: hours,
      },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("auth_token"),
        },
      }
    );
    if (res.status === 200) {
      toast.success("Attendance Approved");
    }
  } catch (err) {
    toast.error("Sever Error!");
    console.log(err);
  }
};
export const handleRejectAttendance = async (id) => {
  try {
    const res = await axios.post(
      `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/attendance/disapprove/${id}`,
      {
        kerberos: Cookies.get("kerberos"),
      },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("auth_token"),
        },
      }
    );
    if (res.status === 200) {
      toast.success("Attendance Disapproved");
    }
  } catch (err) {
    console.log(err);
    toast.error("Sever Error!");
  }
};
export const approveResolved = async (id, hours) => {
  try {
    const res = await axios.post(
      `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/queries/approve_resolve/${id}`,
      {
        kerberos: Cookies.get("kerberos"),
        hours: hours,
      },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("auth_token"),
        },
      }
    );
    if (res.status === 200) {
      toast.success("Query Approved");
    }
  } catch (err) {
    toast.error(err);
    console.log(err);
  }
};
export const rejectResolved = async (id) => {
  try {
    const res = await axios.post(
      `https://acadbackend-git-main-bswiitdelhi.vercel.app/api/moderator/queries/reject_resolve/${id}`,
      {
        kerberos: Cookies.get("kerberos"),
      },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("auth_token"),
        },
      }
    );
    if (res.status === 200) {
      toast.success("Query Rejected");
    }
  } catch (err) {
    console.log(err);
    toast.error("Server Error!");
  }
};
