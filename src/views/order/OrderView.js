import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import OrderList from "../../components/OrderList";
import OrderService from "../../services/modules/OrderService";
import { useToast, Box, Spinner, Heading, Button, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

function Order() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { socket, newUser, userId } = useSocket();
  const toast = useToast();

  useEffect(() => {
    newUser();
    socket.on("notification", ({ data }) => {
      if (data.userId === userId) {
        fetchOrders();
      }
    });
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const params = {
        currentPage,
        limit: 10,
      };

      const response = await OrderService.getOrders(params);
      const { docs, totalPages } = response.data || {};
      setOrders(docs);
      setTotalPages(totalPages);

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while fetching orders",
        status: "error",
        duration: 1000,
        isClosable: true
      });
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleDeleteOrder = async (orderId) => {
    try {
      await OrderService.deleteOrder(orderId);

      setCurrentPage(1);
      fetchOrders();
      toast({
        title: "Order deleted",
        description: "The order has been deleted successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const headers = [
    { label: "Order ID", value: "_id" },
    { label: "Order Status", value: "status" },
    { label: "Total Amount", value: "totalAmount" },
  ];

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={4} mt={8} mx={8}>
        <Heading as="h2" size="lg">
          Order List
        </Heading>
        <Link as={RouterLink} to="/create-order">
          <Button colorScheme="blue" size="sm">
            Create Order
          </Button>
        </Link>
      </Flex>
      {loading ? (
        <Box p={4} textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          <OrderList
            orders={orders}
            headers={headers}
            showAction
            onDelete={handleDeleteOrder}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </>
      )}
    </>
  );
}

export default Order;
