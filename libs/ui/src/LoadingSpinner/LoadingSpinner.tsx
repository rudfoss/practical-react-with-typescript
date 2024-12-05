import { makeStyles } from "@griffel/react"

import spinner from "./netscape-loader.gif"

const useClasses = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      display: "block",
      flex: "0 0 auto"
    }
  }
})

export interface LoadingSpinnerProps {
  size?: number
}

export const LoadingSpinner = ({ size = 64 }: LoadingSpinnerProps) => {
  const classes = useClasses()
  return (
    <div className={classes.container}>
      <img alt="Loading spinner" src={spinner} width={size} height={size} />
    </div>
  )
}
