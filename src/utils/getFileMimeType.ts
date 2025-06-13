const getFileMimeType = (name: string | undefined) => {
  const ext = name?.split(".")?.pop()?.toLowerCase();
  const map = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return map[ext as keyof typeof map] || "application/octet-stream";
};

export default getFileMimeType;