import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Home from "@material-ui/icons/Home";

// core components
import componentStyles from "assets/theme/components/headers/alternative-header.js";

const useStyles = makeStyles(componentStyles);

const Header = ({ section, subsection }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <Grid
            container
            component={Box}
            alignItems="center"
            paddingTop="1.5rem"
            paddingBottom="1.5rem"
          >
            <Grid item xs={7} lg={6}>
              <Typography
                variant="h2"
                component="h6"
                className={clsx(classes.displayInlineBlock, classes.mb0)}
              >
                {section}
              </Typography>
              <Breadcrumbs
                separator="-"
                aria-label="breadcrumb"
                classes={{
                  root: classes.breadcrumbRoot,
                  li: classes.breadcrumbLi,
                  ol: classes.breadcrumbOl,
                  separator: classes.breadcrumbSeparator,
                }}
              >
                <Link
                  color="inherit"
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <Box
                    component={Home}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    top="2px"
                    position="relative"
                  />
                </Link>
                <Link
                  color="inherit"
                  href="/getting-started/installation/"
                  onClick={(e) => e.preventDefault()}
                >
                  {subsection}
                </Link>
                <Typography
                  component="span"
                  className={classes.breadcrumbActive}
                >
                  {section}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={5} lg={6} component={Box} textAlign="right">
              <Button
                variant="contained"
                size="small"
                className={classes.buttonRoot}
              >
                New
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.buttonRoot}
              >
                Filters
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

Header.propTypes = {
  section: PropTypes.string,
  subsection: PropTypes.string,
};

export default Header;
