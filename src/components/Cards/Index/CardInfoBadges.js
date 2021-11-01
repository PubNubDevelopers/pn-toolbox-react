import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/cards/index/card-info-badges.js";
import badgeStyles from "assets/theme/components/badge.js";
import boxShadows from "assets/theme/box-shadow.js";

const useStyles = makeStyles(componentStyles);
const useStylesBadge = makeStyles(badgeStyles);

function CardInfo({ subtitle, title, icon, color, badges }) {
  const classes = { ...useStyles(), ...useStylesBadge() };
  const theme = useTheme();
  const badgeColors = {
    red: "badgeError",
    green: "badgeSuccess",
    blue: "badgeInfo",
    orange: "badgeWarning",
  };
  return (
    <>
      <Card className={classes.cardRoot} elevation={0}>
        <CardContent>
          <Box
            color={theme.palette.white.main}
            padding="12px"
            textAlign="center"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            width="3rem"
            height="3rem"
            marginBottom="1.5rem"
            boxShadow={boxShadows.boxShadow}
            className={clsx(classes.iconWrapper, classes[color + "BgGradient"])}
          >
            {icon && typeof icon === "object" ? (
              <Box
                component={icon}
                width="1.5rem!important"
                height="1.5rem!important"
              />
            ) : null}
            {icon && typeof icon === "string" ? (
              <Box component="i" fontSize="1.25rem" className={icon} />
            ) : null}
          </Box>
          <Typography
            variant="h3"
            component="h4"
            className={clsx(classes.title, classes[color + "Text"])}
          >
            {title}
          </Typography>
          <Box
            component="p"
            fontWeight="300"
            lineHeight="1.7"
            fontSize="1rem"
            marginBottom="1rem"
            marginTop="0"
          >
            {subtitle}
          </Box>
          <div>
            {badges.map((prop, key) => (
              <Badge
                key={key}
                badgeContent={prop}
                classes={{
                  root: classes.marginRight2,
                  badge: clsx(
                    classes.badgeRound,
                    classes.badgePositionRelative,
                    classes[badgeColors[color]]
                  ),
                }}
              ></Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

CardInfo.defaultProps = {
  color: "red",
  badges: [],
};

CardInfo.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.oneOfType([
    // i.e. an icon name from Nucleo Icons - e.g. ni ni-atom
    // // or an icon name from Font Awesome - e.g. fa fa-heart
    PropTypes.string,
    // i.e. a component from @material-ui/icons
    PropTypes.object,
  ]),
  color: PropTypes.oneOf(["red", "green", "blue", "orange"]),
  badges: PropTypes.arrayOf(PropTypes.string),
};

export default CardInfo;
