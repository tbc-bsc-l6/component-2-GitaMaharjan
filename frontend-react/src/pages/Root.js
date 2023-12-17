import { Outlet } from "react-router-dom";

import Header from "../components/Layout/Header/header";

function RootLayout() {
  // const navigation = useNavigation();
  return (
    <>
      <Header></Header>
      {/* <main> */}
      {/* {navigation.state === "loading" && <p>Loading...</p>} */}
      <Outlet />
      {/* </main> */}
    </>
  );
}

export default RootLayout;
