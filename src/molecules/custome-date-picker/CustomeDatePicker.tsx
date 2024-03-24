import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "@/molecules/custome-date-picker/CustomDatePicker.module.css";

type CustomDatePickerProps = {
  profileData: any
  setProfileData: any
}

function CustomDatePicker({ 
  profileData, setProfileData 
} : CustomDatePickerProps) {
  
  const changeHandler = (e: DateObject | DateObject[] | null) => {
    const date = new Date(e);
    setProfileData({ ...profileData, constructionDate: date });
  };

  return (
    <div className={styles.container}>
      <p>تاریخ ساخت</p>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={profileData.constructionDate}
        onChange={e => changeHandler(e)}
        calendarPosition="bottom-right"
      />
    </div>
  );
}

export default CustomDatePicker;
