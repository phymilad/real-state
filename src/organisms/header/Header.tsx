import Link from 'next/link'
import styles from "@/organisms/header/Header.module.css";
import { Login, User } from 'iconsax-react';
import { useSession } from 'next-auth/react';

export const Header = () => {

  const { data } = useSession()
  return (
    <header className={styles.header}>
      <div>
        <ul>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/buy-residential">آگهی ها</Link>
          </li>
        </ul>
      </div>
      {data ? (
        <div className={styles.login}>
          <Link href="/dashboard">
            <User size="24" color="#FFF"/>
          </Link>
        </div>
      ) : (
        <div className={styles.login}>
          <Link href="/signin">
            <Login size="24" color="#FFF"/>
            <span>ورود</span>
          </Link>
        </div>
      )}
    </header>
  )
}
