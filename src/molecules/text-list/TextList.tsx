import { ProfileData } from "@/app/dashboard/add/page";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "@/molecules/text-list/TextList.module.css";

type TextListProps = {
  title: string
  profileData: ProfileData
  setProfileData: Dispatch<SetStateAction<ProfileData>>
  type: 'amenities' | 'rules'
}

function TextList({ 
  title,
  profileData, 
  setProfileData, 
  type 
} : TextListProps) {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const list = [...profileData[type]];
    list[index] = value;
    setProfileData({ ...profileData, [type]: list });
  };

  const addHandler = () => {
    setProfileData({ ...profileData, [type]: [...profileData[type], ""] });
  };

  const deleteHandler = (index: number) => {
    const list = [...profileData[type]];
    list.splice(index, 1);
    setProfileData({ ...profileData, [type]: list });
  };

  return (
    <div className={styles.container}>
      <p>{title}</p>
      {profileData[type].map((i, index) => (
        <div className={styles.card} key={index}>
          <input
            type="text"
            value={i}
            onChange={(e) => changeHandler(e, index)}
          />
          <button onClick={() => deleteHandler(index)}>
            حذف
            {/* <AiOutlineDelete /> */}
          </button>
        </div>
      ))}
      <button onClick={addHandler}>
        افزودن
        {/* <MdOutlineLibraryAdd /> */}
      </button>
    </div>
  );
}

export default TextList;
