import conf from "../conf/conf";
import { getAuthHeaders } from "./authAPI";

const baseURL = `${conf.train_tktghar_api_url}/api/station`;

export const fetchGetStations = async () => {
  try {
    const response = await fetch(`${baseURL}/stations`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result.stations };
    }
  } catch (e) {
    console.error("Unable to get stations", e);
    return { success: false, message: e.message || "Unable to get stations" };
  }
};
