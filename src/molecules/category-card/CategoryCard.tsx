import Link from "next/link";
import Image from "next/image";
import styles from "@/molecules/category-card/categoryCard.module.css"
import { categories } from "@/utils/strings"

type CategoryCardProps = {
  name: string
  title: keyof typeof categories
  // title: 'apartment' | 'villa' | 'store' | 'office'
}

export const CategoryCard = ({ 
  name, 
  title 
} : CategoryCardProps) => {
  return (
    <div className={styles.card}>
      <Link href={`/buy-residential?category=${name}`}>
        <Image
          src={`/images/${name}.png`}
          alt={title}
          width={240}
          height={144}
          priority={true}
        />
        <p>{title}</p>
      </Link>
    </div>
  );
}
