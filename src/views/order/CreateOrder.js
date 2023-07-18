import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  Input,
  useToast,
  Text,
} from "@chakra-ui/react";
import ProductService from "../../services/modules/ProductService";
import OrderService from "../../services/modules/OrderService";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

const CreateOrder = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();
  const navigate = useNavigate();
  const { userId } = useSocket();

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProduct();
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = () => {
    if (!selectedProduct) {
      toast({
        title: "No Product Selected",
        description: "Please select a product before adding to cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const item = products.find((product) => product._id === selectedProduct);

    if (!item) {
      toast({
        title: "Product Not Found",
        description: "The selected product does not exist.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const cartItem = cart.find((item) => item._id === selectedProduct);

    if (cartItem) {
      toast({
        title: "Product Already in Cart",
        description: "The selected product is already in the cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newItem = { ...item, quantity };
    setCart([...cart, newItem]);
    setSelectedProduct("");
    setQuantity(1);
  };

  const handlePlaceOrder = async () => {
    try {
      await OrderService.addNewOrder({ orders: cart, userId });

      navigate('/orders')
    } catch(error) {
      console.log("Something went wrong while creating order", error)
      toast({
        title: "Place Order Error",
        description: "Something went wrong while creating order",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  } 

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} bg="white" shadow="md">
      <FormControl>
        <FormLabel>Select a Product</FormLabel>
        <Select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Quantity</FormLabel>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min={1}
        />
      </FormControl>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleAddToCart}
        disabled={!selectedProduct}
      >
        Add to Cart
      </Button>

      <Box mt={8}>
        {cart.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                      min={1}
                    />
                  </td>
                  <td>
                    <Button
                      colorScheme="red"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Text>No items in the cart</Text>
        )}

        {!!cart.length && (
          <Button
            mt={4}
            colorScheme="blue"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CreateOrder;
