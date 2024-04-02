import styles from "@/app/page.module.css"
import { categories, cities, services } from "@/utils/strings"
import { CategoryCard } from "@/molecules/category-card/CategoryCard"

function HomePage() {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.desc}>
          <h1>سامانه خرید و اجاره ملک</h1>
          <ul>
            {services.map((i) => (
              <li key={i}>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.categories}>
        {Object.keys(categories).map((i, index) => (
          <CategoryCard key={index} title={categories[i]} name={i} />
        ))}
      </div>
      <div className={styles.city}>
        <h3>شهر های پر بازدید</h3>
        <ul>
          {cities.map((i) => (
            <li key={i}>
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage

