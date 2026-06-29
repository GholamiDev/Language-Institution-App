"use client";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(
        user.role === "tutor" ? "/dashboard/tutor" : "/dashboard/student",
      );
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}
