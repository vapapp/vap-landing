"use client";

import { ReactNode } from "react";
import withAuth from "@/components/auth/withAuth";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import styles from "./Dashboard.module.css";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
