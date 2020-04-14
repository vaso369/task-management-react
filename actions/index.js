import axios from "axios";
// import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
// import Router from "next/router";

// const globalState = useStateGlobal();
// const dispatch = useDispatchState();

export const postData = async (url) => {
  return await axios.get(url).then((response) => console.log(response.data));
};

export const postLoginData = async (url, loginObj) => {
  return await axios
    .post(url, loginObj)
    .then((data) => {
      localStorage.setItem("token", data.data.jwt);
      dispatch({
        type: "SET_SOURCE",
        data:
          "https://task-sys-laravel.herokuapp.com/user_pictures/" +
          data.data.user.imagePath,
      });
      dispatch({
        type: "SET_PICTURE",
        data: data.data.user.imagePath,
      });
      dispatch({
        type: "SET_LOGIN",
        data: data.data.user,
      });

      if (data.data.user.idPart === 2) {
        Router.push("/employee");
        //  setLoading(false);
      } else {
        Router.push("/boss");
        //  setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      alert("You are not registered!");
    });
};
