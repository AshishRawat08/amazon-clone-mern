import { getProductsreducers } from "./Productreducers";
import { combineReducers } from "redux";

const rootreducers = combineReducers({
  getproductsdata: getProductsreducers,
});

export default rootreducers;
