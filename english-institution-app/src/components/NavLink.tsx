"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps {
  href: string;
  title: string;
}

const NavLink = ({ href, title }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link href={href}>
      <p
        className={`navlink 
          ${
            isActive
              ? "text-third font-bold"
              : "text-secondary hover:text-foreground"
          }`}
      >
        {title}
      </p>
    </Link>
  );
};

export default NavLink;
