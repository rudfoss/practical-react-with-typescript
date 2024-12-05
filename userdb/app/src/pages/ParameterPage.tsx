import { useParams } from "react-router-dom"

export const ParameterPage = () => {
  const { param } = useParams<"param">()

  return <p>Parameter {param}</p>
}
