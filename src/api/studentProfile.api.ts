import axios from "./axios";

export const getMyProfile = async () => {
  const response = await axios.get("/api/student-profile/my");
  return response.data;
};

export const updateProfile = async (profileData: any) => {
  const response = await axios.put("/api/student-profile/update", profileData);
  return response.data;
};