import { Flex, Button, useColorModeValue } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  const prevButtonColor = useColorModeValue('blue', 'blue.200');
  const nextButtonColor = useColorModeValue('blue', 'blue.200');

  return (
    <Flex mt={4} justifyContent="center">
      <Button
        mx={2}
        disabled={currentPage === 1}
        onClick={onPrevPage}
        colorScheme={currentPage > 1 ? prevButtonColor : undefined}
      >
        Prev
      </Button>
      <Button
        mx={2}
        disabled={currentPage === totalPages}
        onClick={onNextPage}
        colorScheme={currentPage < totalPages ? nextButtonColor : undefined}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
