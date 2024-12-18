import React, { useEffect } from "react";
import Head from "next/head";
import ContentGrid from "@/components/ContentGrid";
import Layout from "@/components/Layoutwrapper";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const App: React.FC = () => {
  const { t } = useTranslation();
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

export const getServerSideProps = async (context:any) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default App;
