import axios from "./axios";

export interface ReadTemplateResponse {
  html: string;
  text: string;
  messages: string[];
}

export const readTemplate = async (file: File) => {
  const formData = new FormData();

  formData.append("template", file);

  const response = await axios.post<ReadTemplateResponse>(
    "/api/document-generator/read-template",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};