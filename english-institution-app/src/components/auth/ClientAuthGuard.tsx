"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/api";

type ClientAuthGuardProps = {
  children: ReactNode;
  allow: (me: any) => boolean;
  redirectTo?: string;
};

export default function ClientAuthGuard({
  children,
  allow,
  redirectTo = "/login",
}: ClientAuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const meRes = await api.me();
        const me = (meRes as any)?.data ?? meRes;

        if (!me || !allow(me)) {
          router.replace(redirectTo);
          return;
        }

        setAuthorized(true);
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [allow, redirectTo, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        درحال بارگذاری...
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}
