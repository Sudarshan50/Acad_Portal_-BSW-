import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MarkAttendance = () => {
  const [date, setDate] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [photo, setPhoto] = useState([]);
  const navigate = useNavigate();
  const handleDateChange = (e) => setDate(e.target.value);
  const handleDiscussionChange = (e) => setDiscussion(e.target.value);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait while we mark your attendance");

    const formData = new FormData();
    formData.append("date", date);
    formData.append("description", discussion);
    formData.append("kerberos", Cookies.get("kerberos"));
    formData.append("photo", photo);

    try {
      const res = await axios.post(
        "https://acadbackend-git-main-bswiitdelhi.vercel.app/api/mentor/attendance/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );

      if (res.status === 200) {
        setDate("");
        setDiscussion("");
        setPhoto([]);
        navigate("/mentor/dashboard");
        toast.update(toastId, {
          render: "Attendance marked successfully",
          type: "success",
          isLoading: false,
          autoClose:2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.update(toastId, {
        render: "Error in marking attendance",
        type: "error",
        isLoading: false,
        autoClose:2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-4">
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Mark Attendance
            </h2>

            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="font-medium">
                Date: Session date*
              </label>
              <Input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discussion" className="font-medium">
                What was discussed in this session?*
              </label>
              <Textarea
                id="discussion"
                value={discussion}
                onChange={handleDiscussionChange}
                required
                placeholder="Describe the session..."
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="photo" className="font-medium justify-center">
                Photo of session*
              </label>

              <Input
                type="file"
                id="photo"
                onChange={handlePhotoChange}
                accept="image/*"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div style={{display:"flex", color:"red",fontWeight:"bold"}}>Image size should be less than 10mb. </div>
            <Button
              type="submit"
              variant="gradient"
              className="flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default MarkAttendance;
