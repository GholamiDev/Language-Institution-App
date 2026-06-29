import Link from "next/link";
import {
  BiBookOpen,
  BiCheckCircle,
  BiEdit,
  BiTimeFive,
  BiTrash,
} from "react-icons/bi";
import QuickActions from "./QuickAction";

export interface TutorCourseCardProps {
  key: number | string;
  id: number | string;
  courseId: string | number;
  title: string;
  schedule_start: string;
  schedule_day: string;
  openDeleteModal: () => void;
}

const TutorCourseCard = ({
  // key,
  id,
  title,
  schedule_start,
  schedule_day,
  openDeleteModal,
}: TutorCourseCardProps) => {
  return (
    <div className="bg-(--card-bg) border border-(--card-border) rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600`}
        >
          <BiCheckCircle size={16} />
          منتشر شده
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <QuickActions courseId={id} />
          <Link href={`/courses/${id}/edit`}>
            {" "}
            <button
              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
              title="ویرایش"
            >
              <BiEdit size={20} />
            </button>
          </Link>
          <button
            onClick={openDeleteModal}
            className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            title="حذف"
          >
            <BiTrash size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gray-100 p-3 rounded-2xl text-gray-400">
          <BiBookOpen size={28} />
        </div>
        <div>
          <h3 className="font-bold text-primary line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
            <BiTimeFive />
            ساعت آغاز : {schedule_start
              ? schedule_start
              : "تاریخ نامشخص"} | {schedule_day ? schedule_day : "روز نامشخص"}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-50 pt-4">
        <Link
          href={`/courses/${id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          مشاهده جزئیات دوره
        </Link>
      </div>
    </div>
  );
};

export default TutorCourseCard;
