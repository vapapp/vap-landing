"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const navItems = [
  { href: "/admin/dashboard", label: "Visão Geral" },
  { href: "/admin/dashboard/demografia", label: "Demografia" },
  { href: "/admin/dashboard/funcionalidades", label: "Funcionalidades" },
  { href: "/admin/dashboard/comportamento", label: "Comportamento" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.active : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
