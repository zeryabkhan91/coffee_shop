import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Collapse,
} from "@chakra-ui/react";

const OrderList = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const handleRowClick = (orderId) => {
    setExpandedOrderId((prevExpandedOrderId) =>
      prevExpandedOrderId === orderId ? null : orderId
    );
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Order ID</Th>
          <Th>Order Status</Th>
          <Th>Total Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <React.Fragment key={order._id}>
            <Tr className="cursor-pointer" onClick={() => handleRowClick(order._id)}>
              <Td>{order._id}</Td>
              <Td>{order.status}</Td>
              <Td>{order.totalAmount}</Td>
            </Tr>
            <Tr>
              <Td colSpan={3}>
                <Collapse in={expandedOrderId === order._id} animateOpacity>
                  <Box p={4}>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Product Name</Th>
                          <Th>Quantity</Th>
                          <Th>Price</Th>
                          <Th>Discount</Th>
                          <Th>Discounted Price</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {order.order_items.map((item) => (
                          <Tr key={item._id}>
                            <Td>{item.productName}</Td>
                            <Td>{item.quantity}</Td>
                            <Td>{item.price}</Td>
                            <Td>{item.discount}</Td>
                            <Td>{item.discountedPrice}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </Collapse>
              </Td>
            </Tr>
          </React.Fragment>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrderList;
