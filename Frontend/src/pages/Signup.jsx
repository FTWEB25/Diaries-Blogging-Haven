import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("image", formData.image);
    axios
      .post("http://localhost:8080/users/register", formDataToSend, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <Container
        bg="white"
        p={8}
        rounded="md"
        boxShadow="lg"
        maxW="md"
        width="100%"
      >
        <Heading textAlign="center" mb={4}>
          SIGN UP
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter Your Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter Your Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" name="image" onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="teal" width={"100%"}>
            Sign Up
          </Button>
        </form>
        <p>
          Already Have An Account ?
          <span color="blue">
            <Link style={{ color: "blue" }} to={"/login"}>
              Login
            </Link>
          </span>
        </p>
      </Container>
    </Box>
  );
}

export default Signup;
