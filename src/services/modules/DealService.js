import { AuthorizedService } from "..";

const dealService = AuthorizedService("/deal");

class DealService {
  static getDeal(params) {
    return dealService({
      method: "GET",
      url: "/",
      params,
    });
  }

  static addNewDeal(data) {
    return dealService({
      method: "POST",
      url: "/",
      data,
    });
  }

  static deleteDeal(id) {
    return dealService({
      method: "DELETE",
      url: `/${id}`,
    });
  }
}

export default DealService;
