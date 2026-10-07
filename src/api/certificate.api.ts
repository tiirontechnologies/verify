import axios from "./axios"
import { documentTemplateApi } from "./documentTemplateApi";

const normalizeTemplateType = (value?: string) => {
  const normalized = (value || "").toLowerCase().trim().replace(/[\s_]+/g, "-");
  return normalized
    .replace(/-certificate$/, "")
    .replace(/-document$/, "");
};

function toFabricData(template: any) {
  if (!template || typeof template !== "object") return null;

  const explicitDesignData =
    template.template?.design?.data ??
    template.design?.data ??
    template.templateData?.design?.data ??
    (template.templateData?.objects ? template.templateData : null) ??
    template.data?.design?.data;
  const data =
    explicitDesignData ??
    template.templateData ??
    template.design ??
    template;

  // Fabric pages may intentionally be blank. The objects array is the
  // important signal that this is saved canvas JSON; a background image is optional.
  if (!data || typeof data !== "object") return null;
  const hasCanvasData = Boolean(explicitDesignData) || Array.isArray(data.objects) ||
    Boolean(data.backgroundImage) ||
    (Number(data.width) > 0 && Number(data.height) > 0);
  if (!hasCanvasData) return null;
  if (!Array.isArray(data.objects) && !data.backgroundImage) {
    data.objects = [];
  }

  const orientation =
    template.orientation ||
    template.design?.orientation ||
    template.template?.design?.orientation ||
    data.orientation ||
    (Number(data.height) > Number(data.width) ? "portrait" : "landscape");

  return { ...data, orientation };
}

export async function getCertificateTemplateData(certificate: any) {
  const embedded = toFabricData(certificate);
  if (embedded) return embedded;

  const templateReference =
    (typeof certificate?.template === "string" ? certificate.template : null) ||
    certificate?.template?._id ||
    certificate?.template?.id ||
    certificate?.templateId ||
    certificate?.documentTemplateId ||
    certificate?.certificateTemplateId;

  if (templateReference) {
    try {
      const response = await documentTemplateApi.getTemplateById(
        String(templateReference),
      );
      const resolved = toFabricData(response.data?.template ?? response.data);
      if (resolved) return resolved;
    } catch (error) {
      console.error("Failed to load assigned certificate template:", error);
    }
    // A broken explicit assignment must not silently substitute a different default.
    return null;
  }

  const certificateType = normalizeTemplateType(certificate?.certificateType || certificate?.type);
  if (!certificateType) return null;

  try {
    const response = await documentTemplateApi.getTemplates();
    const payload = response.data?.templates ?? response.data;
    const templates = Array.isArray(payload) ? payload : [];
    const matchingTemplates = templates.filter(
      (template: any) =>
        normalizeTemplateType(template.documentType) === certificateType &&
        (!template.status || template.status === "active"),
    );
    const defaultTemplate = matchingTemplates.find(
      (template: any) => template.isDefault || template.default,
    );
    const candidate = defaultTemplate ||
      (matchingTemplates.length === 1 ? matchingTemplates[0] : null);

    return toFabricData(candidate);
  } catch (error) {
    console.error("Failed to find assigned certificate template:", error);
    return null;
  }
}

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
