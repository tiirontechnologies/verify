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

  const payload = response.data;

  if (payload?.success === false) {
    const error: any = new Error(
      payload?.message || "Certificate not found"
    );
    error.response = {
      status: 404,
      data: payload,
    };
    throw error;
  }

  return payload;
};