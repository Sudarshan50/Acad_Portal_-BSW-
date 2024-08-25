import React from "react";
import { Box, Button, Modal, Paper, Typography, Input } from "@mui/material";
import {
  handleApproveAttendance,
  handleRejectAttendance,
} from "../utils/modActionHandler";

const ModActionAwaitedAttendance = (props) => {
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
      <Paper sx={{ p: 4, mx: "auto", mt: 8, maxWidth: 600 }}>
        {props?.sItem && (
          <>
            <Typography id="modal-title" variant="h6" component="h2">
              {props.sItem?.description}
            </Typography>
            <Typography id="modal-status" sx={{ mt: 2 }}>
              Status: {props.sItem?.status}
            </Typography>
            <Typography id="modal-name" sx={{ mt: 2 }}>
              Mentor Name: {props.sItem?.mentor?.name}
            </Typography>
            <Box mt={2}>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Photo:
              </Typography>
              {props.sItem?.photoPath.map((photo) => (
                <img
                  src={photo}
                  alt="photo"
                  style={{ display:"inline-block" , height: "100px", width: "110px" }}
                />
              ))}
            </Box>
            <Box mt={2}>
              <Input
                type="text"
                placeholder="Enter hours"
                onChange={(e) => {
                  setHours(e.target.value);
                }}
                sx={{ mt: 2 }}
              />
            </Box>
            {/* Depending on the type of item, render different actions */}
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleApprove(props.sItem?._id, hours);
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => {
                  handleReject(props.sItem?._id);
                }}
              >
                Reject
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default ModActionAwaitedAttendance;
