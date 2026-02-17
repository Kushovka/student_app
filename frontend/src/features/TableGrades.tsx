import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { createStudents } from "../api/student";
import CreateStudentModal from "../components/CreateStudentModal";
import GradeCard from "../components/GradeCard";
import type { StudentForm } from "../types/student.type";

const TableGrades = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [form, setForm] = useState<StudentForm>({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    grade: "",
    class_letter: "",
  });

  const addStudent = async () => {
    try {
      await createStudents({
        ...form,
        grade: Number(form.grade),
      });
      setOpenCreateModal(false);

      setForm({
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        grade: "",
        class_letter: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex items-center text-">
      {openCreateModal && (
        <CreateStudentModal
          form={form}
          setForm={setForm}
          setOpenCreateModal={setOpenCreateModal}
          addStudent={addStudent}
        />
      )}

      <div
        onClick={() => setOpenCreateModal((prev) => !prev)}
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-[54px] h-[54px] rounded-full bg-cyan-500 text-white shadow-lg hover:bg-cyan-600 transition cursor-pointer active:scale-95"
      >
        <IoClose className="w-6 h-6 rotate-45" />
      </div>
      <GradeCard />
    </section>
  );
};

export default TableGrades;
