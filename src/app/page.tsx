import Image from "next/image";
import styles from "./page.module.css";
import Config from "@/components/Config";
export default function Home() {
  return (
    <main className={styles.main}>
      <Config />
    </main>
  );
}
