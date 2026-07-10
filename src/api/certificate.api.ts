import axios from "./axios"
export const getMyCertificate = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "/certificates/my",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const verifyCertificate = async (
  certificateId: string
) => {

  const response = await axios.get(
    `/certificates/verify/${certificateId}`
  );

  return response.data;
};