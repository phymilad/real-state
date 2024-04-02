import Sidebar from "@/molecules/sidebar/Sidebar";
import styles from '@/app/buy-residential/buyResidential.module.css'
import Card from "@/molecules/card/Card";
import { connectDB } from "@/utils/connectDB";
import Profile from "@/models/profile";

export default async function BuyResidentials({ searchParams }) {
  await connectDB()
  const profiles = await Profile.find({ certified: true }).select("-userId")

  if (!profiles) return <h3>مشکلی پیش آمده است</h3>
  let finalData = profiles

  if (searchParams.category) {
    finalData = finalData.filter((i) => i.category === searchParams.category);
  }

  return <div className={styles.container}>
    <div className={styles.sidebar}>
      <Sidebar />
    </div>
    <div className={styles.main}>
      {!finalData.length && <p className={styles.text}>هیچ آگهی ثبت نشده است</p>}
      {finalData.map((profile) => (
        <Card
          key={profile._id} 
          _id={profile._id.toString()}
          category={profile.category} 
          location={profile.location}
          price={profile.price}
          title={profile.title}
        />
      ))}
    </div>
  </div>
}