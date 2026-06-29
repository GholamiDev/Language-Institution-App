"use client";

import Link from "next/link";
import NavLink from "./NavLink";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout as logoutAction } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "@/app/services/api";
import { getDashboardPath, getUserDisplayName } from "@/lib/auth-helpers";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await api.logout();
      dispatch(logoutAction());
      setIsDropdownOpen(false);
      toast.success("با موفقیت خارج شدید");
      router.push("/login");
      router.refresh();
    } catch {
      dispatch(logoutAction());
      setIsDropdownOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center border-b border-(--card-border) bg-background p-5 text-lg backdrop-blur-md">
      <div className="flex w-3xl items-center justify-between lg:w-5xl xl:w-7xl">
        <div className="flex">
          <NavLink href="/" title="صفحه اصلی" />
          <NavLink href="/courses" title="دوره ها" />
          <NavLink href="/tutors" title="اساتید" />
          <NavLink href="/blog" title="مقالات" />
        </div>

        <div className="flex items-center">
          <ThemeToggle />
          {loading ? (
            <div className="bg-secondary h-9.5 w-30 rounded-xl flex justify-center items-center gap-1">
              <div className="bg-white h-3 w-8 rounded-xl"></div>
              <span className="text-white">|</span>
              <div className="bg-white h-3 w-12 rounded-xl"></div>
            </div>
          ) : isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex cursor-pointer items-center gap-2 rounded-md border-b border-t border-(--card-border) px-2 py-1 text-sm text-secondary transition-all hover:border-amber-600"
              >
                <button className="cursor-pointer text-sm text-secondary transition-all hover:text-amber-600">
                  {getUserDisplayName(user)}
                </button>

                {user.is_teacher ? (
                  <FaChalkboardTeacher size={25} color="gray" />
                ) : (
                  <BiUserCircle size={25} color="gray" />
                )}
              </div>

              {isDropdownOpen && (
                <div className="absolute left-0 z-150 mt-2 w-48 rounded-lg border border-(--card-border) bg-(--card-bg) py-2 shadow-xl">
                  <Link
                    href={getDashboardPath(user)}
                    className="nav-dash"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    پروفایل کاربری
                  </Link>

                  <Link
                    href={user.is_teacher ? "/tutor/edit" : "/student/edit"}
                    className="nav-dash"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    ویرایش پروفایل
                  </Link>

                  <button
                    className="block w-full cursor-pointer px-4 py-2 text-right text-sm text-red-600 hover:bg-background"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "در حال خروج..." : "خروج"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className=" h-9.5 w-30 rounded-xl flex justify-center items-center gap-1">
              <Link className="nav-prof" href="/login">
                ورود
              </Link>
              {" | "}
              <Link className="nav-prof" href="/register">
                {"ثبت نام"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
