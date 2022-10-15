import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getUnknownData } from "../core/data";
import { RememberData } from "../core/models";
import styles from "../styles/Known.module.css";

const Unknown: NextPage = () => {
  const [unknownData, setUnnownData] = useState<RememberData[]>([]);

  function refreshData() {
    setUnnownData(getUnknownData(-1));
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Remember Words</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Word</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {unknownData.map((x, i) => (
            <tr key={i}>
              <td>{x.word}</td>
              <td>{x.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Unknown;