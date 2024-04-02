import Link from "next/link";
import styles from "@/molecules/sidebar/sidebar.module.css";
import { categories } from "@/utils/strings";

function Sidebar() {
  return (
    <div className={styles.container}>
      <p>
        دسته بندی
      </p>
      <Link href="/buy-residential">همه</Link>
      {Object.keys(categories).map((i, index) => (
        <Link
          key={index}
          href={{
            pathname: "/buy-residential",
            query: { category: i },
          }}
        >
          {categories[i]}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
