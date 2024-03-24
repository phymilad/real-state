import styles from "@/app/dashboard/page.module.css";

export default async function Home() {

  return (
    <>
      <div className={styles.container}>
        <h3>سلام 👋</h3>
        <p>آگهی های خود را ثبت کنید تا هزاران نفر آن را مشاهده کنند</p>
        <div className={styles.createdAt}>
          <p>تاریخ عضویت:</p>
          <span>1403/01/01</span>
        </div>
      </div>
    </>
  );
}


