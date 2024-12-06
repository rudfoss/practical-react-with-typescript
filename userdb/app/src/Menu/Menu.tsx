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
    <NavLink to="/stats" className={linkClasses}>
      API Stats
    </NavLink>
    <NavLink to="/login" className={linkClasses}>
      Login
    </NavLink>
    <NavLink to="/groups" className={linkClasses}>
      Groups
    </NavLink>
    <NavLink
      to="/groups/74614400-354b-4cee-889f-ec6aa8c36550"
      className={linkClasses}
    >
      A single group
    </NavLink>
  </>
)
