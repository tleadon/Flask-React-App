import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const pages = [
  { name: "Login", id: "login" },
  { name: "Register", id: "register" },
  { name: "Search", id: "/" },
];

const linkProps = {
  key: pages.id,
  color: "white",
  to: pages.id,
  style: { textDecoration: "none" },
  onClick: () => window.scrollTo(0, 0),
};

export default function Nav() {
  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "#1976d2" }}>
        <Container>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            width="100%"
          >
            <Toolbar>
              {/* <Typography variant="h6">NIB Number API</Typography> */}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                {pages.map((page) => (
                  <Link {...linkProps} key={page.id} to={page.id}>
                    <Typography color="white">{page.name}</Typography>
                  </Link>
                ))}
              </Stack>
            </Toolbar>
          </Stack>
        </Container>
      </AppBar>
    </>
  );
}
