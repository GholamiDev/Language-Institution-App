import React from "react";

export const LoginSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 animate-pulse">
      <div className="w-full max-w-md bg-background p-8 rounded-2xl border border-(--card-border) shadow-sm space-y-6">
        <div className="space-y-2 mb-8 text-center">
          <div className="h-8 w-32 bg-(--card-bg) rounded-lg mx-auto"></div>
          <div className="h-4 w-48 bg-(--card-bg) rounded-full mx-auto"></div>
        </div>

        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-16 bg-(--card-bg) rounded"></div>
            <div className="h-12 w-full bg-(--card-bg) rounded-2xl"></div>
          </div>
        ))}

        <div className="h-12 w-full bg-(--card-bg) rounded-2xl"></div>

        <div className="h-4 w-40 bg-(--card-bg) rounded-full mx-auto"></div>
      </div>
    </div>
  );
};
