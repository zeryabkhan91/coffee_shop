import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import DealService from "../../services/modules/DealService";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/modules/ProductService";
import { useSocket } from "../../hooks/useSocket";

const CreateDeal = () => {
  const [deal, setDeal] = useState({
    item_id: "",
    item_discount_id: "",
    discount: 0,
    discount_type: "percentage",
    discount_max_amount: 0,
  });
  const [availableItems, setAvailableItems] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { userId } = useSocket();

  const fetchItems = async () => {
    try {
      const response = await ProductService.getAllProduct();
      const { products } = response.data;
      setAvailableItems(products);
    } catch (error) {
      console.log("Error while fetching items", error);
      toast({
        title: "Item Fetching Error",
        description: "Something went wrong while fetching items.",
        status: "error",
        duration: 700,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (deal.item_discount_id === deal.item_id) {
        toast({
          title: "Invalid Input",
          description: "Please select different item for addon.",
          status: "error",
          duration: 700,
          isClosable: true,
        });
        return
      }

      if (deal.discount < 0 || deal.discount_max_amount < 0) {
        toast({
          title: "Invalid Input",
          description: "Discount or Discount max amount cannot be less than 0.",
          status: "error",
          duration: 700,
          isClosable: true,
        });
        return
      }

      await DealService.addNewDeal({ ...deal, userId });

      toast({
        title: "Deal added",
        description: "The deal has been added successfully.",
        status: "success",
        duration: 700,
        isClosable: true,
      });

      navigate("/deals");
    } catch (error) {
      console.log("Error while adding deal", error);

      if (error?.response) {
        const { data } = error?.response;

        toast({
          title: "Wrong Payload",
          description: data.message,
          status: "error",
          duration: 700,
          isClosable: true,
        }); 
        return
      }

      toast({
        title: "Deal insertion",
        description: "Something went wrong while adding the deal.",
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
          <FormLabel>Item</FormLabel>
          <Select
            value={deal.item_id}
            onChange={(e) => setDeal({ ...deal, item_id: e.target.value })}
            required
          >
            <option value="">Select an item</option>
            {availableItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Addon</FormLabel>
          <Select
            value={deal.item_discount_id}
            onChange={(e) =>{
              const selectedAddon = availableItems.find(
                (item) => item._id === e.target.value
              ); 

              setDeal({
                ...deal,
                item_discount_id: e.target.value,
                price: selectedAddon.price,
              })}
            }
            required
          >
            <option value="">Select an addon</option>
            {availableItems.map((addon) => (
              <option key={addon._id} value={addon._id}>
                {addon.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Discount</FormLabel>
          <Input
            type="number"
            value={deal.discount}
            onChange={(e) => setDeal({ ...deal, discount: e.target.value })}
            inputMode="numeric"
            pattern="[0-9]*"
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Discount Type</FormLabel>
          <Select
            value={deal.discount_type}
            onChange={(e) =>
              setDeal({ ...deal, discount_type: e.target.value })
            }
          >
            <option value="percentage">Percentage</option>
            <option value="amount">Amount</option>
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Maximum Discount Amount</FormLabel>
          <Input
            type="number"
            value={deal.discount_max_amount}
            onChange={(e) =>
              setDeal({ ...deal, discount_max_amount: e.target.value })
            }
            inputMode="numeric"
            pattern="[0-9]*"
            required
            max={deal.discount_type === "percentage" ? 100 : deal.price}
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Add Deal
        </Button>
      </form>
    </Box>
  );
};

export default CreateDeal;
