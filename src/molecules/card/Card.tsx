import Link from "next/link";
import { sp } from "@/utils/replaceNumber";
import styles from "@/molecules/card/card.module.css";

export type CardProps = { 
  _id?: string
  category: string
  title: string
  location: string
  price: string
}

function Card({
  _id, 
  category, 
  title, 
  location, 
  price 
} : CardProps) {


  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        category icon
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.location}>
        {location}
      </p>
      <span>{sp(+price)} تومان</span>
      <Link href={`/buy-residential/${_id}`}>
        مشاهده آگهی
      </Link>
    </div>
  );
}

export default Card;
