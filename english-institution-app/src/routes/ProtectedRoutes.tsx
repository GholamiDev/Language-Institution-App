"use client";

import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Role = "student" | "tutor";

export default function ProtectedRoutes({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: Role[];
}) {
  const { user, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const role = user.role as Role | undefined;

    if (!role) {
      router.push("/");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.push(role === "tutor" ? "/dashboard/tutor" : "/dashboard/student");
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <LoadingSkeleton />
      </div>
    );
  }

  return <>{children}</>;
}
