import { BiTrash } from "react-icons/bi";

export interface DeleteModalProps {
  setShowDeleteModal: () => void;
  title: string;
  confirmDelete: () => void;
}

const DeleteCourseModal = ({
  setShowDeleteModal,
  title,
  confirmDelete,
}: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={setShowDeleteModal}
      ></div>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl transform transition-all scale-100">
        <div className="text-center">
          <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BiTrash size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">حذف دوره</h3>
          <p className="text-gray-500 text-sm mb-8">
            آیا از حذف دوره{" "}
            <span className="font-bold text-gray-700">{title}</span> مطمئن
            هستید؟ این عمل غیرقابل بازگشت است.
          </p>
          <div className="flex gap-3">
            <button
              onClick={confirmDelete}
              className="flex-1 bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition-colors cursor-pointer"
            >
              بله، حذف شود
            </button>
            <button
              onClick={setShowDeleteModal}
              className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
