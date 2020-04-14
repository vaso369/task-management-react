import React, { useReducer, useContext } from "react";
import AllTasks from "../components/AllTasks/AllTasks";
import ProgressTasks from "./../components/ProgressTasks/ProgressTasks";
import DoneTasks from "./../components/DoneTasks/DoneTasks";
import EditProfile from "./../components/EditProfile/EditProfile";
import { defaultPicture } from "../consts/consts";
import YourTeam from "./../components/YourTeam/YourTeam";
import AboutEmployee from "./../components/AboutEmployee/AboutEmployee";
const GlobalStateContext = React.createContext();
const GlobalDispatchContext = React.createContext();

const reducer = (
  state = {
    loggedIn: false,
    user: null,
    editUserInfo: false,
    source: defaultPicture,
    userPicture: "",
    allTasks: true,
    progressTasks: false,
    doneTasks: false,
    yourTeam: false,
    aboutEmployee: false,
    page: 0,
    isLoading: false,
    hasError: false,
    errorMessage: "",
    isSuccess: false,
    successMessage: "",
    notVariant: "",
    activities: [],
    aboutEmployeeData: [],
    team: [],
    allTasksData: [],
    priority: 0,
    showComponents: [
      {
        toShow: true,
        component: <AllTasks />,
      },
      {
        toShow: false,
        component: <ProgressTasks />,
      },
      {
        toShow: false,
        component: <DoneTasks />,
      },
      {
        toShow: false,
        component: <EditProfile />,
      },
    ],
  },
  action
) => {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, loggedIn: true, user: action.data };
    case "SET_TASKS":
      return { ...state, allTasksData: action.data };
    case "SET_TEAM":
      return { ...state, team: action.data };
    case "SET_ACTIVITIES":
      return { ...state, activities: action.data };
    case "SET_PAGE":
      return { ...state, page: action.data };
    case "SET_LOGOUT":
      return { ...state, user: null, loggedIn: false };
    case "SET_SOURCE":
      return { ...state, source: action.data };
    case "SET_PICTURE":
      return { ...state, userPicture: action.data };
    case "SET_PRIORITY":
      return { ...state, priority: action.data };
    case "SET_FETCH_START":
      return {
        ...state,
        isLoading: true,
        hasError: false,
        errorMessage: "",
        isSuccess: false,
        successMessage: "",
        notVariant: "",
      };
    case "SET_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        notVariant: "success",
        isSuccess: true,
        successMessage: action.data,
      };
    case "SET_FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.data,
        notVariant: "error",
      };
    case "SET_FETCH_RESET":
      return {
        ...state,
        isLoading: false,
        hasError: false,
        errorMessage: "",
        isSuccess: false,
        successMessage: "",
        notVariant: "",
      };
    case "EDIT_INFO":
      return {
        ...state,
        editUserInfo: !state.editUserInfo,
        showComponents: [
          {
            toShow: false,
            component: <AllTasks />,
          },
          {
            toShow: false,
            component: <ProgressTasks />,
          },
          {
            toShow: false,
            component: <DoneTasks />,
          },
          {
            toShow: true,
            component: <EditProfile />,
          },
          {
            toShow: false,
            component: <YourTeam />,
          },
        ],
      };
    case "ALL_TASKS":
      return {
        ...state,
        allTasks: true,
        showComponents: [
          {
            toShow: true,
            component: <AllTasks />,
          },
          {
            toShow: false,
            component: <ProgressTasks />,
          },
          {
            toShow: false,
            component: <DoneTasks />,
          },
          {
            toShow: false,
            component: <EditProfile />,
          },
          {
            toShow: false,
            component: <YourTeam />,
          },
        ],
      };
    case "PROGRESS_TASKS":
      return {
        ...state,
        progressTasks: true,
        showComponents: [
          {
            toShow: false,
            component: <AllTasks />,
          },
          {
            toShow: true,
            component: <ProgressTasks />,
          },
          {
            toShow: false,
            component: <DoneTasks />,
          },
          {
            toShow: false,
            component: <EditProfile />,
          },
          {
            toShow: false,
            component: <YourTeam />,
          },
        ],
      };
    case "DONE_TASKS":
      return {
        ...state,
        doneTasks: true,
        showComponents: [
          {
            toShow: false,
            component: <AllTasks />,
          },
          {
            toShow: false,
            component: <ProgressTasks />,
          },
          {
            toShow: true,
            component: <DoneTasks />,
          },
          {
            toShow: false,
            component: <EditProfile />,
          },
          {
            toShow: false,
            component: <YourTeam />,
          },
        ],
      };
    case "YOUR_TEAM":
      return {
        ...state,
        yourTeam: true,
        showComponents: [
          {
            toShow: false,
            component: <AllTasks />,
          },
          {
            toShow: false,
            component: <ProgressTasks />,
          },
          {
            toShow: false,
            component: <DoneTasks />,
          },
          {
            toShow: false,
            component: <EditProfile />,
          },
          {
            toShow: true,
            component: <YourTeam />,
          },
        ],
      };
    case "ABOUT_EMPLOYEE":
      return {
        ...state,
        aboutEmployee: true,
        aboutEmployeeData: action.data,
        showComponents: [
          {
            toShow: false,
            component: <AllTasks />,
          },
          {
            toShow: false,
            component: <ProgressTasks />,
          },
          {
            toShow: false,
            component: <DoneTasks />,
          },
          {
            toShow: false,
            component: <EditProfile />,
          },
          {
            toShow: false,
            component: <YourTeam />,
          },
          {
            toShow: true,
            component: <AboutEmployee />,
          },
        ],
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    loggedIn: false,
    user: null,
    editUserInfo: false,
    source: defaultPicture,
    userPicture: "",
    allTasks: true,
    yourTeam: false,
    aboutEmployee: false,
    page: 0,
    isLoading: false,
    hasError: false,
    errorMessage: "",
    isSuccess: false,
    successMessage: "",
    notVariant: "",
    aboutEmployeeData: [],
    activities: [],
    allTasksData: [],
    priority: 0,
    showComponents: [
      {
        toShow: true,
        component: <AllTasks />,
      },
      {
        toShow: false,
        component: <ProgressTasks />,
      },
      {
        toShow: false,
        component: <DoneTasks />,
      },
      {
        toShow: false,
        component: <EditProfile />,
      },
    ],
  });
  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export const useStateGlobal = () => useContext(GlobalStateContext);
export const useDispatchState = () => useContext(GlobalDispatchContext);
