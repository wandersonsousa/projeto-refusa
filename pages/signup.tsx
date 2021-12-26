import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {
  Container,
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
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
import firebase_helper from "../lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    auth_avatar: { marginTop: 1, backgroundColor: theme.palette.primary.main },
  })
);

export default function SignInSide() {
  const { register, user, loading, errorMessage } = useAuth();
  const [registershowerror, setregistershowerror] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [disable, setdisable] = useState(false);
  const router = useRouter();

  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const usernameformat = /^(?=[a-zA-Z0-9._]{4,12}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const registeruser = async (e) => {
    e.preventDefault();
    setdisable(true);

    if (email != null && password != null && username != null) {
      if (
        email.match(mailformat) &&
        password.length >= 6 &&
        username.match(usernameformat)
      ) {
        setregistershowerror(null);

        const docRef = doc(firebase_helper.db, "users", username);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setregistershowerror("Usuário já está sendo usado");
        } else {
          register(email, password, username);
        }
        setregistershowerror(null);
        setdisable(false);
      } else {
        setdisable(false);
        setregistershowerror("Senha deve ter no mínimo 6 caracteres");
      }
    } else {
      setdisable(false);
      setregistershowerror("Senha deve ter no mínimo 6 caracteres");
    }
  };

  const gotohome = () => {
    router.push("/");
  };
  if (user) {
    gotohome();
  }

  const classes = useStyles();

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
              Cadastro
            </Typography>
            <Box
              component="form"
              onSubmit={registeruser}
              style={{ marginTop: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
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
                style={{ marginTop: 3, marginBottom: 2 }}
              >
                Cadastrar
              </Button>

              {registershowerror && (
                <Alert severity="error">{registershowerror}</Alert>
              )}

              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
