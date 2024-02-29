import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

function Homepage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const getBlogs = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/blogs?page=${pageNumber}`
      );
      setBlogs(response.data.msg);
      if(response.data.msg.length==0){
        setPage(1)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlogs(page);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Navbar />
      <Box>
        {blogs.map((el) => {
          return <BlogCard key={el._id} blog={el} />;
        })}
        <Box mt={4} textAlign="center">
          <Button onClick={handlePrevPage} disabled={page === 1}>
            Previous Page
          </Button>
          <Button ml={2} onClick={handleNextPage}>
            Next Page
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Homepage;
