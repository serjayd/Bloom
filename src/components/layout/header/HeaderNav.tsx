import React from "react";
import { HEADER_LINKS } from "./header-links";
import NavItem from "./NavItem";

export default function HeaderNav() {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-1 items-center">
        {HEADER_LINKS.map((item) => (
          <li key={item.label}>
            <NavItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
