"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/app/services/api";
import TutorCard from "@/components/TutorCard";
import TutorsSearchToolbar from "@/components/tutor/TutorsSearchToolbar";
import TutorSkeleton from "@/components/loading/TutorSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import { BiBookAlt } from "react-icons/bi";

const TutorsPage = () => {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await api.tutorsList();

        console.log("RAW res:", res);
        console.log("res.data:", (res as any)?.data);

        const payload = (res as any)?.data ?? res;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        setTutors(list);
        // console.log(tutors.profile_picture);
      } catch (err) {
        setError("خطا در دریافت اطلاعات");
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const filteredTutors = useMemo(() => {
    if (!search) return tutors;

    return tutors.filter((tutor) => {
      const name =
        (tutor?.user?.first_name || "") + " " + (tutor?.user?.last_name || "");

      return name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, tutors]);

  return (
    <div className="container-custom">
      <div className="secondary-container">
        <h1 className="blue-title">
          <span className="blue-col"></span>
          اساتید مجرب ما
        </h1>

        <p className="small-p">
          از بین اساتید تاییدشده، استاد مورد نظر خود را انتخاب کنید.
        </p>
      </div>

      <TutorsSearchToolbar value={search} onChange={setSearch} />

      {loading ? (
        <div className="course-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <TutorSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="notfound-card">
          <div className="center-card">
            <div className="icon-bg">
              <BiBookAlt className="icon" />
            </div>
          </div>

          <h3 className="header-md">خطا در دریافت اطلاعات</h3>
          <p className="small-p text-red-500">لطفاً دوباره تلاش کنید.</p>
        </div>
      ) : filteredTutors.length > 0 ? (
        <motion.div layout className="course-grid">
          <AnimatePresence mode="popLayout">
            {filteredTutors.map((tutor: any) => (
              <motion.div
                key={tutor.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.28 }}
              >
                <TutorCard
                  id={tutor.id}
                  avatarUrl={tutor.profile_picture}
                  fullName={`${tutor.user.first_name} ${tutor.user.last_name}`}
                  email={tutor.user.email}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="notfound-card">
            <div className="center-card">
              <div className="icon-bg">
                <BiBookAlt className="icon" />
              </div>
            </div>

            <h3 className="header-md">استادی با این نام پیدا نشد</h3>

            <p className="small-p">
              استاد دیگری جستجو کن یا همه اساتید را مشاهده کن.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TutorsPage;
