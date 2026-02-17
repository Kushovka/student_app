import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { getStudentById, notifyStudent } from "../api/student";
import type { StudentResponce } from "../types/student.type";

interface Props {
  studentId: string;
  onClose: () => void;
}

const StudentModal = ({ studentId, onClose }: Props) => {
  const [student, setStudent] = useState<StudentResponce | null>(null);

  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      const data = await getStudentById(studentId);
      setStudent(data);
    };

    fetchStudent();
  }, [studentId]);

  const handleSend = async () => {
    try {
      setLoading(true);

      await notifyStudent(student.id, {
        subject,
        message: reason,
      });

      setSuccess(true);
      setSubject("");
      setReason("");
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки");
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-xl w-[420px] flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {student.last_name} {student.first_name}
          </h2>
          <button onClick={onClose}>
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <p>
            <span className="font-medium">Отчество:</span> {student.middle_name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {student.email}
          </p>
          <p>
            <span className="font-medium">Класс:</span> {student.grade}
            {student.class_letter}
          </p>
        </div>
        <div className="border-t pt-5 flex flex-col gap-4">
          <h3 className="font-semibold text-sm text-zinc-700">
            Отправить уведомление
          </h3>

          {/* Предмет */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Выберите предмет</option>
            <option value="Математика">Математика</option>
            <option value="Русский язык">Русский язык</option>
            <option value="История">История</option>
          </select>

          {/* Причина */}
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Выберите причину</option>
            <option value="Плохое поведение">Плохое поведение</option>
            <option value="Забыл тетрадь">Забыл тетрадь</option>
            <option value="Не сделал домашку">Не сделал домашку</option>
          </select>

          <button
            disabled={!subject || !reason || loading}
            onClick={handleSend}
            className="bg-red-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-red-600 disabled:opacity-50 transition"
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>

          {success && (
            <p className="text-green-600 text-xs">Уведомление отправлено</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentModal;
