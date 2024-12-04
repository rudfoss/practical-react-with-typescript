const clickHandler = (event: React.MouseEvent) => {
  alert("Hi 👋")
}
export const FirstButton = () => (
  <button onClick={clickHandler}>Click me</button>
)
