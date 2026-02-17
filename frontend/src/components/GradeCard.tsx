import { useNavigate } from "react-router";

const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const GradeCard = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen w-full bg-zinc-100 p-10">
      <h1 className="text-3xl font-bold mb-8 text-zinc-800">Выберите класс</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {grades.map((grade) => (
          <div
            key={grade}
            onClick={() => navigate(`/grade/${grade}`)}
            className="
              group cursor-pointer
              bg-white rounded-2xl p-8
              shadow-sm border border-zinc-200
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              flex items-center justify-center
            "
          >
            <span className="text-2xl font-semibold text-zinc-700 group-hover:text-blue-600 transition">
              {grade} класс
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GradeCard;
