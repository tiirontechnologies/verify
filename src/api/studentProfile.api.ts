import axios from "./axios";

export const getMyProfile = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    "/api/student-profile/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateProfile = async (
  profileData: any
) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    "/student-profile/update",
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};