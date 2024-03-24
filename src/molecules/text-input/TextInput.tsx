import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { p2e } from "@/utils/replaceNumber";
import { ProfileData } from "@/app/dashboard/add/page";
import styles from "@/molecules/text-input/TextInput.module.css";

type TextInputProps = {
  title: string
  name: keyof ProfileData
  profileData: ProfileData
  setProfileData: Dispatch<SetStateAction<ProfileData>>
  textarea?: boolean
}

export const TextInput = ({
  title,
  name,
  profileData,
  setProfileData,
  textarea = false,
} : TextInputProps) => {
  const changeHandler = (e:  ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: p2e(value) });
  };

  return (
    <div className={styles.container}>
      <p>{title}</p>
      {textarea ? (
        <textarea
          name={name}
          value={profileData[name]}
          onChange={changeHandler}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={profileData[name]}
          onChange={changeHandler}
        />
      )}
    </div>
  );
}
