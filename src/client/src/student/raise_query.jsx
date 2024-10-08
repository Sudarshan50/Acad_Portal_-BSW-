import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007BFF", // Chegg's primary color
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Chegg uses Arial
  },
});

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#fff", // white background
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  padding: theme.spacing(3),
  borderRadius: "8px", // rounded corners
  boxShadow: theme.shadows[3],
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 0), // add some vertical spacing
  minWidth: 120,
  width: "100%",
}));

const QueryForm = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const nav = useNavigate();
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAttachmentsChange = (event) => {
    if (attachments.length === 5) {
      toast.error("Only 5 attachments allowed");
    } else {
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        ...event.target.files,
      ]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast.loading("Please wait while we submit your query");

    const formData = new FormData();
    formData.append("kerberos", Cookies.get("kerberos"));
    formData.append("type", type);
    formData.append("description", description);
    Array.from(attachments).forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const res = await axios.post(
        "https://acadbackend-bswiitdelhi.vercel.app/api/student/queries/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.update(toastId, {
          render: "Query submitted successfully",
          type: "success",
          isLoading: false,
          autoClose:2000,
        });

        nav("/student");
      }
    } catch (err) {
      console.log(err);
      toast.update(toastId, {
        render: err.response?.data?.message || "Failed to submit query",
        type: "error",
        isLoading: false,
        autoClose:2000,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Raise a Query
          </Typography>
          <StyledFormControl>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              onChange={handleTypeChange}
            >
              <MenuItem value={"General"}>General</MenuItem>
              <MenuItem value={"CML101"}> CML101</MenuItem>
              <MenuItem value={"APL100"}> APL100</MenuItem>
              <MenuItem value={"ELL100"}> ELL100</MenuItem>
              <MenuItem value={"PYL101"}> PYL101</MenuItem>
              <MenuItem value={"COL100"}> COL100</MenuItem>
              <MenuItem value={"MTL101"}> MTL101</MenuItem>
              <MenuItem value={"MTL100"}> MTL100</MenuItem>
              <MenuItem value={"MCP101"}> MCP101</MenuItem>
              <MenuItem value={"MCP100"}> MCP100</MenuItem>
              <MenuItem value={"PYP"}> PYP100</MenuItem>
            </Select>
          </StyledFormControl>
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
            fullWidth
            style={{ margin: "1rem 0" }}
          />
          <Box sx={{ margin: "1rem 0" }}>
            <InputLabel htmlFor="attachments">Attachments</InputLabel>
            <input
              id="attachments"
              type="file"
              accept="image/*"
              multiple
              onChange={handleAttachmentsChange}
              style={{ display: "none" }}
            />
            <Box display="flex" mt={1}>
              <label htmlFor="attachments">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              {attachments.length > 0 && (
                <Box ml={2} display="flex" flexWrap="wrap">
                  {Array.from(attachments).map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      style={{ margin: "0 4px" }}
                    />
                  ))}
                </Box>
              )}
            </Box>
            <div style={{ display: "flex", color: "red", fontWeight: "bold" }}>
              File Upload Limit is 10mb, at max 5 files.
            </div>
          </Box>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </StyledForm>
      </FormContainer>
    </ThemeProvider>
  );
};

export default QueryForm;
