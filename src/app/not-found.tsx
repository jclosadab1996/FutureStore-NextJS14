import Image from "next/image";
import Link from "next/link";
import styles from "app/sass/not-found.module.sass";

export default function NotFound() {
  return (
    <main className={styles.NotFound}>
      <h1 className={styles.NotFound__title}>404</h1>
      <Image src="/images/404.png" alt="404" width={300} height={300} />
      <h2 className={styles.NotFound__subtitle}>
        Whoops! This page doesn&apos;t exist.
      </h2>
      <p className={styles.NotFound__description}>
        Not to worry. You can head over to our homepage.👇
      </p>
      <Link className={styles.NotFound__link} href="/" scroll={false}>
        Let&apos;s go home
      </Link>
    </main>
  );
}
