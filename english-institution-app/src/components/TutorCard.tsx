import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";

export type TutorCardProps = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
};

const TutorCard = ({ id, fullName, email, avatarUrl }: TutorCardProps) => {
  const hasAvatar =
    typeof avatarUrl === "string" && avatarUrl.trim().length > 0;

  const getImageUrl = (path?: string) => {
    if (!path) return "/images/avatar-placeholder.png";

    if (path.startsWith("http")) return path;

    return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  };

  return (
    <Link href={`/tutors/${id}`}>
      <div className="bg-[var(--background)] border border-[var(--card-border)] shadow-[var(--shadow-custom)] rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-md transition-all hover:-translate-y-1">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden">
          {hasAvatar ? (
            <img
              src={getImageUrl(avatarUrl)}
              alt={fullName}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="text-blue-500 text-4xl">
              <BiUserCircle />
            </div>
          )}
        </div>

        <div className="text-center">
          <h3 className="font-bold text-lg text-[var(--primary)]">
            {fullName}
          </h3>
          <p className="text-[var(--secondary)] text-xs">{email}</p>
        </div>

        <button className="text-[var(--third)] text-sm font-semibold mt-2">
          مشاهده رزومه و دوره‌ها
        </button>
      </div>
    </Link>
  );
};

export default TutorCard;
