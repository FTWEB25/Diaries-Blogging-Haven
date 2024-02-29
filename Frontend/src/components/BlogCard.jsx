import React, { useState } from "react";
import { Box, Image, Badge, Text, Button } from "@chakra-ui/react";

function BlogCard({ blog }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescriptionPreview = () => {
    return blog.description.slice(0, 150) + "..."; // Show first 150 characters
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      border={"2px solid black"}
      width={"60%"}
      margin="10px auto"
    >
      <Image width={"50%"} margin={"auto"} src={`http://localhost:8080/blogs/images/${blog.image}`} alt={blog.title} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {blog.category}
          </Badge>
          <Text fontSize="sm" color="gray.500" ml={2}>
            {new Date(blog.createdAt).toLocaleDateString()}
          </Text>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {blog.title}
        </Box>
        <Text mt={2} color="gray.600" fontSize="sm">
          {showFullDescription ? blog.description : getDescriptionPreview()}
          <Button
            colorScheme="teal"
            variant="link"
            size="sm"
            onClick={toggleDescription}
            mt={2}
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </Button>
        </Text>
      </Box>
    </Box>
  );
}

export default BlogCard;
