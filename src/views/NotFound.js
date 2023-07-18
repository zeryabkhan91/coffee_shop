import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={4}>
        Oops! Page Not Found
      </Heading>
      <Text fontSize="lg" mb={4}>
        The page you are looking for does not exist.
      </Text>
      <Button
        as={RouterLink}
        to="/"
        colorScheme="blue"
        size="lg"
        fontWeight="bold"
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
