import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import ProductService from "../../services/modules/ProductService";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    price: 1,
    discount_type: "percentage",
    discount: 0,
    discount_max_amount: 0,
  });
  const toast = useToast();
  const navigate = useNavigate();
  const { userId } = useSocket();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (product.discount_type === "percentage" && product.discount > 100) {
      toast({
        title: "Invalid Discount",
        description: "Discount percentage cannot exceed 100%.",
        status: "error",
        duration: 700,
        isClosable: true,
      });
      return;
    }

    if (product.discount_type === "amount" && product.discount > product.price) {
      toast({
        title: "Invalid Discount",
        description: "Discount amount cannot exceed the product price.",
        status: "error",
        duration: 700,
        isClosable: true,
      });
      return;
    }


    if (product.discount < 0 || product.discount_max_amount < 0) {
      toast({
        title: "Invalid Input",
        description: "Discount or Discount max amount cannot be less than 0.",
        status: "error",
        duration: 700,
        isClosable: true,
      });
      return
    }

    if (product.price < 1) {
      toast({
        title: "Invalid Amount",
        description: "Price cannot be less than 1.",
        status: "error",
        duration: 700,
        isClosable: true,
      });
      return; 
    }

    try {
      await ProductService.addNewProduct({ ...product, userId });

      toast({
        title: "Product added",
        description: "The product has been added successfully.",
        status: "success",
        duration: 700,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      console.log("Error while adding product", error);

      if (error?.response) {
        const { data } = error?.response;

        toast({
          title: "Wrong Payload",
          description: data.message,
          status: "error",
          duration: 700,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Product insertion",
        description: "Something went wrong while adding product.",
        status: "error",
        duration: 700,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} bg="white" shadow="md">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            inputMode="numeric"
            pattern="[0-9]*"
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Discount Type</FormLabel>
          <Select
            value={product.discount_type}
            onChange={(e) =>
              setProduct({ ...product, discount_type: e.target.value })
            }
          >
            <option value="percentage">Percentage</option>
            <option value="amount">Amount</option>
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Discount</FormLabel>
          <Input
            type="number"
            value={product.discount}
            onChange={(e) =>
              setProduct({ ...product, discount: e.target.value })
            }
            inputMode="numeric"
            pattern="[0-9]*"
            max={product.discount_type === "percentage" ? 100 : product.price}
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default CreateProduct;
