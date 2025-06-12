import axios from "axios";

interface LoginType {
  email: string;
  password: string;
}

interface RegisterType extends LoginType {
  name: string;
}

export const login = async ({ email, password }: LoginType) => {
  const response = await axios.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async ({ email, password, name }: RegisterType) => {
  const response = await axios.post("/api/auth/register", {
    email,
    password,
    name,
  });

  return response.data;
};

export const logout = async () => {
  try {
    const response = await axios.post("/api/auth/logout");
    return response.data; // { message: "Logout Successful" }
  } catch (error: any) {
    throw error;
  }
};
// api-service/api.ts
export const getCurrentUser = async () => {
  try {
    const response = await axios("/api/me", { withCredentials: true });
    return response?.data;
  } catch (err) {
    return { user: null }; // fallback if user is not logged in
  }
};
