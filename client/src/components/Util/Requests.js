import { API_BASE_URL } from "../../constants";
import axios from "axios";

export const getCartId = async () => {
  const data = await axios
    .get(`${API_BASE_URL}/cart/getId`)
    .then((response) => response.data);
  return data;
};

export const login = async (user) => {
  const data = await axios
    .post(`${API_BASE_URL}/auth/signin`, user)
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => ({ success: false, error }));
  return data;
};

export const getCurrentUser = async (customerId, accessToken) => {
  if (!accessToken) return {};
  const data = await axios
    .get(`${API_BASE_URL}/customer/${customerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log("Not logged in"));
  return data;
};

export const getAllItems = async () => {
  const data = await axios
    .get(`${API_BASE_URL}/product`)
    .then((response) => response.data);
  return data;
};

export const getItemByDepartment = async (department) => {
  const data = await axios
    .get(`${API_BASE_URL}/product?department=${department}`)
    .then((response) => response.data);
  return data;
};

export const getItemBySearch = async (search) => {
  const data = await axios
    .get(`${API_BASE_URL}/product?search=${search}`)
    .then((response) => response.data);
  return data;
};

export const getItemByFilter = async (filter) => {
  let query = "";
  if (filter && filter["search"]) {
    query += "search" + filter["search"];
  }
  if (filter && filter["department"]) {
    query += "department" + filter["department"];
  }
  const data = await axios
    .get(`${API_BASE_URL}/product?${query}`)
    .then((response) => response.data);
  return data;
};

export const getItemById = async (id) => {
  const data = await axios
    .get(`${API_BASE_URL}/product/${id}`)
    .then((response) => response.data);
  return data;
};

export const getAllItemsInCart = async (cartId) => {
  const data = await axios
    .get(`${API_BASE_URL}/cart/${cartId}`)
    .then((response) => response.data);
  return data;
};

export const addItemToCart = async (cartItem) => {
  const data = await axios
    .post(`${API_BASE_URL}/cart`, cartItem)
    .then((response) => response.data);
  return data;
};

export const updateItemInCart = async (cartItem) => {
  const data = await axios
    .put(`${API_BASE_URL}/cart/${cartItem.cartId}`, cartItem)
    .then((response) => response.data);
  return data;
};

export const deleteItemInCart = async (cartId, productId) => {
  const data = await axios
    .delete(`${API_BASE_URL}/cart/${cartId}/${productId}`)
    .then((response) => response.data);
  return data;
};

export const deleteAllItemsInCart = async (cartId) => {
  const data = await axios
    .delete(`${API_BASE_URL}/cart/cart/${cartId}`)
    .then((response) => response.data);
  return data;
};

export const register = async (customer) => {
  const data = await axios
    .post(`${API_BASE_URL}/auth/register`, customer)
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => ({ success: false, error }));
  return data;
};

export const updateCustomer = async (customer, accessToken) => {
  const data = await axios
    .patch(`${API_BASE_URL}/customer`, customer, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => ({ success: false, error }));
  return data;
};

// favourite

export const getAllItemsInFavourite = async (customerId, accessToken) => {
  const data = await axios
    .get(`${API_BASE_URL}/favourite/${customerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
  return data;
};

export const getItemInFavourite = async (
  customerId,
  productId,
  accessToken
) => {
  const data = await axios
    .get(`${API_BASE_URL}/favourite/${customerId}/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
  return data;
};
export const addItemToFavourite = async (favouriteItem, accessToken) => {
  const data = await axios
    .post(`${API_BASE_URL}/favourite`, favouriteItem, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
  return data;
};

export const deleteItemInFavourite = async (
  customerId,
  productId,
  accessToken
) => {
  const data = await axios
    .delete(`${API_BASE_URL}/favourite/${customerId}/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
  return data;
};

export const deleteAllItemsInFavourite = async (customerId) => {
  const data = await axios
    .delete(`${API_BASE_URL}/favourite/${customerId}/all`)
    .then((response) => response.data);
  return data;
};

// order
export const addNewOrder = async (shipment) => {
  const data = await axios
    .post(`${API_BASE_URL}/order`, shipment)
    .then((response) => response.data);
  return data;
};

export const getOrders = async (customerId) => {
  const data = await axios
    .get(`${API_BASE_URL}/order?customerId=${customerId}`)
    .then((response) => response.data);
  return data;
};
