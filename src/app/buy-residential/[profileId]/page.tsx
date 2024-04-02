import React from 'react'
import styles from '@/app/buy-residential/[profileId]/profileDetails.module.css'
import Profile from '@/models/profile'
import { connectDB } from '@/utils/connectDB'
import { e2p, sp } from '@/utils/replaceNumber'
import ItemList from '@/molecules/item-list/ItemList'
import ShareButton from '@/molecules/share-button/SHareButton'
import { categories } from '@/utils/strings'

const ProfileDetails = async ({ params }) => {
  await connectDB()
  const data = await Profile.findOne({ _id: params.profileId })
  
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{data.title}</h1>
        <span>
          {data.location}
        </span>
        <h3>توضیحات</h3>
        <p>{data.description}</p>
        <h3>امکانات رفاهی</h3>
        <ItemList data={data.amenities} />
        <h3>قوانین</h3>
        <ItemList data={data.rules} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <p>املاک {data.realState}</p>
          <span>
            {e2p(data.phone)}
          </span>
        </div>
        <ShareButton />
        <div className={styles.price}>
          <p>
            {/* {icons[category]} */}
            {categories[data.category]}
          </p>
          <p>{sp(data.price)} تومان</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails