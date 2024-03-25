import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <>
      <div className={styles.landing}>
        <div className={styles.landingContent}>
          <img className={styles.landingImg} src="/public/logo.jpg" alt="" />
          <h1>Welcome to REACTFOOD!</h1>
          <h2>Start your journey with us!</h2>

          <Link to="/Home">
            <Button>Let`s Order!</Button>
          </Link>

          <div className={styles.landingText}>
            `Stop by our convenient location and experience the mouthwatering
            flavors of our fast food offerings. Our friendly staff is ready to
            serve you with a smile and ensure that your dining experience is
            nothing short of exceptional.`
          </div>
        </div>
        <div className={styles.opacity}></div>
      </div>
    </>
  );
}
