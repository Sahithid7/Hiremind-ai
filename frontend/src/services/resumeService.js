import { api } from "./api";

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/resume/upload", formData);
  return data;
}

export async function fetchResumes() {
  const { data } = await api.get("/resume");
  return data;
}

export async function fetchResume(resumeId) {
  const { data } = await api.get(`/resume/${resumeId}`);
  return data;
}
