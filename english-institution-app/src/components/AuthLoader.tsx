"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setUser, logout, setAuthLoading } from "@/app/store/authSlice";
import api from "@/app/services/api";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(setAuthLoading(true));

      try {
        const res = await api.me();
        const userData = (res as any)?.data ?? res;
        dispatch(setUser(userData));
      } catch {
        dispatch(logout());
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    loadUser();
  }, [dispatch]);

  return <>{children}</>;
}
