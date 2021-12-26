import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Link,
  Paper,
  Box,
  Grid,
  Avatar,
  Button,
  TextField,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    auth_avatar: { marginTop: 1, backgroundColor: theme.palette.primary.main },
  })
);

export default function SignInSide() {
  const classes = useStyles();
  const { login, user, loading, errorMessage } = useAuth();
  const [loginshowerror, setloginshowerror] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setdisable] = useState(false);
  const router = useRouter();

  // Function to login user
  const loginuser = (e) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    e.preventDefault();
    setdisable(true);

    // Input check
    if (email != null && password != null) {
      if (email.match(mailformat) && password.length >= 6) {
        setloginshowerror(null);
        login(email, password);
        setdisable(false);
      } else {
        setdisable(false);
        setloginshowerror("Senha deve ter no mínimo 6 caracteres");
      }
    } else {
      setdisable(false);
      setloginshowerror("Senha deve ter no mínimo 6 caracteres");
    }
  };

  const gotohome = () => {
    router.push("/");
  };

  if (user) {
    gotohome();
  }

  return (
    <Container>
      <Grid
        container
        justify="center"
        alignItems="center"
        component="main"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            style={{
              marginTop: 8,
              marginBottom: 8,
              marginLeft: 4,
              marginRight: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar className={classes.auth_avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Autenticação
            </Typography>
            <Box component="form" onSubmit={loginuser} style={{ marginTop: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                disabled={disable}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                disabled={disable}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={disable}
                style={{ marginTop: 3, marginBottom: 2 }}
              >
                Login
              </Button>

              {loginshowerror && (
                <Alert severity="error">{loginshowerror}</Alert>
              )}

              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
