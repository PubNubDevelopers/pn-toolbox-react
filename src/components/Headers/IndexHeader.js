import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Extension from "@material-ui/icons/Extension";
import Dashboard from "@material-ui/icons/Dashboard";
import Pageview from "@material-ui/icons/Pageview";
import Layers from "@material-ui/icons/Layers";
// core components
import CardInfo from "components/Cards/Index/CardInfo.js";
import componentStyles from "assets/theme/components/headers/index-header.js";

const useStyles = makeStyles(componentStyles);

const IndexHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Box
        className={classes.header}
        position="relative"
        paddingTop="3rem"
        paddingBottom="8rem"
      >
        <Container maxWidth="xl">
          <Box>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={6}>
                <Box paddingRight="3rem">
                  <Typography
                    variant="h1"
                    component="h1"
                    className={classes.typographyH1}
                  >
                    Argon Dashboard PRO Material-UI
                  </Typography>
                  <Typography
                    variant="h2"
                    component="h2"
                    className={classes.typographyH2}
                  >
                    A beautiful premium dashboard for Material-UI, React and
                    React Hooks.
                  </Typography>
                  <Box
                    component="p"
                    color={theme.palette.white.main}
                    fontWeight="300"
                    lineHeight="1.7"
                    fontSize="1rem"
                    marginBottom="1rem"
                    marginTop="1.5rem"
                  >
                    Argon perfectly combines reusable HTML and modular CSS with
                    a modern styling and beautiful markup throughout each HTML
                    template in the pack.
                  </Box>
                  <Box marginTop="3rem">
                    <Button
                      component={Link}
                      variant="contained"
                      to="/admin/dashboard"
                      classes={{ root: classes.buttonRoot }}
                    >
                      Explore dashboard
                    </Button>
                    <Button
                      component="a"
                      variant="contained"
                      color="default"
                      href="https://www.creative-tim.com/product/argon-dashboard-pro-material-ui?ref=adpmui-index-header"
                      target="_blank"
                    >
                      Purchase now
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box component={Grid} container paddingTop="3rem">
                  <Grid item xs={12} md={6}>
                    <CardInfo
                      subtitle="Argon comes with over 70 handcrafted components."
                      title="Components"
                      icon={Dashboard}
                      color="red"
                    />
                    <CardInfo
                      subtitle="Fully integrated and extendable third-party plugins that you will love."
                      title="Plugins"
                      icon={Extension}
                      color="blue"
                    />
                  </Grid>
                  <Box
                    component={Grid}
                    item
                    xs={12}
                    md={6}
                    paddingTop="1.5rem"
                    className={classes.ptLg5}
                  >
                    <CardInfo
                      subtitle="From simple to complex, you get a beautiful set of 15+ page examples."
                      title="Pages"
                      icon={Layers}
                      color="green"
                    />
                    <CardInfo
                      subtitle="You will love how easy is to to work with Argon."
                      title="Documentation"
                      icon={Pageview}
                      color="orange"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Box
          position="absolute"
          zIndex="100"
          height="70px"
          top="auto"
          bottom="0"
          pointerEvents="none"
          left="0"
          right="0"
          width="100%"
          overflow="hidden"
          transform="translateZ(0)"
        >
          <Box
            bottom="0"
            position="absolute"
            pointerEvents="none"
            component="svg"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <Box
              component="polygon"
              fill={theme.palette.dark.main}
              points="2560 0 2560 100 0 100"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default IndexHeader;
