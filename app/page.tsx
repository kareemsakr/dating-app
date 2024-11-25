import Image from "next/image";
import styles from "./Home.module.css";
import Button from "./ui/Button";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <h1>Your Forever After</h1>
        <h3>Handpicked by Real People</h3>
        <Button variant="primary">Join Today</Button>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </main>
  );
}
