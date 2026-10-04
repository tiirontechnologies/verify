/**
 * Utility to reliably replace template mustache placeholders with student data.
 * Supports case insensitivity, surrounding whitespace (e.g. {{ studentName }}),
 * and all variable name variations.
 */
export function replaceTemplatePlaceholders(text: string, studentData: any): string {
  if (!text || typeof text !== "string") return text || "";
  if (!studentData) return text;

  const formatDate = (val: any) => {
    if (!val) return "";
    const strVal = String(val).trim();
    if (!strVal) return "";
    // If already formatted like "02 August 2026", return directly
    if (/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/.test(strVal)) return strVal;

    const d = new Date(val);
    return isNaN(d.getTime())
      ? strVal
      : d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  };

  const nameVal = studentData.studentName || studentData.fullName || studentData.name || "";
  const emailVal = studentData.email || studentData.emailAddress || "";
  const courseVal = studentData.course || studentData.courseName || studentData.program || "";
  const roleVal = studentData.role || studentData.designation || studentData.position || "";
  const certIdVal = studentData.certificateId || studentData.certId || studentData.id || "";
  const issueDateVal = formatDate(studentData.issueDate);
  const startDateVal = formatDate(studentData.startDate);
  const endDateVal = formatDate(studentData.endDate);
  const orgVal =
    studentData.organization ||
    studentData.organizationName ||
    studentData.college ||
    studentData.company ||
    "";
  const mentorVal = studentData.mentor || studentData.mentorName || "";
  const directorVal = studentData.director || studentData.directorName || "";

  let res = text;

  // Student Name
  res = res.replace(
    /\{\{\s*(studentName|student_name|student\s+name|name|fullName|full_name)\s*\}\}/gi,
    nameVal
  );

  // Email
  res = res.replace(
    /\{\{\s*(email|studentEmail|student_email|emailAddress|email_address)\s*\}\}/gi,
    emailVal
  );

  // Course / Program
  res = res.replace(
    /\{\{\s*(course|courseName|course_name|course\s+name|program|programName)\s*\}\}/gi,
    courseVal
  );

  // Role / Designation
  res = res.replace(
    /\{\{\s*(role|designation|position|jobTitle|job_title)\s*\}\}/gi,
    roleVal
  );

  // Certificate ID
  res = res.replace(
    /\{\{\s*(certificateId|certificate_id|certificate\s+id|certId|cert_id)\s*\}\}/gi,
    certIdVal
  );

  // Issue Date
  res = res.replace(
    /\{\{\s*(issueDate|issue_date|issue\s+date)\s*\}\}/gi,
    issueDateVal
  );

  // Start Date
  res = res.replace(
    /\{\{\s*(startDate|start_date|start\s+date)\s*\}\}/gi,
    startDateVal
  );

  // End Date
  res = res.replace(
    /\{\{\s*(endDate|end_date|end\s+date)\s*\}\}/gi,
    endDateVal
  );

  // Organization
  res = res.replace(
    /\{\{\s*(organization|organizationName|organization_name|organization\s+name|college|company)\s*\}\}/gi,
    orgVal
  );

  // Mentor
  res = res.replace(
    /\{\{\s*(mentor|mentorName|mentor_name|mentor\s+name)\s*\}\}/gi,
    mentorVal
  );

  // Director
  res = res.replace(
    /\{\{\s*(director|directorName|director_name|director\s+name)\s*\}\}/gi,
    directorVal
  );

  return res;
}

/**
 * Recursively processes Fabric JSON objects to replace placeholders in all text objects.
 */
export function processFabricCanvasObjects(objects: any[], studentData: any): void {
  if (!objects || !Array.isArray(objects)) return;

  objects.forEach((obj) => {
    if (obj.text && typeof obj.text === "string") {
      obj.text = replaceTemplatePlaceholders(obj.text, studentData);
    }
    if (obj.objects) {
      processFabricCanvasObjects(obj.objects, studentData);
    }
  });
}
