import React from "react"

// export function HelloWorld() {
//   return <p>Hello World!</p>
// }

// var HelloWorld = function() {
//   return <p>Hello World!</p>
// }

// var HelloWorld = () => {
//   return <p>Hello World!</p>
// }

interface HelloWorldProps {
  /**
   * The name of the person to greet
   */
  name: string
  age: number
}

export const HelloWorld = (props: HelloWorldProps) => (
  <p>
    Hello {props.name}
    {props.age + 12}
  </p>
)

// export const HelloWorld2 = (props: HelloWorldProps) =>
//   React.createElement("p", {}, ["Hello ", props.name, props.age + 12])
