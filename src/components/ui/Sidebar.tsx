"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const navItems = [
  { href: "/admin/dashboard", label: "Visão Geral" },
  { href: "/admin/dashboard/demografia", label: "Demografia" },
  { href: "/admin/dashboard/funcionalidades", label: "Funcionalidades" },
  { href: "/admin/dashboard/comportamento", label: "Comportamento" },
  { href: "/admin/dashboard/acesso", label: "Acesso e Advocacia" },
  { href: "/admin/dashboard/ouvidoria", label: "Ouvidoria" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={onClose}
      />
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <nav className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? styles.active : ""}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;