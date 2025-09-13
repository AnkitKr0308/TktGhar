import conf from "../conf/conf";

const baseURL = `${conf.train_tktghar_api_url}/api/users`;

export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt_token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
};

export const fetchRegisterAccount = async (data) => {
  try {
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result.user, message: result.message };
    } else {
      return {
        success: false,
        errors: result.errors || null,
        message: result.message || "Registration failed",
      };
    }
  } catch (e) {
    console.error("Error in fetchRegisterAccount", e);
    return { success: false, message: e.message || "Registration failed" };
  }
};

export const fetchLogin = async (data) => {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: { token: result.token, user: result.user },
        message: result.message,
      };
    } else {
      return { success: false, message: result.message || "Login failed" };
    }
  } catch (e) {
    console.error("Error in fetchLogin", e);
    return { success: false, message: e.message || "Login failed" };
  }
};
