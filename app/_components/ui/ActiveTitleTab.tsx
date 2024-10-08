// ActiveTitleTab.tsx
import { FC } from "react";
import styles from '../../(routes)/ElectronicOffice/style.module.css';
type TabType=string;
type ActiveTitleTabProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
  buttonTitles: {
    [key: string]: string;  
  };
};

const ActiveTitleTab: FC<ActiveTitleTabProps> = ({ activeTab, setActiveTab, buttonTitles }) => {
  return (
    <div className={styles.cardHeader}>
      <ul className={styles.nav}>
        {Object.keys(buttonTitles).map((key) => (
          <button
            key={key}
            className={`${styles.navItem} ${activeTab === key ? styles.active : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {buttonTitles[key]}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default ActiveTitleTab;
