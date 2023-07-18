import { Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./views/product/ProductList";
import Header from "./components/shared/Header";
import NotFound from "./views/NotFound";
import Deal from "./views/deals/DealList";
import CreateProduct from "./views/product/CreateProduct";
import CreateDeal from "./views/deals/CreateDeal";
import CreateOrder from "./views/order/CreateOrder";
import Order from "./views/order/OrderView";
import { useSocket } from "./hooks/useSocket";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

function App() {
  const { socket, newUser, userId } = useSocket();
  const toast = useToast();

  useEffect(() => {
    newUser();
    socket.on("notification", ({ data }) => {
      if (data.userId === userId) {
        toast({
          title: "Order Updated",
          description: `Your order with id ${data._id} has been updated. Status: ${data.status}`,
          status: "success"
        });
      }
    });
  }, []);


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products" element={<Product />} />
        <Route path="/add-product" element={<CreateProduct />} />
        <Route path="/create-deal" element={<CreateDeal />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/deals" element={<Deal />} />
        <Route path="/orders" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
