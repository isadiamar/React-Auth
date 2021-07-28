import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      {/*Navigation*/}
      <MainNavigation />
      {/*Body of the page */}
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
