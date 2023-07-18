import {
  Box,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";

const Table = ({ headers, data, showAction, onDelete }) => {
  const getColumnValue = (item, value) => {
    if (typeof value === "function") {
      return value(item);
    }
    return item[value];
  };

  return (
    <Box p={4}>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            {headers?.map((header) => (
              <Th key={header.value}>{header.label}</Th>
            ))}
            {showAction && <Th>Action</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(data) && data.length ? (
            data.map((item) => (
              <Tr key={item._id}>
                {headers.map((header) => (
                  <Td key={item._id + `${header.value}`}>
                    {getColumnValue(item, header.value)}
                  </Td>
                ))}
                {showAction && (
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => onDelete && onDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </Td>
                )}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td>No data available.</Td>
            </Tr>
          )}
        </Tbody>
      </ChakraTable>
    </Box>
  );
};

export default Table;
