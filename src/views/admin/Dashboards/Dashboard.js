import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components

// core components
import StatsHeader from "components/Headers/StatsHeader.js";
import CardSalesValue from "components/Cards/Dashboard/CardSalesValue.js";

import CardTeamMembers from "components/Cards/Dashboard/CardTeamMembers.js";
import CardToDoList from "components/Cards/Dashboard/CardToDoList.js";
import CardProgressTrack from "components/Cards/Dashboard/CardProgressTrack.js";
import CardActivityFeed from "components/Cards/Dashboard/CardActivityFeed.js";
import CardLightTable from "components/Cards/Dashboard/CardLightTable.js";
import CardCreditDetails from "components/Cards/Dashboard/CardCreditDetails.js";
import CardCredit from "components/Cards/Dashboard/CardCredit.js";
import CardPageVisits from "components/Cards/Dashboard/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/Dashboard/CardSocialTraffic.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";
import componentStylesCardDeck from "assets/theme/components/cards/card-deck.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardDeck = makeStyles(componentStylesCardDeck);

function Dashboard() {
  const classes = { ...useStyles(), ...useStylesCardDeck() };
  return (
    <>
      <StatsHeader section="Default" subsection="Dashboards" />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid item xs={12} xl={8} classes={{ root: classes.gridItemRoot }}>
            <CardSalesValue />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} xl={4}>
            <CardTeamMembers />
          </Grid>
          <Grid item xs={12} xl={4}>
            <CardToDoList />
          </Grid>
          <Grid item xs={12} xl={4}>
            <CardProgressTrack />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} xl={5}>
            <CardActivityFeed />
          </Grid>
          <Grid item xs={12} xl={7}>
            <Grid container>
              <Grid item xs={12}>
                <CardLightTable />
              </Grid>
            </Grid>
            <div className={classes.cardDeck}>
              <CardCreditDetails />
              <CardCredit />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} xl={8} classes={{ root: classes.gridItemRoot }}>
            <CardPageVisits />
          </Grid>
          <Grid item xs={12} xl={4}>
            <CardSocialTraffic />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
