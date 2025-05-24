import { Container } from "@mui/material"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import styles from "./PageNotFound.module.css"

export const PageNotFound = () => (
  <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button variant="contained" component={Link} to={Path.Main} sx={{ width: "330px", mt: "20px" }}>
      return to main page
    </Button>
  </Container>
)
