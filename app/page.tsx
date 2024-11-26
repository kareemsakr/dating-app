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
      <section className={styles.sub_hero}>
        <figure className={styles.img_container}>
          <img src="/doomscroll.jpg" alt="Person doomscrolling" />
          <img src="/couple_on_car.jpg" alt="A couple having a great date" />
        </figure>
        <h2>Reclaim Your Dating Life from the Algorithm</h2>
        <p>
          No more endless swiping, ghosting, or wasted hours. One handpicked
          match each week, spend less time on your screen and more time
          connecting IRL.
        </p>
        <Button variant="black">Learn More</Button>
      </section>
      <section></section>
      <section></section>
    </main>
  );
}
