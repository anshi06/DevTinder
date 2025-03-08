import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Body from "../components/Body";
import Profile from "../components/Profile";
import Login from "../components/Login";
import appStore from "../utils/appStore";
import Feed from "../components/Feed";
import Connections from "../components/Connections";
import Requests from "../components/Requests";
import Premium from "../components/Premium";

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
        {
          path: "/connections",
          Component: Connections,
        },
        {
          path: "/requests",
          Component: Requests,
        },
        {
          path: "/premium",
          Component: Premium,
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
