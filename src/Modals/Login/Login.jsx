/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import styles from "./Login.module.css";
import { useContext, useState } from "react";
import { OrderContext } from "../../store/food-order-context";
import ErrorModal from "../Error/ErrorModal";
import Modal from "../Modal/Modal";
export default function Login({ setLogin }) {
  const { userCtx, setUserCtx } = useContext(OrderContext);

  const [userData, setUserData] = useState({
    name: "",
    password: "",
    isLogged: false,
    error: false,
  });

  function getUserDatas(e) {
    const { name, value } = e.target;
    const userValues = { ...userData, [name]: value };
    setUserData(userValues);
  }

  function handleLogin() {
    if (userData.name === "" || userData.password === "") {
      setUserData((prev) => ({ ...prev, error: true }));
      return;
    } else {
      setUserCtx({
        name: userData.name,
        password: userData.password,
        admin: userData.admin,
        isLogged: true,
      });
      console.log(userCtx);
    }
  }

  return (
    <div id={styles.login}>
      <Modal open={userData.error}>
        <ErrorModal onClose={() => setLogin(false)} />
      </Modal>
      {userCtx.isLogged ? (
        <div>
          <h2>Welcome back {userCtx.name}</h2>
          <Link to="/Home">
            <Button>Go to homepage</Button>
          </Link>
        </div>
      ) : (
        <div>
          <h2>Welcome</h2>
          <p>Please login to continue</p>
          <form action="">
            <Input
              onChange={getUserDatas}
              placeholderText={"Enter username"}
              labelText="Username"
              inputName="name"
            />
            <Input
              inputType="password"
              onChange={getUserDatas}
              placeholderText={"Enter password"}
              labelText="Password"
              inputName="password"
            />
          </form>
          <div className={styles.loginModalActions}>
            <Button onClick={() => setLogin(false)}>Cancel</Button>
            <Button onClick={handleLogin}>Log in</Button>
          </div>
        </div>
      )}
    </div>
  );
}
