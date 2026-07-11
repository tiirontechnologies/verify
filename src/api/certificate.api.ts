import axios from "./axios"
export const getMyCertificate = async () => {
    const response = await axios.get(
        "/api/certificates/my",
        // {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // }
    );

    return response.data;
};

export const verifyCertificate = async (
  certificateId: string
) => {

  const response = await axios.get(
    `/api/certificates/verify/${certificateId}`
  );

  return response.data;
};