import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import { useState } from "react";
import RefusaAppBar from "../components_site/template/RefusaAppBar";
import NewTopicForm from "../components_site/topics/NewTopicForm";
import { useAuth } from "../lib/auth";

export default function NewTopic() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div style={{ flexGrow: 1 }}>
      <RefusaAppBar user={user} />
      {isLoading && <LinearProgress />}

      <Container style={{ paddingTop: "4rem", paddingBottom: "2rem" }}>
        <Grid container justify="center" alignItems="center" component="main">
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={0}
            square
          >
            <Box
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: 4,
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">Novo tópico</Typography>
              <NewTopicForm
                user={user}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
