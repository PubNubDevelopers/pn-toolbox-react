import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
// @material-ui/lab components
// @material-ui/icons components
import Delete from "@material-ui/icons/Delete";
// core components
import componentStyles from "assets/theme/components/cards/tables/card-light-table-tables.js";
import componentStylesButton from "assets/theme/components/button.js";

const useStyles = makeStyles(componentStyles);
const useStylesButton = makeStyles(componentStylesButton);

let date = new Date();

const tableHead = ["Author", "Created at", "Product", "Active"];
const tableBody = [
  {
    author: "John Michael",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Argon Dashboard PRO",
    active: (
      <Switch
        color="primary"
        defaultChecked
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    ),
  },
  {
    author: "Alex Smith",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Argon Design System",
    active: (
      <Switch
        color="primary"
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    ),
  },
  {
    author: "Samantha Ivy",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Black Dashboard",
    active: (
      <Switch
        color="primary"
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    ),
  },
  {
    author: "John Michael",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Argon Dashboard PRO",
    active: (
      <Switch
        color="primary"
        defaultChecked
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    ),
  },
  {
    author: "John Michael",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Argon Dashboard PRO",
    active: (
      <Switch
        color="primary"
        defaultChecked
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    ),
  },
];

export default function CardCheckboxesColors() {
  const classes = { ...useStyles(), ...useStylesButton() };
  const theme = useTheme();
  return (
    <>
      <Card
        classes={{
          root: classes.cardRoot + " " + classes.cardRootCheckboxColors,
        }}
      >
        <CardHeader
          subheader={
            <Grid
              container
              component={Box}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs="auto">
                <Box
                  component={Typography}
                  variant="h2"
                  marginBottom="0!important"
                >
                  <Box component="span">Checkbox + Toggles + Colors</Box>
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
                  <Button
                    variant="contained"
                    size="small"
                    classes={{
                      root: classes.buttonContainedError,
                    }}
                  >
                    <Box component={Delete} position="relative" top="-2px" />{" "}
                    Export
                  </Button>
                </Box>
              </Grid>
            </Grid>
          }
          classes={{ root: classes.cardHeaderRoot }}
        ></CardHeader>
        <TableContainer>
          <Box component={Table} alignItems="center" marginBottom="0!important">
            <TableHead>
              <TableRow>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.tableCellRootHead,
                  }}
                >
                  <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
                </TableCell>
                {tableHead.map((prop, key) => (
                  <TableCell
                    key={key}
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody.map((prop, key) => (
                <TableRow key={key}>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Checkbox
                      inputProps={{ "aria-label": "primary checkbox" + key }}
                    />
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot +
                        " " +
                        classes.tableCellRootBodyHead,
                    }}
                    component="th"
                    variant="head"
                    scope="row"
                  >
                    {prop.author}
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box component="span" color={theme.palette.gray[600]}>
                      {prop.createdAt}
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <a
                      href="#mui"
                      onClick={(e) => e.preventDefault}
                      className={classes.anchorStyles}
                    >
                      {prop.product}
                    </a>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    {prop.active}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Box>
        </TableContainer>
      </Card>
    </>
  );
}
