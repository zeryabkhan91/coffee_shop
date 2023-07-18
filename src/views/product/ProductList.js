import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import ProductService from "../../services/modules/ProductService";
import { useToast, Box, Spinner, Heading, Button, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {
        currentPage,
        limit: 10,
      };

      const response = await ProductService.getProduct(params);
      const { docs, totalPages } = response.data || {};
      setProducts(docs);
      setTotalPages(totalPages);

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while fetching products",
        status: "error",
      });
      console.error("Error fetching products:", error);
    }
    setLoading(false);

  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleDeleteProduct = async (productId) => {
    try {
      await ProductService.deleteProduct(productId);

      setCurrentPage(1);
      fetchProducts();
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while deleting products",
        status: "error",
      });
      console.error("Error deleting product:", error);
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
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Tax (%)", value: "tax_rate" },
    { label: "Discount", value: "discount" },
    { label: "Discount Type", value: "discount_type" },
  ];

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={4} mt={8} mx={8}>
        <Heading as="h2" size="lg">
          Product List
        </Heading>
        <Link as={RouterLink} to="/add-product">
          <Button colorScheme="blue" size="sm">
            Create Product
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
            data={products}
            headers={headers}
            showAction
            onDelete={handleDeleteProduct}
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

export default Product;
