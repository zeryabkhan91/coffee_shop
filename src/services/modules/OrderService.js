import { AuthorizedService } from "..";

const orderService = AuthorizedService("/orders");

class OrderService {
  static getOrders(params) {
    return orderService({
      method: "GET",
      url: "/",
      params,
    });
  }

  static addNewOrder(data) {
    return orderService({
      method: "POST",
      url: "/",
      data,
    });
  }
}

export default OrderService;
