import { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-xl rounded-3xl border border-(--card-border) bg-(--card-bg) p-8 shadow-(--shadow-custom) backdrop-blur">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          {title}
        </h1>
        <p className="text-sm text-secondary">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
