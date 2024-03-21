import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function Landing() {
  return (
    <>
      <div className="landing">
        <div className="landing__content">
          <img className="landing__img" src="/public/logo.jpg" alt="" />
          <h1>Welcome to REACTFOOD!</h1>
          <h2>Start your journey with us!</h2>
          <Link to="/Home">
            <Button>Let`s Order!</Button>
          </Link>

          <div className="landing__text">
            `Stop by our convenient location and experience the mouthwatering
            flavors of our fast food offerings. Our friendly staff is ready to
            serve you with a smile and ensure that your dining experience is
            nothing short of exceptional.`
          </div>
        </div>
        <div className="opacity"></div>
      </div>
    </>
  );
}
