import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
// core components
import componentStyles from "assets/theme/components/cards/dashboard/card-credit-details.js";

const useStyles = makeStyles(componentStyles);

export default function CardCreditDetails() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      {
        <Card className={classes.cardRoot}>
          <CardContent>
            <Box marginBottom=".5rem">
              <Box
                component="sup"
                color={theme.palette.white.main}
                position="relative"
                fontSize="75%"
                lineHeight="0"
                marginRight=".25rem"
              >
                $
              </Box>
              <Typography
                variant="h2"
                component="span"
                className={classes.typographyH2}
              >
                3,300
              </Typography>
              <Box
                color={theme.palette.gray[400]}
                fontSize=".875rem"
                marginTop=".5rem"
              >
                Your current balance
              </Box>
              <div>
                <Box
                  component="span"
                  color={theme.palette.success.main}
                  marginRight=".5rem"
                >
                  + 15%
                </Box>
                <Box component="span" color={theme.palette.gray[400]}>
                  ($250)
                </Box>
              </div>
            </Box>
            <Button size="small" fullWidth className={classes.buttonRoot}>
              Add credit
            </Button>
          </CardContent>
          <CardContent>
            <Grid container>
              <Grid item xs={6}>
                <Box
                  color={theme.palette.gray[400]}
                  fontSize="80%"
                  fontWeight="400"
                  component="small"
                >
                  Orders: 60%
                </Box>
                <Box width="100%">
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    classes={{
                      root: classes.linearProgressRoot,
                      bar: classes.bgSuccess,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  color={theme.palette.gray[400]}
                  fontSize="80%"
                  fontWeight="400"
                  component="small"
                >
                  Sales: 40%
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={40}
                  classes={{
                    root: classes.linearProgressRoot,
                    bar: classes.bgWarning,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      }
    </>
  );
}
