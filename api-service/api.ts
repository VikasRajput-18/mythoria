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

// api-service/api.ts
export const getCurrentUser = async () => {
  const response = await axios("/api/me", { withCredentials: true });
  return response?.data;
};
