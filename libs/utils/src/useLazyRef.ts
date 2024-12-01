// useRef and Refs are a concept from react that we are specifically referring to here.
import { MutableRefObject, useRef } from "react"

/**
 * Works like `useRef` but supports an initializer function that ONLY runs the first time the ref is created.
 * @param init
 * @returns
 */
export const useLazyRef = <TValue>(init: () => TValue) => {
  const ref = useRef<TValue>()
  if (!ref.current) {
    ref.current = init()
  }
  return ref as MutableRefObject<TValue>
}
