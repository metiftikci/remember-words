import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getKnownData } from "../core/data";
import { RememberData } from "../core/models";
import styles from "../styles/Known.module.css";

const Known: NextPage = () => {
  const [knownData, setKnownData] = useState<RememberData[]>([]);

  function refreshData() {
    setKnownData(getKnownData(1));
  }

  useEffect(refreshData, []);

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
          {knownData.map((x, i) => (
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

export default Known;