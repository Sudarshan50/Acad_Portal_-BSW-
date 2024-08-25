import React, { useState } from "react";
import { Box, Button, Modal, Paper, Typography, Input } from "@mui/material";
import {
  handleApproveQuery,
  handleRejectQuery,
  approveResolved,
  rejectResolved,
} from "../utils/modActionHandler";

const ModActionAwaitedQuery = (props) => {
  const [hours, setHours] = useState(0);
  const handleApprove = (id) => {
    handleApproveQuery(id);
    props.handleClose();
    props.refecth();
  };
  const handleReject = (id) => {
    handleRejectQuery(id);
    props.handleClose();
    props.refecth();
  };
  const handleApproveResolve = (id, hours) => {
    approveResolved(id, hours);
    props.handleClose();
    props.refecth();
  };
  const handleRejectResolve = (id) => {
    rejectResolved(id);
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
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Status: {props.sItem?.status}
            </Typography>
            {props.sItem?.attachments?.length ? (
              <Box mt={2}>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                  Photos:
                </Typography>
                <div
                  style={{
                    display: "flex",
                    overflow: "scroll",
                    scrollBehavior: "smooth",
                  }}
                >
                  {props.sItem?.attachments.map((photo) => (
                    <>
                      <img
                        key={photo}
                        src={photo}
                        alt="photo"
                        style={{
                          padding: "0.5em",
                          height: "300px",
                          width: "300px",
                        }}
                      />

                      {props.sItem?.attachments?.length > 1 ? (
                        <div
                          style={{
                            border: "0.09em solid black",
                            marginLeft: "1em",
                          }}
                        ></div>
                      ) : null}
                    </>
                  ))}
                </div>
              </Box>
            ) : (
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Photos: Null
              </Typography>
            )}

            {props.sItem?.status === "QUEUED" && (
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    handleApprove(props.sItem?._id);
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    handleReject(props.sItem?._id);
                  }}
                >
                  Reject
                </Button>
              </Box>
            )}
            {props.sItem?.status === "RESOLVED" ? (
              <>
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
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      handleApproveResolve(props.sItem?._id, hours);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      handleRejectResolve(props.sItem?._id);
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </>
            ) : null}
            <Typography variant="body2" id = "modal-disclaimer" sx={{ mt: 2, fontWeight:"bold" }}>
              Note: To view image right click on the image and open in new tab.
            </Typography>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default ModActionAwaitedQuery;
