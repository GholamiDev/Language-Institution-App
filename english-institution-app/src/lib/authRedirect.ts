import { MeResponse } from "@/app/types/auth";

export function getRedirectPathFromMe(me: MeResponse): string {
  if (!me.is_teacher) return "/student/dashboard";
  if (!me.has_tutor_profile) return "/tutor/complete-profile";
  if (!me.tutor_approved) return "/tutor/pending-approval";
  return "/tutor/dashboard";
}
