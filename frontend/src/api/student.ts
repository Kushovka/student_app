import axios from "axios";
import type { NotifyPayload, StudentResponce } from "../types/student.type";

const api = axios.create({
  baseURL: "http://localhost:8001/",
});

interface CreateStudent {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  grade: number;
  class_letter: string;
}

export const getStudents = async (
  grade?: number,
  class_letter?: string,
): Promise<StudentResponce[]> => {
  const { data } = await api.get("student/", {
    params: { grade, class_letter },
  });
  console.log(data);
  return data;
};

export const createStudents = async (payload: CreateStudent) => {
  const { data } = await api.post("student/", payload);
  return data;
};

export const getStudentById = async (
  studentId: string,
): Promise<StudentResponce> => {
  const { data } = await api.get(`student/${studentId}`);

  return data;
};

export const notifyStudent = async (
  studentId: string,
  payload: NotifyPayload,
) => {
  const { data } = await api.post(`student/${studentId}/notify`, payload);

  return data;
};
