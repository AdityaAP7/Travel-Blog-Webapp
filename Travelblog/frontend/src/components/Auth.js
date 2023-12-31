import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const response = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: input.name,
        email: input.email,
        password: input.password,
      })
      .catch((err) => console.log(err));

    const data = await response.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (isSignup) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login())).then(()=>navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
      .then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={400}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadius={5}
      >
        <Typography variant="h2" padding={3} textAlign="center">
          {isSignup ? "Signup" : "Login"}
        </Typography>
        {isSignup && (
          <TextField
            name="name"
            onChange={handleChange}
            value={input.name}
            placeholder="Name"
            margin="normal"
          />
        )}
        <TextField
          name="email"
          onChange={handleChange}
          value={input.email}
          type="email"
          placeholder="email"
          margin="normal"
        />
        <TextField
          name="password"
          onChange={handleChange}
          value={input.password}
          type="password"
          placeholder="password"
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 }}
          color="warning"
        >
          Submit
        </Button>
        <Button
          onClick={() => setIsSignup(!isSignup)}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Change to {isSignup ? "Login" : "Signup"}
        </Button>
      </Box>
    </form>
  );
};

export default Auth;
