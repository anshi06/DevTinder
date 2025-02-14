import { createBrowserRouter, RouterProvider } from "react-router";
import Body from "./Body";
import Profile from "./Profile";
import Login from "./Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Body,
      children: [
        {
          path: "/login",
          Component: Login
        },
        {
          path: "/profile",
          Component: Profile
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
