import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import EmojiEvents from "@material-ui/icons/EmojiEvents";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Home from "@material-ui/icons/Home";
import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
import PieChart from "@material-ui/icons/PieChart";

// core components
import CardStats from "components/Cards/Dashboard/CardStats.js";

import componentStyles from "assets/theme/components/headers/stats-header.js";

const useStyles = makeStyles(componentStyles);

const StatsHeader = ({ section, subsection }) => {
  const classes = useStyles();
  const theme = useTheme();
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
            <Grid item xs={7} lg={6} className={classes.gridItem}>
              <Typography
                variant="h2"
                component="h6"
                className={clsx(
                  classes.displayInlineBlock,
                  classes.mb0,
                  classes.textWhite
                )}
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
          <Grid container>
            <Grid item xl={3} lg={6} xs={12}>
              <CardStats
                subtitle="Traffic"
                title="350,897"
                icon={InsertChartOutlined}
                color="bgError"
                footer={
                  <>
                    <Box
                      component="span"
                      fontSize=".875rem"
                      color={theme.palette.success.main}
                      marginRight=".5rem"
                      display="flex"
                      alignItems="center"
                    >
                      <Box
                        component={ArrowUpward}
                        width="1.25rem!important"
                        height="1.25rem!important"
                        marginLeft="-.25rem"
                      />{" "}
                      3.48%
                    </Box>
                    <Box component="span" whiteSpace="nowrap">
                      Since last month
                    </Box>
                  </>
                }
              />
            </Grid>
            <Grid item xl={3} lg={6} xs={12}>
              <CardStats
                subtitle="New users"
                title="2,356"
                icon={PieChart}
                color="bgWarning"
                footer={
                  <>
                    <Box
                      component="span"
                      fontSize=".875rem"
                      color={theme.palette.error.main}
                      marginRight=".5rem"
                      display="flex"
                      alignItems="center"
                    >
                      <Box
                        component={ArrowDownward}
                        width="1.25rem!important"
                        height="1.25rem!important"
                        marginLeft="-.25rem"
                      />{" "}
                      3.48%
                    </Box>
                    <Box component="span" whiteSpace="nowrap">
                      Since last week
                    </Box>
                  </>
                }
              />
            </Grid>
            <Grid item xl={3} lg={6} xs={12}>
              <CardStats
                subtitle="Sales"
                title="924"
                icon={GroupAdd}
                color="bgSuccess"
                footer={
                  <>
                    <Box
                      component="span"
                      fontSize=".875rem"
                      color={theme.palette.warning.main}
                      marginRight=".5rem"
                      display="flex"
                      alignItems="center"
                    >
                      <Box
                        component={ArrowDownward}
                        width="1.25rem!important"
                        height="1.25rem!important"
                        marginLeft="-.25rem"
                      />{" "}
                      1.10%
                    </Box>
                    <Box component="span" whiteSpace="nowrap">
                      Since yesterday
                    </Box>
                  </>
                }
              />
            </Grid>
            <Grid item xl={3} lg={6} xs={12}>
              <CardStats
                subtitle="Performance"
                title="49,65%"
                icon={EmojiEvents}
                color="bgPrimary"
                footer={
                  <>
                    <Box
                      component="span"
                      fontSize=".875rem"
                      color={theme.palette.success.main}
                      marginRight=".5rem"
                      display="flex"
                      alignItems="center"
                    >
                      <Box
                        component={ArrowUpward}
                        width="1.25rem!important"
                        height="1.25rem!important"
                        marginLeft="-.25rem"
                      />{" "}
                      10%
                    </Box>
                    <Box component="span" whiteSpace="nowrap">
                      Since last month
                    </Box>
                  </>
                }
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

StatsHeader.propTypes = {
  section: PropTypes.string,
  subsection: PropTypes.string,
};

export default StatsHeader;
