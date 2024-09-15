import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import { FRENCH_NUMS, FRENCH_TENSES } from "../../routes/routePaths";

const HomePage = () => {
  return (
    <main className={styles.HomePage}>
      <Link to={FRENCH_NUMS} className={styles.link_btn}>
        French Numbers
      </Link>
      <Link to={FRENCH_TENSES} className={styles.link_btn}>
        French Tenses
      </Link>
    </main>
  );
};

export default HomePage;
