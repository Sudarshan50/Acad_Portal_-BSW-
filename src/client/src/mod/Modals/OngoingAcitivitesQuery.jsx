import React from "react";
import { Modal, Paper, Typography, Button, Box } from "@mui/material";

const OngoingActivitesQuery = (props) => {
  console.log(props.sItem);
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
            {props.sItem?.status === "TAKEN" ? (
              <Typography id="modal-taken_mentor_name" sx={{ mt: 2 }}>
                Taken By: {props.sItem?.mentor_name}
              </Typography>
            ) : null}

            {(props.sItem?.attachments.length)? (
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

            
            <Typography variant="body2" id = "modal-disclaimer" sx={{ mt: 2, fontWeight:"bold" }}>
              Note: To view image right click on the image and open in new tab.
            </Typography>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default OngoingActivitesQuery;
