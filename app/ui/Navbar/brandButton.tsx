import { APP_NAME } from "@/app/lib/constants";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

export default function BrandButton() {
  return (
    <Link href="/" className={styles.brand_button}>
      <Image src="/logo_hollow_nobg.svg" alt="logo" width={20} height={20} />
      {APP_NAME}
    </Link>
  );
}
