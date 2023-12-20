import { Outlet } from "react-router-dom";

import Header from "../components/Layout/Header/header";
import Footer from "../components/Layout/Footer/footer";

function RootLayout() {
  // const navigation = useNavigation();
  return (
    <>
      <Header></Header>
      {/* <Footer></Footer> */}
      {/* <main> */}
      {/* {navigation.state === "loading" && <p>Loading...</p>} */}
      <Outlet />
      {/* </main> */}
    </>
  );
}

export default RootLayout;
