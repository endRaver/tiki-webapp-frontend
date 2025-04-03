import api from "./Api";

export const getProductList = async ()=> {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Product:", error);
    throw error;
  }
};


