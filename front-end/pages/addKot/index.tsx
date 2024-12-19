import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/addKot/addKot.module.css";
import { useTranslation } from "next-i18next";
import Layout from "@/components/Layoutwrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const AddKotPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    city: "",
    street: "",
    housenumber: "",
    price: "",
    surfaceSpace: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "surfaceSpace" && Number(value) > 0) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    
  };

  return (
    <Layout>
      <Head>
        <title>Rate My Kot - {t("addKot.headTitle")}</title>
      </Head>
    <div className={styles.container}>
      <h1 className={styles.title}>{t("addKotPage.addKotTitle")}</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="city" className={styles.label}>
            {t("addKotPage.cityLabel")}
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="street" className={styles.label}>
            {t("addKotPage.streetLabel")}
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="housenumber" className={styles.label}>
            {t("addKotPage.housenumberLabel")}
          </label>
          <input
            type="text"
            id="housenumber"
            name="housenumber"
            value={formData.housenumber}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="price" className={styles.label}>
            {t("addKotPage.priceLabel")}
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="surfaceSpace" className={styles.label}>
            {t("addKotPage.surfaceSpaceLabel")}
          </label>
          <input
            type="number"
            id="surfaceSpace"
            name="surfaceSpace"
            value={formData.surfaceSpace}
            onChange={handleChange}
            required
            className={styles.input}
            min="1"
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>
          {t("addKotPage.submitButton")}
        </button>
      </form>
    </div>
    </Layout>
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

export default AddKotPage;
