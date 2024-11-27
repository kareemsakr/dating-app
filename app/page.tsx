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
      <section className={styles.how_it_works}>
        <h2>How it works?</h2>
        <article>
          <figure>
            <img src="/create_profile.jpg" alt="" />
          </figure>
          <h3>1. Create a public+Private profile</h3>
          <p>
            Your profile is only viewed by our matchmakers and helps them find
            your match
          </p>
        </article>
        <article>
          <figure>
            <img src="/matchmaker.jpg" alt="" />
          </figure>
          <h3>2. An expert Matchmaker pairs you with your match</h3>
          <p>
            Our team of handpicked matchmakers will review your profile and
            match you with a person that aligns with what you’re looking for
          </p>
        </article>
        <article>
          <figure className={styles.img_container}>
            <img src="/texting.jpg" alt="A girl texting" />
            <img src="/texting2.jpg" alt="A guy texting" />
          </figure>
          <h3>3. One guaranteed match per week</h3>
          <p>
            At the beginning of each week, you receive your hand picked march,
            if you choose to accept it, you proceed to the next step.
          </p>
        </article>
        <article>
          <figure className={styles.img_container}>
            <img src="/date.jpg" alt="A couple on a date" />
            <img src="/date2.jpg" alt="A couple on a date 2" />
          </figure>
          <h3>4. Chat for one week and Meet IRL</h3>
          <p>
            You’ll have a up to a week to get to know your match and decide
            whether you want to meet IRL. Once the week is over, the chat is
            closed and archived forever.
          </p>
        </article>
      </section>
      <section className={styles.sub_hero}>
        <figure className={styles.img_container}>
          <img src="/cta.jpg" alt="A person signing up for our service" />
        </figure>
        <h2>Ready for your handpicked match?</h2>
        <p>
          Dating is a deeply personal journey that deserves human insight, not
          lines of code.
        </p>
        <Button variant="black">Sign Up Now</Button>
      </section>
    </main>
  );
}
