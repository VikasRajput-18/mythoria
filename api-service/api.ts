import axios from "axios";
import { FormTypes } from "../types";
import { ProfileFormTypes } from "../components/profile-form";

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

export const sendSignUpOtp = async ({
  email,
  password,
  name,
}: RegisterType) => {
  const response = await axios.post("/api/auth/sign-up-otp", {
    email,
    password,
    name,
  });

  return response.data;
};

export const register = async ({
  email,
  otp,
}: {
  email: string;
  password: string;
  name: string;
  otp: string;
}) => {
  // verify OTP
  const { data } = await axios.post(
    "/api/auth/register",
    { email, otp },
    { withCredentials: true }
  );
  return data;
};

export const logout = async () => {
  try {
    const response = await axios.post("/api/auth/logout");
    return response.data; // { message: "Logout Successful" }
  } catch (error: any) {
    throw error;
  }
};

// reset password

export const resetPassword = async ({
  email,
  password,
  otp,
}: LoginType & { otp: string }) => {
  try {
    const response = await axios.patch(
      "/api/auth/reset-password",
      {
        email,
        newPassword: password,
        otp,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
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

export const sendOtp = async ({ email }: { email: string }) => {
  try {
    const { data } = await axios.post("/api/auth/send-otp", { email });
    return data;
  } catch (error) {
    throw error;
  }
};

export const addStory = async (data: FormTypes) => {
  const response = await axios.post("/api/story/add", data, {
    withCredentials: true,
  });

  return response.data;
};

export const getMyStories = async (search: string, page: number = 1) => {
  try {
    const response = await axios.get(
      `/api/stories/my-stories?search=${search}&limit=10&page=${page}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
export const getAllStories = async (search: string, page: number = 1) => {
  try {
    const response = await axios.get(
      `/api/stories?search=${search}&limit=10&page=${page}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
export const getStoryById = async (id: string, isServer = false) => {
  const baseURL = isServer ? process.env.NEXT_PUBLIC_BASE_URL : "";

  const response = await axios.get(`${baseURL}/api/story/${id}`);
  return response.data;
};

export const deleteStory = async (id: number) => {
  try {
    const response = await axios.delete(`/api/story/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateStory = async (data: FormTypes) => {
  const response = await axios.put(`/api/story/${data?.id}`, data, {
    withCredentials: true,
  });

  return response.data;
};
export const likeStory = async (storyId: number) => {
  const response = await axios.post(
    `/api/story/${storyId}/like`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const addComment = async ({
  storyId,
  commentText,
}: {
  storyId: string;
  commentText: string;
}) => {
  const response = await axios.post(
    `/api/story/${storyId}/comment`,
    { commentText },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const getCommentsByStoryId = async (
  storyId: string,
  limit: number = 1,
  skip: number = 0
) => {
  const response = await axios.get(
    `/api/story/${storyId}/comment?limit=${limit}&skip=${skip}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const deleteComment = async ({
  storyId,
  commentId,
}: {
  storyId: number;
  commentId: number;
}) => {
  const response = await axios.delete(
    `/api/story/${storyId}/comment/${commentId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateProfile = async (data: ProfileFormTypes) => {
  const response = await axios.post(`/api/profile`, data, {
    withCredentials: true,
  });
  return response.data;
};
export const fetchAuthors = async (search: string) => {
  const response = await axios.get(`/api/authors`, {
    params: {
      search,
    },
  });
  return response.data;
};
export const fetchAuthorsWithId = async (id: string) => {
  const response = await axios.get(`/api/authors/${id}`);
  return response.data;
};
