import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { SentimentSatisfiedAlt } from "@material-ui/icons";
import superagent from "superagent";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
const JWT_SECRET = "thebestsecrett";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLoginState] = useState(false);
  const classes = useStyles();
  const validateToken = (token) => {
    try {
      console.log("all good", token);
      token = token.token;
      let user = jwt.verify(token, JWT_SECRET);
      let userId = user.user_id;
      cookie.save("userId", userId, { path: "/", maxAge: 2592000 });
      setLoginState(true);
    } catch (e) {
      console.log("wrong");
      setLoginState(false, null, {});
    }
  };
  async function handleSignIn(event) {
    event.preventDefault();
    let ua1 = superagent.agent();
    try {
      const response = await ua1
        .post(`https://sportopiav1.herokuapp.com/signin`)
        .set("authorization", `Basic ${btoa(`${email}:${password}`)}`)
        .end(function (err, res) {
          let token = JSON.parse(res.text);
          validateToken(token);
        });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                label="Password"
                name="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => handleSignIn(event)}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
