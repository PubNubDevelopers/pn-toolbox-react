import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
// @material-ui/icons components
import CreditCard from "@material-ui/icons/CreditCard";
import Event from "@material-ui/icons/Event";
import Lock from "@material-ui/icons/Lock";
import Person from "@material-ui/icons/Person";
// core components
import componentStyles from "assets/theme/components/cards/widgets/card-credit-inputs.js";
import componentStylesSwitch from "assets/theme/components/switch.js";
import componentStylesButtons from "assets/theme/components/button.js";

const useStyles = makeStyles(componentStyles);
const useStylesSwitch = makeStyles(componentStylesSwitch);
const useStylesButtons = makeStyles(componentStylesButtons);

export default function CardCreditNumber() {
  const classes = {
    ...useStyles(),
    ...useStylesSwitch(),
    ...useStylesButtons(),
  };
  const theme = useTheme();
  return (
    <>
      <Card className={classes.cardRoot}>
        <CardContent>
          <Grid
            container
            component={Box}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs="auto">
              <Box
                component="img"
                className={classes.boxImg}
                src={require("assets/img/icons/cards/mastercard.png").default}
                alt="..."
              ></Box>
            </Grid>
            <Grid item xs="auto">
              <Box display="flex" alignItems="center">
                <Box
                  component="small"
                  fontSize="80%"
                  fontWeight="600"
                  marginRight="1rem"
                  color={theme.palette.white.main}
                >
                  Make default
                </Box>
                <Switch
                  name="checkedA"
                  defaultChecked
                  classes={{
                    thumb: classes.whiteSwitchThumb,
                    track: classes.whiteSwitchTrack,
                    checked: classes.checkedSwitch,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box marginTop="1.5rem">
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="text"
                placeholder="Name on card"
                classes={{
                  root: classes.inputBg,
                  input: classes.bgTransparent,
                }}
                startAdornment={
                  <InputAdornment
                    position="start"
                    className={classes.bgTransparent}
                  >
                    <Person />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="text"
                placeholder="Card number"
                classes={{
                  root: classes.inputBg,
                  input: classes.bgTransparent,
                }}
                startAdornment={
                  <InputAdornment
                    position="start"
                    className={classes.bgTransparent}
                  >
                    <CreditCard />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Grid container>
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
                  marginBottom="1rem!important"
                >
                  <FilledInput
                    autoComplete="off"
                    type="text"
                    placeholder="MM/YY"
                    classes={{
                      root: classes.inputBg,
                      input: classes.bgTransparent,
                    }}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        className={classes.bgTransparent}
                      >
                        <Event />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
                  marginBottom="1rem!important"
                >
                  <FilledInput
                    autoComplete="off"
                    type="text"
                    placeholder="Card number"
                    classes={{
                      root: classes.inputBg,
                      input: classes.bgTransparent,
                    }}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        className={classes.bgTransparent}
                      >
                        <Lock />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              classes={{
                root: classes.buttonContainedInfo,
              }}
              fullWidth
            >
              Save new card
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
