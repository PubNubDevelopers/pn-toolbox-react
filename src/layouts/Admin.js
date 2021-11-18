import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

// @material-ui/icons components

// core components
// import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import AdminNavbarAlternative from "components/Navbars/AdminNavbarAlternative.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import componentStyles from "assets/theme/layouts/admin.js";

import { KeySetProvider } from "../tools/KeySetProvider";
import Header from "components/Headers/Header";

const useStyles = makeStyles(componentStyles);

const Admin = (props) => {
  console.log("ADMIN props:", props);

  const classes = useStyles();
  const location = useLocation();
  const [sidebarOpenResponsive, setSidebarOpenResponsive] = React.useState(false);
  const parent = React.useRef(null);

  // const [serverData, setServerData] = useState(null);

  React.useEffect(() => {
    console.log("useEffect");

    // callBackendAPI().then(res => {
    //   console.log("    res", res);
    //   setServerData(res.express);
    // })
    // .catch(err => {
    //   console.log(err);
    // });

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;
  }, [location]);
  
  // const callBackendAPI = async () => {
  //   console.log("callBackendAPI");

  //   const response = await fetch('http://localhost:5000/express_backend');
  //   console.log("    response", response);

  //   const body = await response.json();
  
  //   if (response.status !== 200) {
  //     console.log("    error", body.message);
  //     throw Error(body.message) 
  //   }

  //   console.log("    body", body);
  //   return body;
  // };

  const getRoutes = (routes) => {
    console.log("getRoutes: location", 
      props.location ? props.location.pathname : "no pathname");

    return routes.map((route, key) => {
      if (route.collapse) {
        return getRoutes(route.views);
      }
      if (route.layout === "/admin") {
        const pathName = route.layout + route.path;

        if (props.location.pathname === pathName) {
          parent.current = route.parent;
        }
        return (
          <Route
            path={pathName}
            component={route.component}
            key={key}
            parent={route.parent}
          />
        );
      } 
      else return null;
    });
  };
  
  console.log("    before return", parent.current);

  return (
    <>
      <KeySetProvider>
        <Box display="flex">
          <Sidebar
            routes={routes}
            openResponsive={sidebarOpenResponsive}
            closeSidebarResponsive={() => setSidebarOpenResponsive(false)}
            logo={{
              innerLink: "/index",
              imgSrc: require("../assets/img/brand/pubnub-logo.png").default,
              imgAlt: "...",
            }}
          />
          <Box position="relative" flex="1" className={classes.mainContent}>
            {/* hide the top level navbar until we need it */}
            {/* {location.pathname === "/admin/alternative-dashboard" ? (
              <AdminNavbarAlternative
                openSidebarResponsive={() => setSidebarOpenResponsive(true)}
              />
            ) : (
              <AdminNavbar
                openSidebarResponsive={() => setSidebarOpenResponsive(true)}
              />
            )} */}

            <AppParent props={props} parent={parent}>
              <Header/>

              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/key-set" />
              </Switch>

              <Container
                maxWidth={false}
                component={Box}
                classes={{ root: classes.containerRoot }}
              >
                <AdminFooter />
              </Container>
            </AppParent>
          </Box>
        </Box>
      </KeySetProvider>
    </>
  );
};

export default Admin;

const AppParent = (props) => {
  console.log("AppParent", props);

  if (props.parent.current != null) {
    console.log("returning AppParent: props=", props.parent.current);
    const Component = props.parent.current;

    return (
      <Component {...props}>{props.children}</Component>
    ); 
  }
}
