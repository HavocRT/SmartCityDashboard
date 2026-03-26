import styles from "./Header.module.css";
import cityIcon from "../assets/icons/city.png";

function Header() {
  return (
    <header className={styles.header}>
      <img src={cityIcon} alt="City Icon" className={styles.cityIcon} />
      <div className={styles.titleGroup}>
        <span className={styles.titleMain}>SMART CITY</span>
        <span className={styles.titleSub}>DASHBOARD</span>
      </div>
    </header>
  );
}

export default Header;