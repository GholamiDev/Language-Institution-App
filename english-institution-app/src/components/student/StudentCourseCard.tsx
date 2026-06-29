import Image from "next/image";
import { useRouter } from "next/navigation";

export interface StudentCourseCardProps {
  key: number;
  id: number;
  enrollment: string;
  image?: string;
  title: string;
}

const StudentCourseCard = ({
  id,
  enrollment,
  image,
  title,
}: StudentCourseCardProps) => {
  const router = useRouter();
  return (
    <div className="">
      <div
        key={id}
        className="border border-gray-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all .4s shadow rounded-xl p-4 relative"
      >
        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full font-bold
      ${
        enrollment === "approved"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
        >
          {enrollment === "approved" ? "تایید شده" : "در انتظار تایید"}
        </div>

        {image && (
          <Image
            src={image}
            alt={title}
            width={100}
            height={100}
            style={{ width: "100%", height: "100%" }}
            className="w-full h-10 object-cover rounded"
          />
        )}

        <h2 className="text-lg font-semibold mt-3">{title}</h2>

        <button
          disabled={enrollment !== "approved"}
          onClick={() => router.push(`/courses/${id}`)}
          className={`mt-4 px-4 py-2 text-blue-600 border rounded-xl w-full ${
            enrollment === "approved"
              ? "border-blue-600 cursor-pointer hover:bg-blue-500 hover:text-white transition-all .4s"
              : "text-orange-400 border-orange-400"
          }`}
        >
          {enrollment === "approved" ? "مشاهده دوره" : "در انتظار تایید ادمین"}
        </button>
      </div>
    </div>
  );
};

export default StudentCourseCard;
