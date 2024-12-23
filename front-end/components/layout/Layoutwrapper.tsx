import React from "react";
import styles from "@/styles/layoutWrapper/layoutWrapper.module.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.mainContent}>
        <Header />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
