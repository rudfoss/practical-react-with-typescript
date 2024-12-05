import { ReactNode } from "react"
import { Outlet } from "react-router-dom"

import classes from "./MainLayout.module.css"

export interface MainLayoutProps {
  header: ReactNode
  menu: ReactNode
}

export const MainLayout = ({ header, menu }: MainLayoutProps) => (
  <>
    <header>{header}</header>
    <div className={classes.columns}>
      <nav>{menu}</nav>
      <main>
        <Outlet />
      </main>
    </div>
  </>
)
