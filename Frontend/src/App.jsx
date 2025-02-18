import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Body from "../components/Body";
import Profile from "../components/Profile";
import Login from "../components/Login";
import appStore from "../utils/appStore";
import Feed from "../components/Feed";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Body,
      children: [
        {
          path: "/",
          Component: Feed,
        },
        {
          path: "/login",
          Component: Login,
        },
        {
          path: "/profile",
          Component: Profile,
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
