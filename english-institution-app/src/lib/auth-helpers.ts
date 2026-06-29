import type { MeResponse } from "@/app/types/auth";

export function getUserDisplayName(user: MeResponse | null | undefined) {
  if (!user) return "";
  const fullName = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  return fullName || user.email;
}

export function getDashboardPath(user: MeResponse | null | undefined) {
  if (!user) return "/login";

  if (!user.is_teacher) {
    return "/student/dashboard";
  }

  if (!user.has_tutor_profile) {
    return "/register";
  }

  if (!user.tutor_approved) {
    return "/tutor/pending-approval";
  }

  return "/tutor/dashboard";
}
