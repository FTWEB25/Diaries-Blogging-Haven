import { Box, Button, Container, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate=useNavigate()
   const [formData, setFormData] = useState({
     email: "",
     password: "",
   });
   const handleChange = (e) => {
       setFormData({...formData,[e.target.name]:e.target.value})
   };
   const handleSubmit=async(e)=>{
     e.preventDefault()
     try {
        const response = await axios.post(
          "https://react-app-a0ys.onrender.com/users/login",
          formData
        );
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
     } catch (error) {
        console.log(error)
     }
   }
   
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
          LOGIN
        </Heading>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" colorScheme="teal" width={"100%"} mb={5}>
            LOGIN
          </Button>
        </form>
        <p>
          Don't Have An Account ?
          <span color="blue">
            <Link style={{ color: "blue" }} to={"/signup"}>
              Sign Up
            </Link>
          </span>
        </p>
      </Container>
    </Box>
  );
}

export default Login