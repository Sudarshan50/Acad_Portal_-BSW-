import React from "react";
import { Modal, Paper, Button, Typography } from "@mui/material";
import formatTimestamp from "../../components/time_formatter";
import { useNavigate } from "react-router-dom";

const OngoingAcitivitesOppurtunites = (props) => {
  const navigate = useNavigate();
  return (
    <Modal
      open={Boolean(props?.sItem)}
      onClose={props?.handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Paper
        sx={{
          p: 4,
          mx: "auto",
          mt: 8,
          maxWidth: 600,
          maxHeight: 800,
          overflow: "scroll",
        }}
      >
        {props?.sItem && (
          <>
            <Typography id="modal-title" variant="h6" component="h2">
              {props.sItem?.title}
            </Typography>

            <Typography id="modal-description" sx={{ mt: 2 }}>
              Description: {props.sItem?.description}
            </Typography>
            <Typography id="modal-state" sx={{ mt: 2 }}>
              State: {props.sItem?.state}
            </Typography>

            <Typography id="modal-ment_creator" sx={{ mt: 2 }}>
              Creator: {props.sItem?.creator.name} (
              {props.sItem?.creator?.kerberos?.toUpperCase()})
              <Button
                style={{ marginLeft: "1em" }}
                color="info"
                variant="contained"
                size="small"
                onClick={() => {
                  navigate(
                    `/mod/profile/mentor/${props.sItem?.creator?.kerberos}`
                  );
                }}
              >
                View Profile
              </Button>
            </Typography>
            {props.sItem?.state === "TAKEN" ? (
              <Typography id="modal-taken_mentor_name" sx={{ mt: 2 }}>
                Taken By: {props.sItem?.taker.name} (
                {props.sItem?.taker?.kerberos?.toUpperCase()})
                <Button
                  style={{ marginLeft: "1em" }}
                  color="info"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    navigate(
                      `/mod/profile/mentor/${props.sItem?.taker?.kerberos}`
                    );
                  }}
                >
                  View Profile
                </Button>
              </Typography>
            ) : null}
            <Typography id="modal-expiry" sx={{ mt: 2 }}>
              Expiry Date: {formatTimestamp(props.sItem?.end)}
            </Typography>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default OngoingAcitivitesOppurtunites;
