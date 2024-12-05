import { Outlet } from "react-router-dom"

export const HeaderMainLayout = () => (
  <>
    <header>Hello world 👋</header>
    <main>
      <Outlet />
    </main>
  </>
)
