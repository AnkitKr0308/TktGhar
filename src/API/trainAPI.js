import conf from "../conf/conf";
import { getAuthHeaders } from "./authAPI";

const baseURL = `${conf.train_tktghar_api_url}/api/trains`;

export const fetchGetAvailableTrains = async ({ from, to, date }) => {
  try {
    const response = await fetch(
      `${baseURL}/trains?from=${from}&to=${to}&date=${date}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );
    const result = await response.json();
    if (response.ok) {
      return { success: true, data: result.data };
    }
  } catch (e) {
    console.error("Unable to get available trains", e);
    return {
      success: false,
      message: e.message || "Unable to get available trains",
    };
  }
};
