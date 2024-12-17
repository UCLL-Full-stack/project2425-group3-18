import React, { useEffect } from "react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ContentGrid from "@/components/ContentGrid";
import Layout from "@/components/Layoutwrapper";
import { useRouter } from "next/router";

const App: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Head>
        <link rel="icon" href="/img/logo2.png" />
        <title>Rate My Kot</title>
      </Head>
      <Layout>
        <ContentGrid />
      </Layout>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    overflowY: "auto",
  },
};

export default App;
