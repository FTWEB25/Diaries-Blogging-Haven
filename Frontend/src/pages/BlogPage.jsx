import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios"

function BlogPage() {
    const user=JSON.parse(localStorage.getItem("user"))
    const [formData, setFormData] = useState({
      title: "",
      image: "",
      category: "",
      description: "",
    });
    const handleChange=(e)=>{
      if (e.target.name === "image") {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      } 
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("image", formData.image);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("description", formData.description);
        axios
          .post(
            "https://react-app-a0ys.onrender.com/blogs/create",
            formDataToSend,
            {
              headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  return (
    <>
      <Navbar />
      <Container
        maxW="xl"
        mt={8}
        boxShadow="xl"
        borderRadius="lg"
        border={"2px solid gray"}
        p={"20px"}
      >
        <form onSubmit={handleSubmit}>
          <Heading as="h1" size="xl" mb={8} textAlign="center">
            Create Your Blog
          </Heading>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title Of Your Blog"
              name="title"
              borderRadius="md"
              boxShadow="md"
              focusBorderColor="teal.500"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Add Image</FormLabel>
            <Input type="file" name="image" onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Add Description</FormLabel>
            <Textarea
              placeholder="Here is a sample placeholder"
              borderRadius="md"
              boxShadow="md"
              focusBorderColor="teal.500"
              resize="vertical"
              minHeight="100px"
              border={"2px solid gray"}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Select Category</FormLabel>
            <Select
              placeholder="Select option"
              borderRadius="md"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Fashion">Fashion</option>
            </Select>
          </FormControl>
          <Button
            colorScheme="teal"
            variant="solid"
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: "teal.600" }}
            _focus={{ boxShadow: "outline" }}
            w="100%"
            mt={4}
            type="submit"
          >
            ADD BLOG
          </Button>
        </form>
      </Container>
    </>
  );
}

export default BlogPage;
