import classes from "./Menu.module.css"

export const Menu = () => (
  <>
    <a href="/" className={classes.link}>
      Home
    </a>
    <a href="/login" className={classes.link}>
      Login
    </a>
  </>
)
