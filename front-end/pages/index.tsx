import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/layout/Layoutwrapper";
import ContentGrid from "@/components/contentGrid/ContentGrid";

const App: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const { query } = router;
    if (query.search) {
      setSearchQuery(query.search as string);
    }
  }, [router]);

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
        <ContentGrid searchQuery={searchQuery} />
      </Layout>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default App;
