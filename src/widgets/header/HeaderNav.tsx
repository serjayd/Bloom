import { HEADER_LINKS } from "./header-links";
import NavItem from "./NavItem";

interface Props {
  onNavigate?: () => void;
}

export default function HeaderNav({ onNavigate }: Props) {
  return (
    <ul className="flex flex-col lg:flex-row gap-3 lg:gap-1 items-start lg:items-center">
      {HEADER_LINKS.map((item) => (
        <li key={item.label}>
          <NavItem item={item} onNavigate={onNavigate} />
        </li>
      ))}
    </ul>
  );
}
