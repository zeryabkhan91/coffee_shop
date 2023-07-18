import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import DealService from "../../services/modules/DealService";
import {
  useToast,
  Box,
  Spinner,
  Heading,
  Button,
  Flex,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Deal() {
  const [deals, setDeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchDeals = async () => {
    try {
      setLoading(true);

      const params = {
        currentPage,
        limit: 10,
      };

      const response = await DealService.getDeal(params);
      const { docs, totalPages } = response.data || {};
      setDeals(docs);
      setTotalPages(totalPages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while fetching deals",
        status: "error",
      });
      console.error("Error fetching deals:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleDeleteDeal = async (dealId) => {
    try {
      await DealService.deleteDeal(dealId);

      setCurrentPage(1);
      fetchDeals();
      toast({
        title: "Deal deleted",
        description: "The Deal has been deleted successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      console.log(`Deleted deal with ID: ${dealId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while deleting deal",
        status: "error",
      });
      console.error("Error deleting deal:", error);
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
    { label: "ID", value: "_id" },
    { label: "Item", value: "item_name" },
    { label: "Item Addon", value: "item_discount_name" },
    { label: "Percentage", value: "discount" },
    { label: "Discount Type", value: "discount_type" },
    { label: "Max Amount", value: "discount_max_amount" },
  ];

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        mt={8}
        mx={8}
      >
        <Heading as="h2" size="lg">
          Deal List
        </Heading>

        <Link as={RouterLink} to="/create-deal">
          <Button colorScheme="blue" size="sm">
            Create Deal
          </Button>
        </Link>
      </Flex>
      {loading ? (
        <Box p={4} textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          <Table
            data={deals}
            headers={headers}
            showAction
            onDelete={handleDeleteDeal}
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

export default Deal;
