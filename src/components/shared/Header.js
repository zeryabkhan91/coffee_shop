import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="gray.200" py={4}>
      <Flex justifyContent="left" alignItems="center">
        <Heading as="h1" size="lg" fontWeight="bold" color="blue.800" ml={8}>
          My App
        </Heading>
        <Flex>
          <Link
            as={RouterLink}
            to="/"
            mx={4}
            fontWeight="medium"
            fontSize="xl"
            color="gray.700"
            _hover={{ color: 'blue.600' }}
            _focus={{ outline: 'none' }}
          >
            Products
          </Link>
          <Link
            as={RouterLink}
            to="/deals"
            mx={4}
            fontWeight="medium"
            fontSize="xl"
            color="gray.700"
            _hover={{ color: 'blue.600' }}
            _focus={{ outline: 'none' }}
          >
            Deals
          </Link>
          <Link
            as={RouterLink}
            to="/orders"
            mx={4}
            fontWeight="medium"
            fontSize="xl"
            color="gray.700"
            _hover={{ color: 'blue.600' }}
            _focus={{ outline: 'none' }}
          >
            Orders
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
