"use client";

import { ReactNode, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import styles from "./Dashboard.module.css";

function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className={styles.container}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
