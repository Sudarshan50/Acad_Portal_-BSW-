import React from "react";
import { Box, Button, Modal, Paper, Typography, Input } from "@mui/material";
import {
  handleApproveAttendance,
  handleRejectAttendance,
} from "../utils/modActionHandler";

const PastActivityAttendace = (props) => {
  const [hours, setHours] = React.useState(0);
  const handleApprove = (id, hours) => {
    console.log(id, hours);
    handleApproveAttendance(id, hours);
    props.handleClose();
    props.refecth();
  };
  const handleReject = (id) => {
    handleRejectAttendance(id);
    props.handleClose();
    props.refecth();
  };
  return (
    <Modal
      open={Boolean(props?.sItem)}
      onClose={props?.handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Paper sx={{ p: 4, mx: "auto", mt: 8, maxWidth: 600,maxHeight: 800 ,overflow:"scroll" }}>
        {props?.sItem && (
          <>
            <Typography id="modal-title" variant="h6" component="h2">
              {props.sItem?.description}
            </Typography>
            <Typography id="modal-description" key = "new" sx={{ mt: 2 }}>
              Status: {props.sItem?.status}
            </Typography>
            <Typography id="modal-name" key = "slow" sx={{ mt: 2 }}>
              Mentor Name: {props.sItem?.mentor?.name}
            </Typography>
            <Typography id="modal-name" key = "slow" sx={{ mt: 2 }}>
              Approved By (Mod Name): {props.sItem?.approved_by?.name}
            </Typography>
            <Box mt={2}>
              <Typography id="modal-photo" sx={{ mt: 2 }}>
                Photo:
              </Typography>
              {props.sItem?.photoPath.map((photo) => (
                <img
                  src={photo}
                  alt="photo"
                  style={{ display:"inline-block" , height: "200px", width: "210px" }}
                />
              ))}
            </Box>
            {props.sItem?.status === "APPROVED" ? (
              <Button
                variant="contained"
                color="error"
                sx={{ ml: 1, mt: 2 }}
                onClick={() => {
                  handleReject(props.sItem?._id);
                }}
              >
                Reject
              </Button>
            ) : null}
            {props.sItem?.status === "DISAPPROVED" ? (
              <Box mt={2} mb={2}>
                <Box>
                  <Input
                    type="text"
                    placeholder="Enter hours"
                    onChange={(e) => {
                      setHours(e.target.value);
                    }}
                    sx={{ mt: 2, mb: 2 }}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    handleApprove(props.sItem?._id, hours);
                  }}
                >
                  Approve
                </Button>
              </Box>
            ) : null}
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default PastActivityAttendace;
