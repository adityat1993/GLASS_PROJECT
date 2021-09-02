import { ReactComponent as Google } from "../assets/icons/ico-google.svg";
import { ReactComponent as Apple } from "../assets/icons/ico-apple.svg";
import React, { createContext, useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import UserController from "./Controller/User";
import SettingPage from "./Setting";
import AppleSignin from "react-apple-signin-auth";
const axios = require('axios');

const googleclientId =
  "947853636160-hnltan2vh8q8bpltfj5iae5vjt8r45a6.apps.googleusercontent.com";
const appleclientId = "this.glass.web";

const Sign = () => {
  const onLoginSuccess = (res) => { };
  return (
    <>
      <GoogleLogin clientId={googleclientId} onSuccess={onLoginSuccess} />
    </>
  );
};
const SignupPage = (props) => {
  useEffect(() => {
    let googleid = localStorage.getItem(`google`)
    if (googleid === null) {
      props.history.push("/signup");

    } else {
      props.history.push('/welcome');

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

                props.history.push("/details")
              } else {
                console.log("error:something went wrong");
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


  }
  return (
    <main>
      <div className="login__container">
        <p className="typo">Sign Up</p>
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
          authOptions={{
            clientId: "this.glass.web",
            redirectURI: "https://this.glass/",
            state: "state",
            nonce: "nonce",
          }}
          onSuccess={(response) =>
            console.log("response", response)


          }
          onError={(error) => alert("error", error)}

        />

        <div className="login__row">
          <p className="typo typo__b typo__b--2">Already have an account? </p>
          <p
            className="typo typo__b typo__b--2 u-c-pointer"
            onClick={() => props.history.push("/login")}
          >
            &nbsp;<u>Sign In</u>
          </p>
        </div>
      </div>
    </main>
  );
};
export default SignupPage;

