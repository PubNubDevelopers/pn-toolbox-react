/* eslint-disable react/jsx-no-target-blank*/
import React from "react";
import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Build from "@material-ui/icons/Build";
import Code from "@material-ui/icons/Code";
import Done from "@material-ui/icons/Done";
import Public from "@material-ui/icons/Public";
import EmojiEmotions from "@material-ui/icons/EmojiEmotions";
import Settings from "@material-ui/icons/Settings";
// import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
// core components

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import CardInfoBadges from "components/Cards/Index/CardInfoBadges.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import componentStyles from "assets/theme/views/index.js";
import badgeStyles from "assets/theme/components/badge.js";
import buttonStyles from "assets/theme/components/button.js";

const useStyles = makeStyles(componentStyles);
const useStylesBadge = makeStyles(badgeStyles);
const useStylesButton = makeStyles(buttonStyles);

const technologies = [
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-material-ui.png",
    description:
      "React components for faster and easier web development. Build your own design system, or start with Material Design.",
    href:
      "https://www.creative-tim.com/product/argon-dashboard-pro-material-ui",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-sketch.png",
    description:
      "Create, prototype, collaborate, and bring your ideas to life with the design platform used by over one million people — from freelancers, to the world’s largest teams.",
    href:
      "https://www.creative-tim.com/product/argon-dashboard-pro-material-ui",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-xd.png",
    description:
      "Share your story with designs that look and feel like the real thing. Wireframe, animate, prototype, collaborate, and more — it’s all right here, all in one UI/UX design tool.",
    href:
      "https://www.creative-tim.com/product/argon-dashboard-pro-material-ui",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-figma.png",
    description:
      "Figma helps teams create, test, and ship better designs from start to finish.",
    href:
      "https://www.creative-tim.com/product/argon-dashboard-pro-material-ui",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-react.png",
    description: "A JavaScript library for building user interfaces",
    href: "https://www.creative-tim.com/product/argon-dashboard-pro-react",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-bootstrap.png",
    description: "Bootstrap 4 - Build fast, responsive sites with Bootstrap",
    href: "https://www.creative-tim.com/product/argon-dashboard-pro",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-vue.png",
    description: "The Progressive JavaScript Framework",
    href: "https://www.creative-tim.com/product/vue-argon-dashboard-pro",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-nuxtjs.png",
    description:
      "Build your next Vue.js application with confidence using NuxtJS. An open source framework making web development simple and powerful.",
    href: "https://www.creative-tim.com/product/nuxt-argon-dashboard-pro",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-angular.png",
    description:
      "Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.",
    href: "https://www.creative-tim.com/product/argon-dashboard-pro-angular",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-bootstrapvue.png",
    description:
      "With BootstrapVue you can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library — Bootstrap v4.",
    href:
      "https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard-pro",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-laravel.png",
    description:
      "Laravel is a web application framework with expressive, elegant syntax.",
    href: "https://www.creative-tim.com/product/argon-dashboard-pro-laravel",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-react-native.png",
    description:
      "React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.",
    href: "https://www.creative-tim.com/product/argon-pro-react-native",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-nextjs.png",
    description:
      "Next.js gives you the best developer experience with all the features you need for production.",
    href: "https://www.creative-tim.com/product/nextjs-argon-dashboard-pro",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-nodejs.png",
    description:
      "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    href: "https://www.creative-tim.com/product/argon-dashboard-pro-nodejs",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-svelte.png",
    description:
      "Svelte is a radical new approach to building user interfaces.",
    href: "https://www.creative-tim.com/product/argon-dashboard-pro-svelte",
  },
  {
    image:
      "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/icons-png/icon-flutter.png",
    description:
      "Flutter is Google’s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
    href: "https://www.creative-tim.com/product/argon-pro-flutter",
  },
];

export default function Index() {
  const classes = { ...useStyles(), ...useStylesBadge(), ...useStylesButton() };
  const theme = useTheme();
  const location = useLocation();
  React.useEffect(() => {
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
  }, [location]);
  return (
    <>
      <IndexNavbar />
      <Box position="relative">
        <IndexHeader />
        <Box
          paddingTop="4.5rem"
          paddingBottom="10rem"
          component="section"
          className={classes.bgDefault}
        >
          <Container maxWidth={false}>
            <Grid container className={classes.centerElements}>
              <Grid item xs={12} md={6}>
                <Typography
                  component="h2"
                  variant="h2"
                  className={classes.typographyH2}
                >
                  A complete React solution
                </Typography>
                <Box
                  component="p"
                  color={theme.palette.white.main}
                  fontWeight="300"
                  lineHeight="1.7"
                  fontSize="1.25rem"
                  marginBottom="1rem"
                  marginTop="1.5rem"
                >
                  Argon is a completly new product built on our newest re-built
                  from scratch framework structure that is meant to make our
                  products more intuitive, more adaptive and, needless to say,
                  so much easier to customize. Let Argon amaze you with its cool
                  features and build tools and get your project to a whole new
                  level.
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box marginTop="-6rem">
          <Container maxWidth="xl">
            <Grid container className={classes.justifyContentCenter}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <CardInfoBadges
                      icon={Done}
                      color="blue"
                      title="Based on React and Material-UI"
                      subtitle="Argon is built on top of the most popular open source toolkit for developing with HTML, CSS, and JS."
                      badges={["react", "material-ui", "hooks", "template"]}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CardInfoBadges
                      icon={Build}
                      color="green"
                      title="Integrated build tools"
                      subtitle="Use Argons's included npm scripts to compile source code, scss and more with just a few simple commands."
                      badges={["npm", "build tools"]}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CardInfoBadges
                      icon={Public}
                      color="orange"
                      title="Full JSS ans SCSS support"
                      subtitle="Argon makes customization easier than ever before. You get all the tools to make your website building process a breeze."
                      badges={["scss", "jss customize"]}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box paddingTop="4.5rem" paddingBottom="4.5rem" component="section">
          <Container maxWidth="xl">
            <Grid container alignItems="center">
              <Grid item xs={12} md={6} className={classes.orderMd2}>
                <Box
                  component="img"
                  alt="..."
                  maxWidth="100%"
                  height="auto"
                  className={classes.imgBox}
                  src={require("assets/img/theme/landing-1.png").default}
                ></Box>
              </Grid>
              <Grid item xs={12} md={6} className={classes.orderMd1}>
                <div className={classes.prMd5}>
                  <Typography variant="h1" component="h1">
                    Awesome features
                  </Typography>
                  <Box
                    component="p"
                    fontWeight="300"
                    lineHeight="1.7"
                    fontSize="1rem"
                    marginBottom="1rem"
                    marginTop="0"
                  >
                    he kit comes with three pre-built pages to help you get
                    started faster. You can change the text and images and
                    you're good to go.
                  </Box>
                  <Box
                    component="ul"
                    marginTop="3rem"
                    paddingLeft="0"
                    className={classes.listStyleNone}
                  >
                    <Box
                      component="li"
                      paddingTop=".5rem"
                      paddingBottom=".5rem"
                    >
                      <Box display="flex" alignItems="center">
                        <div>
                          <Badge
                            badgeContent={<Settings />}
                            classes={{
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeCircle,
                                classes.badgeSuccess
                              ),
                            }}
                          ></Badge>
                        </div>
                        <div>
                          <Typography
                            variant="h4"
                            component="h4"
                            className={classes.typographyH4}
                          >
                            Carefully crafted components
                          </Typography>
                        </div>
                      </Box>
                    </Box>
                    <Box
                      component="li"
                      paddingTop=".5rem"
                      paddingBottom=".5rem"
                    >
                      <Box display="flex" alignItems="center">
                        <div>
                          <Badge
                            badgeContent={<Code />}
                            classes={{
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeCircle,
                                classes.badgeSuccess
                              ),
                            }}
                          ></Badge>
                        </div>
                        <div>
                          <Typography
                            variant="h4"
                            component="h4"
                            className={classes.typographyH4}
                          >
                            Amazing page examples
                          </Typography>
                        </div>
                      </Box>
                    </Box>
                    <Box
                      component="li"
                      paddingTop=".5rem"
                      paddingBottom=".5rem"
                    >
                      <Box display="flex" alignItems="center">
                        <div>
                          <Badge
                            badgeContent={<EmojiEmotions />}
                            classes={{
                              badge: clsx(
                                classes.badgePositionRelative,
                                classes.badgeCircle,
                                classes.badgeSuccess
                              ),
                            }}
                          ></Badge>
                        </div>
                        <div>
                          <Typography
                            variant="h4"
                            component="h4"
                            className={classes.typographyH4}
                          >
                            Super friendly support team
                          </Typography>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box paddingTop="4.5rem" paddingBottom="4.5rem" component="section">
          <Container maxWidth="xl">
            <Grid container alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  alt="..."
                  maxWidth="100%"
                  height="auto"
                  className={classes.imgBox}
                  src={require("assets/img/theme/landing-2.png").default}
                ></Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={classes.prMd5}>
                  <Typography variant="h1" component="h1">
                    Example pages
                  </Typography>
                  <Box
                    component="p"
                    fontWeight="300"
                    lineHeight="1.7"
                    fontSize="1rem"
                    marginBottom="1rem"
                    marginTop="0"
                  >
                    If you want to get inspiration or just show something
                    directly to your clients, you can jump start your
                    development with our pre-built example pages.
                  </Box>
                  <Box
                    component={Link}
                    to="/admin/profile"
                    color={theme.palette.warning.main}
                    marginTop="3rem"
                    fontWeight="600"
                    className={classes.warningAnchor}
                  >
                    Explore pages
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box paddingTop="4.5rem" paddingBottom="4.5rem" component="section">
          <Container maxWidth="xl">
            <Grid container alignItems="center">
              <Grid item xs={12} md={6} className={classes.orderMd2}>
                <Box
                  component="img"
                  alt="..."
                  maxWidth="100%"
                  height="auto"
                  className={classes.imgBox}
                  src={require("assets/img/theme/landing-3.png").default}
                ></Box>
              </Grid>
              <Grid item xs={12} md={6} className={classes.orderMd1}>
                <div className={classes.prMd5}>
                  <Typography variant="h1" component="h1">
                    Lovable widgets and cards
                  </Typography>
                  <Box
                    component="p"
                    fontWeight="300"
                    lineHeight="1.7"
                    fontSize="1rem"
                    marginBottom="1rem"
                    marginTop="0"
                  >
                    We love cards and everybody on the web seems to. We have
                    gone above and beyond with options for you to organise your
                    information. From cards designed for content, to pricing
                    cards or user profiles, you will have many options to choose
                    from.
                  </Box>
                  <Box
                    component={Link}
                    to="/admin/profile"
                    color={theme.palette.info.main}
                    marginTop="3rem"
                    fontWeight="600"
                    className={classes.infoAnchor}
                  >
                    Explore widgets
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          paddingTop="6rem"
          paddingBottom="6rem"
          component="section"
          overflow="hidden"
          className={classes.bgWhite}
        >
          <Container maxWidth="xl">
            <Grid container className={classes.justifyContentCenter}>
              <Grid item xs={12} lg={8} className={classes.textCenter}>
                <Typography
                  component="h2"
                  variant="h2"
                  className={classes.typographyH2}
                >
                  <Box component="span" color={theme.palette.dark.main}>
                    Nucleo Icons
                  </Box>
                </Typography>
                <Box
                  component="p"
                  fontWeight="300"
                  lineHeight="1.7"
                  fontSize="1.25rem"
                  marginBottom="1rem"
                  marginTop="1.5rem"
                >
                  The official package contains over 21.000 icons which are
                  looking great in combination with Argon Design System. Make
                  sure you check all of them and use those that you like the
                  most.
                </Box>
                <Box marginTop="3rem">
                  <Box marginRight="1rem" display="inline-block">
                    <Button
                      component="a"
                      target="_blank"
                      variant="contained"
                      classes={{ root: classes.buttonContainedInfo }}
                      href="https://www.creative-tim.com/learning-lab/material-ui/icons/argon-dashboard?ref=adpmui-index-page"
                    >
                      View demo icons
                    </Button>
                  </Box>
                  <Button
                    component="a"
                    target="_blank"
                    variant="contained"
                    color="default"
                    href="https://nucleoapp.com/?ref=1712"
                  >
                    View all icons
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box position="relative" className={classes.blurWrapper}>
              <a
                href="https://www.creative-tim.com/learning-lab/material-ui/icons/argon-dashboard?ref=adpmui-index-page"
                target="_blank"
              >
                <Box marginTop="3rem!important" className={classes.blurItem}>
                  <i className={clsx(classes.iconNi, "ni ni-diamond")}></i>
                  <i
                    className={clsx(classes.iconNi, "icon-sm ni ni-album-2")}
                  ></i>
                  <i className={clsx(classes.iconNi, "icon-sm ni ni-app")}></i>
                  <i className={clsx(classes.iconNi, "icon-sm ni ni-atom")}></i>
                  <i className={clsx(classes.iconNi, "ni ni-bag-17")}></i>
                  <i className={clsx(classes.iconNi, "ni ni-bell-55")}></i>
                  <i className={clsx(classes.iconNi, "ni ni-credit-card")}></i>
                  <i
                    className={clsx(
                      classes.iconNi,
                      "icon-sm ni ni-briefcase-24"
                    )}
                  ></i>
                  <i
                    className={clsx(classes.iconNi, "icon-sm ni ni-building")}
                  ></i>
                  <i
                    className={clsx(
                      classes.iconNi,
                      "icon-sm ni ni-button-play"
                    )}
                  ></i>
                  <i
                    className={clsx(classes.iconNi, "ni ni-calendar-grid-58")}
                  ></i>
                  <i
                    className={clsx(classes.iconNi, "ni ni-camera-compact")}
                  ></i>
                  <i className={clsx(classes.iconNi, "ni ni-chart-bar-32")}></i>
                </Box>
                <Typography
                  component="span"
                  variant="h5"
                  className={classes.blurHidden}
                >
                  Eplore all the 21.000+ Nucleo Icons
                </Typography>
              </a>
            </Box>
          </Container>
        </Box>
        <Box paddingTop="6rem" paddingBottom="6rem" component="section">
          <Container maxWidth="xl">
            <Grid container className={classes.justifyContentCenter}>
              <Grid item xs={12} lg={8} className={classes.textCenter}>
                <Typography
                  component="h2"
                  variant="h2"
                  className={classes.typographyH2}
                >
                  <Box
                    component="span"
                    display="block"
                    color={theme.palette.dark.main}
                  >
                    Do you love this awesome
                  </Box>
                  <Box
                    component="span"
                    fontWeight="300"
                    display="block"
                    color={theme.palette.info.main}
                  >
                    Dashboard for Material-UI, React and React Hooks?
                  </Box>
                </Typography>
                <Box
                  component="p"
                  fontWeight="300"
                  lineHeight="1.7"
                  fontSize="1.25rem"
                  marginBottom="2rem"
                  marginTop="1.5rem"
                >
                  Based on the license you get, you will have direct access to
                  our team of developers who built the product.
                </Box>
                {/*<Box marginTop="3rem">
                  <Button
                    component="a"
                    variant="contained"
                    href="https://www.creative-tim.com/product/argon-dashboard-material-ui?ref=adpmui-index-header"
                    target="_blank"
                    classes={{ root: classes.buttonRoot }}
                  >
                    Get free version
                  </Button>
                  <Badge
                    badgeContent="$89"
                    color="error"
                    classes={{
                      badge:
                        classes.badgeRound +
                        " " +
                        classes.badgeBorderWhite +
                        " " +
                        classes.badgeSizeMd,
                    }}
                  >
                    <Button
                      component="a"
                      variant="contained"
                      href="https://www.creative-tim.com/product/argon-dashboard-pro-material-ui?ref=adpmui-index-header"
                      target="_blank"
                      classes={{ root: classes.buttonContainedInfo }}
                    >
                      <Box component={ShoppingBasket} marginRight="0.5rem" />
                      Purchase now
                    </Button>
                  </Badge>
                </Box>*/}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.justifyContentCenter}
            >
              <Grid item xs={12} lg={4} className={classes.paddingLg0}>
                <Card elevation={0}>
                  <CardHeader
                    title="Freelancer"
                    subheader="$89"
                    classes={{
                      root: clsx(classes.textCenter, classes.cardHeaderRoot),
                    }}
                    subheaderTypographyProps={{
                      variant: "h1",
                      component: "h1",
                      className: classes.typographyH1Pricing,
                    }}
                    titleTypographyProps={{
                      variant: "h5",
                      component: "h5",
                      color: "textSecondary",
                      className: classes.typographyH5Pricing,
                    }}
                  ></CardHeader>
                  <CardContent classes={{ root: classes.cardContentRoot }}>
                    <Box
                      component="ul"
                      paddingLeft="0"
                      className={classes.listStyleNone}
                      display="inline-flex"
                      flexDirection="column"
                      margin="0"
                    >
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          1 Developer
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          1 Project
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          Full Documentation
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          Regular Support
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          12 Months Updates
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <Box
                    component={CardActions}
                    justifyContent="center"
                    className={classes.cardActionsRoot}
                  >
                    <Button
                      elevation={0}
                      component="a"
                      variant="contained"
                      href="https://www.creative-tim.com/product/argon-dashboard-pro-material-ui?ref=adpmui-index-header"
                      target="_blank"
                      color="default"
                      fullWidth
                    >
                      Buy now
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4} className={classes.paddingLg0}>
                <Card elevation={0} className={classes.middleCard}>
                  <CardHeader
                    title="Company"
                    subheader="$149"
                    classes={{
                      root: clsx(classes.textCenter, classes.cardHeaderRoot),
                    }}
                    subheaderTypographyProps={{
                      variant: "h1",
                      component: "h1",
                      className: clsx(
                        classes.typographyH1Pricing,
                        classes.textWhite
                      ),
                    }}
                    titleTypographyProps={{
                      variant: "h5",
                      component: "h5",
                      color: "textSecondary",
                      className: clsx(
                        classes.typographyH5Pricing,
                        classes.textWhite
                      ),
                    }}
                  ></CardHeader>
                  <CardContent classes={{ root: classes.cardContentRoot }}>
                    <Box
                      component="ul"
                      paddingLeft="0"
                      className={classes.listStyleNone}
                      display="inline-flex"
                      flexDirection="column"
                      margin="0"
                      color={theme.palette.white.main}
                    >
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={clsx(
                            classes.typographyH4,
                            classes.textWhite
                          )}
                        >
                          Up to 10 Developers
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={clsx(
                            classes.typographyH4,
                            classes.textWhite
                          )}
                        >
                          Unlimited Projects
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={clsx(
                            classes.typographyH4,
                            classes.textWhite
                          )}
                        >
                          Full Documentation
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={clsx(
                            classes.typographyH4,
                            classes.textWhite
                          )}
                        >
                          Regular Support
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={clsx(
                            classes.typographyH4,
                            classes.textWhite
                          )}
                        >
                          12 Months Updates
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={clsx(
                            classes.typographyH4,
                            classes.textWhite
                          )}
                        >
                          Good for SaaS Apps
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <Box
                    component={CardActions}
                    justifyContent="center"
                    className={classes.cardActionsRoot}
                  >
                    <Button
                      component="a"
                      variant="contained"
                      href="https://www.creative-tim.com/product/argon-dashboard-pro-material-ui?ref=adpmui-index-header"
                      target="_blank"
                      fullWidth
                      classes={{ root: classes.buttonRoot }}
                    >
                      Buy now
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4} className={classes.paddingLg0}>
                <Card elevation={0}>
                  <CardHeader
                    title="Enterprise"
                    subheader="$449"
                    classes={{
                      root: clsx(classes.textCenter, classes.cardHeaderRoot),
                    }}
                    subheaderTypographyProps={{
                      variant: "h1",
                      component: "h1",
                      className: classes.typographyH1Pricing,
                    }}
                    titleTypographyProps={{
                      variant: "h5",
                      component: "h5",
                      color: "textSecondary",
                      className: classes.typographyH5Pricing,
                    }}
                  ></CardHeader>
                  <CardContent classes={{ root: classes.cardContentRoot }}>
                    <Box
                      component="ul"
                      paddingLeft="0"
                      className={classes.listStyleNone}
                      display="inline-flex"
                      flexDirection="column"
                      margin="0"
                    >
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          More than to 10 Developers
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          Unlimited Projects
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          Full Documentation
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          Priority Support
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          12 Months Updates
                        </Typography>
                      </Box>
                      <Box
                        component="li"
                        paddingTop=".5rem"
                        paddingBottom=".5rem"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <Box
                          component={Done}
                          width="1.5rem!important"
                          height="1.5rem!important"
                        />
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.typographyH4}
                        >
                          Good for large projects
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <Box
                    component={CardActions}
                    justifyContent="center"
                    className={classes.cardActionsRoot}
                  >
                    <Button
                      component="a"
                      variant="contained"
                      href="https://www.creative-tim.com/product/argon-dashboard-pro-material-ui?ref=adpmui-index-header"
                      target="_blank"
                      fullWidth
                      color="default"
                    >
                      Buy now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <Grid container className={classes.justifyContentCenter}>
              <Grid item xs={12} lg={8} className={classes.textCenter}>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    component="h4"
                    className={classes.typographyH4Display4}
                  >
                    Available on these technologies
                  </Typography>
                  <Grid container className={classes.justifyContentCenter}>
                    {technologies.map((prop, key) => (
                      <Grid key={key} item xs={3} md={2}>
                        <Box marginTop=".5rem" marginBottom=".5rem">
                          <Tooltip
                            title={prop.description}
                            placement="top"
                            arrow
                          >
                            <a
                              href={prop.href + "?ref=adpmui-index-page"}
                              target="_blank"
                            >
                              <Box
                                component="img"
                                src={prop.image}
                                alt="..."
                                borderRadius="50%"
                                className={classes.imageBadge}
                              ></Box>
                            </a>
                          </Tooltip>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <AuthFooter />
    </>
  );
}
