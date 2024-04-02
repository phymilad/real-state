import styles from "@/molecules/item-list/itemList.module.css";

type ItemListProps = {
  data: string[]
}

function ItemList({ 
  data 
} : ItemListProps) {
  return (
    <div className={styles.container}>
      {data.length ? (
        <ul>
          {data.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      ) : (
        <p>هیچ موردی ذکر نشده است</p>
      )}
    </div>
  );
}

export default ItemList;