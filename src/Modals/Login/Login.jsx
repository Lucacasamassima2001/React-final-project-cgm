import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import styles from "./Login.module.css";
export default function Login() {
  return (
    <div>
      <h2>Welcome</h2>
      <p>Please login to continue</p>
      <form action="">
        <Input placeholderText={"Enter username"} labelText="Username" />
        <Input placeholderText={"Enter password"} labelText="Password" />
      </form>
      <div className={styles.loginModalActions}>
        <Link to="/Home">
          <Button>Log in</Button>
        </Link>
      </div>
    </div>
  );
}
