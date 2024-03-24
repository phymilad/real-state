"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/dashboard/add/layout.module.css";
import CustomDatePicker from "@/molecules/custome-date-picker/CustomeDatePicker";
import { TextInput } from "@/molecules/text-input/TextInput";
import RadioList from "@/molecules/radio-list/RadioList";
import TextList from "@/molecules/text-list/TextList";

export type ProfileData = {
  title: string
  description: string
  location: string
  phone: string
  price: string
  realState: string
  category: string
  rules: string[]
  amenities: string[]
}

type AddProfilePageProps = {
  data: ProfileData
}

function AddProfilePage({ 
  data
} : AddProfilePageProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realState: "",
    category: "",
    rules: [],
    amenities: [],
  });

  useEffect(() => {
    if (data) setProfileData(data);
  }, []);

  const router = useRouter();

  const submitHandler = async () => {
    console.log('profileData: ', profileData)
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(profileData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("data: ", data)
    if (data.error) {
    } else {
      router.refresh();
    }
  };

  const editHandler = async () => {
    // const res = await fetch("/api/profile", {
    //   method: "PATCH",
    //   body: JSON.stringify(profileData),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const data = await res.json();
    // if (data.error) {
    // } else {
    //   router.refresh();
    // }
  };

  return (
    <div className={styles.container}>
      <h3>{data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>
      <TextInput
        title="عنوان آگهی"
        name="title"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="توضیحات"
        name="description"
        profileData={profileData}
        setProfileData={setProfileData}
        textarea={true}
      />
      <TextInput
        title="آدرس"
        name="location"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="شماره تماس"
        name="phone"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="قیمت(تومان)"
        name="price"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="بنگاه"
        name="realState"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <RadioList profileData={profileData} setProfileData={setProfileData} />
      <TextList
        title="امکانات رفاهی"
        profileData={profileData}
        setProfileData={setProfileData}
        type="amenities"
      />
      <TextList
        title="قوانین"
        profileData={profileData}
        setProfileData={setProfileData}
        type="rules"
      />
      {data ? (
        <button className={styles.submit} onClick={editHandler}>
          ویرایش آگهی
        </button>
      ) : (
        <button className={styles.submit} onClick={submitHandler}>
          ثبت آگهی
        </button>
      )}
    </div>
  );
}

export default AddProfilePage;
