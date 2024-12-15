import React from "react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ContentGrid from "@/components/ContentGrid";

const App: React.FC = () => {
    return (
        <>
            <Head>
                <link rel="icon" href="/img/logo2.png" />
                <title>Rate My Kot</title>
            </Head>
            <div style={styles.container}>
                <Sidebar />
                <div style={styles.mainContent}>
                    <Header />
                    <ContentGrid />
                </div>
            </div>
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
