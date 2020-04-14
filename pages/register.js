import React from "react";
import RegisterPage from "../components/Register/Register";
import Background from "../components/Background/Background";
import { useStateGlobal, useDispatchState } from "../src/GlobalState";

const Register = () => {
  const globalState = useStateGlobal();
  // const handleTrue = () => {

  // }
  console.log(globalState);
  return (
    <React.Fragment>
      <Background />
      <RegisterPage />
    </React.Fragment>
  );
};
export default Register;
