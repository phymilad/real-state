"use client";

import { useRouter } from "next/navigation";
import styles from "@/molecules/dashboard-card/dashboardCard.module.css";
import Card, { CardProps } from "@/molecules/card/Card";

type DashboardCardProps = {
  data: CardProps
}

function DashboardCard({ 
  data 
} : DashboardCardProps) {
  const router = useRouter();

  const editHandler = () => {
    router.push(`/dashboard/my-profiles/${data._id}`);
  };

  const deleteHandler = async () => {
    const res = await fetch(`/api/profile/delete/${data._id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.error) {
      // toast.error(result.error);
    } else {
      // toast.success(result.message);
      router.refresh();
    }
  };

  return (
    <div className={styles.container}>
      {/* <Card data={data} /> */}
      <Card _id={data._id} category={data.category} location={data.location} price={data.price} title={data.title} />
      <div className={styles.main}>
        <button onClick={editHandler}>
          ویرایش
        </button>
        <button onClick={deleteHandler}>
          حذف آگهی
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;
