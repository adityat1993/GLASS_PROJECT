import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Google } from "../assets/icons/ico-google.svg";
import { ReactComponent as Apple } from "../assets/icons/ico-apple.svg";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import UserController from "./Controller/User";
import SettingPage from "./Setting";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppleLogin from "react-apple-login";
import AppleSignin from "react-apple-signin-auth";
import DetailsPage from "./Details";
const axios = require('axios');

const clientId = "947853636160-hnltan2vh8q8bpltfj5iae5vjt8r45a6.apps.googleusercontent.com";

const LoginPage = (props) => {
  const history = useHistory();

  useEffect(() => {
    let googleid = localStorage.getItem(`google`)
    if (googleid === null) {
      history.push("/login");

    } else {
      history.push('/welcome');

    }
  }, []);
  const handleLogin = async (googleData) => {
    localStorage.setItem(`name`, googleData.profileObj.givenName);

    localStorage.setItem(`google`, googleData.profileObj.googleId);
    const getUser = () => {
      axios.get(`https://dev.this.glass/user/${googleData.profileObj.googleId}`)
        .then(response => {
          if (response.data.userId == null) {
            let formdata = {
              userId: googleData.profileObj.googleId,
            };
            UserController.userRegistration(formdata, (result) => {
              if (result.data.success == true) {
                localStorage.setItem(`google`, googleData.profileObj.googleId);
                console.log("login");

                props.history.push("/details")
              } else {
                alert("error:something went wrong");
              }
            });
          } else {
            let formdata = {
              userId: googleData.profileObj.googleId,
            };
            UserController.userRegistration(formdata, (result) => {
              if (result.data.success == true) {
                localStorage.setItem(`google`, googleData.profileObj.googleId);
                props.history.push("/welcome")

              } else {
                console.log("error:something went wrong");
              }
            });

          }
        })
        .catch(err => {
          console.log("failed", err);

        })

    }
    getUser();


  };
  return (
    <main>
      <div className="login__container">
        <p className="typo">Sign In</p>
        <GoogleLogin
          render={(renderProps) => (
            <button
              className="login__button login__button--google"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Google className="login__button__logo typo typo__b" />
              <div className="login__button__text">Continue with Google</div>
            </button>
          )}
          clientId={
            "947853636160-hnltan2vh8q8bpltfj5iae5vjt8r45a6.apps.googleusercontent.com"
          }
          onSuccess={handleLogin}
          cookiePolicy={"single_host_origin"}
          className="login__button login__button--google"
        >
          <div className="login__button__text">Continue with Google</div>
        </GoogleLogin>
        <AppleSignin
          authOptions={{
            clientId: "this.glass.web",
            state: "state",
            nonce: "nonce",
            redirectURI: "https://this.glass/",
            scope: "name email",

          }}
          onSuccess={(response) =>
            console.log("response", response)

          }
          onError={(error) => alert(error)}

          render={(renderProps) => (
            <button
              className="login__button login__button--apple"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Apple className="login__button__logo typo typo__b" />
              <div className="login__button__text">Continue with Apple</div>
            </button>
          )}
        />
        <div className="login__row">
          <p className="typo typo__b typo__b--2">Don't have an account? </p>
          <p
            className="typo typo__b typo__b--2 u-c-pointer"
            onClick={() => props.history.push("/signup")}
          >
            &nbsp;<u>Sign Up</u>
          </p>
        </div>
      </div>
    </main>
  );
};
export default LoginPage;
