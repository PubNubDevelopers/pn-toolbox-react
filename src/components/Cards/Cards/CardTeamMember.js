import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components

import componentStyles from "assets/theme/components/cards/cards/card-team-member.js";

const useStyles = makeStyles(componentStyles);

function CardTeamMember() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Card className={classes.cardRoot}>
        <CardContent>
          <Grid container component={Box} alignItems="center">
            <Grid item xs="auto">
              <Avatar
                alt="..."
                className={classes.avatarRoot}
                src={require("assets/img/theme/team-2.jpg").default}
              />
            </Grid>
            <Grid item className={classes.gridItemRoot}>
              <Typography variant="h4" component="h4" className={classes.mb0}>
                John Snow
              </Typography>
              <Box
                component="p"
                marginBottom="0"
                fontWeight="300"
                lineHeight="1.7"
                fontSize=".875rem"
                marginTop="0"
                color={theme.palette.gray[600]}
              >
                Working remoteley
              </Box>
              <Box color={theme.palette.success.main} component="span">
                ●
              </Box>
              <Box fontSize="80%" fontWeight="400" component="small">
                Active
              </Box>
            </Grid>
            <Grid item xs="auto">
              <Button size="small" variant="contained" color="primary">
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default CardTeamMember;
