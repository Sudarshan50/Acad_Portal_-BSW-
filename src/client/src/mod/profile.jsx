import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import axios from "axios";
import { MentNav } from "./ModNav";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal-info");
  const [personalInfo, setPersonalInfo] = useState({});
  const [otherMods, setOtherMods] = useState([]);
  const [key, setKey] = useState({
    oldpassword: "",
    newPassword: "",
  });
  useEffect(() => {
    fetchPersonalInfo();
    fetchOtherMods();
  }, []);

  const fetchOtherMods = async () => {
    try{
        const res = await axios.get(`http://localhost:3001/api/moderator/admin/mod/view/`,{
            headers: {
                Authorization: "Bearer " + Cookies.get("auth_token"),
            }
        })
        if(res.status === 200)
        {
            setOtherMods(res.data.moderators);
            console.log(res.data.moderators);
        }
    }catch(err)
    {
        console.log(err);
    }
  }

  const fetchPersonalInfo = async () => {
    try {
      const info = await axios.get(
        `http://localhost:3001/api/moderator/admin/mod/view/${Cookies.get(
          "kerberos"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      if (info.status === 200) {
        setPersonalInfo(info.data);
      } else {
        toast.error("Error in fetching personal info");
      }
    } catch (er) {
      console.log(er);
      toast.error("Error in fetching personal info");
    }
  };

  return (
    <>
      <MentNav />
      <div className="min-h-screen bg-gray-100 flex mt-2">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-gray-200 shadow-md transition-transform duration-300 ease-in-out">
          <ul className="list-none p-0 m-0">
            <li
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                activeTab === "personal-info"
                  ? "bg-gray-300 text-blue-600"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("personal-info")}
            >
              Personal Info
            </li>
            <li
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                activeTab === "other-activities"
                  ? "bg-gray-300 text-blue-600"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("view-other-mods")}
            >
              Other Mods
            </li>
          </ul>
        </div>
        {/* Content */}
        <div className="w-3/4 p-4">
          {activeTab === "personal-info" && (
            <Card className="w-full mb-4">
              <CardBody>
                <Typography variant="h5" className="mb-4">
                  Personal Info
                </Typography>
                <div className="mb-4">
                  <Typography>
                    <strong>Name:</strong> {personalInfo.name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong>{" "}
                    {`${personalInfo.kerberos}@iitd.ac.in`}
                  </Typography>
                  <Typography>
                    <strong>Acess:</strong> Moderator
                  </Typography>
                </div>
              </CardBody>
            </Card>
          )}
          {activeTab === "view-other-mods" && (
            <Card className="w-full mb-4">
              <CardBody>
                <TableContainer
                  component={Paper}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Acess</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {otherMods?.map((mod) => (
                        <TableRow key={mod._id}>
                          <TableCell>{mod.name}</TableCell>
                          <TableCell>{`${mod.kerberos}@iitd.ac.in`}</TableCell>
                          <TableCell>Moderator</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
