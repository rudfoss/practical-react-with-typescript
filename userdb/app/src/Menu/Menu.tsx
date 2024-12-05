import { NavLink, NavLinkRenderProps } from "react-router-dom"

import classes from "./Menu.module.css"

const linkClasses = ({ isActive }: NavLinkRenderProps) => {
  const linkClassList = [classes.link]
  if (isActive) {
    linkClassList.push(classes.activeLink)
  }

  return linkClassList.join(" ")
}

export const Menu = () => (
  <>
    <NavLink to="/" className={linkClasses}>
      Home
    </NavLink>
    <NavLink to="/login" className={linkClasses}>
      Login
    </NavLink>
  </>
)
