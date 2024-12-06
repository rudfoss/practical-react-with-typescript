import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

export interface FieldsServiceContextProps {
  isDisabled: boolean
  toggleDisabled: (flag?: boolean) => unknown
}

const FieldsServiceContext = createContext<
  FieldsServiceContextProps | undefined
>(undefined)
FieldsServiceContext.displayName = "FieldsServiceContext"

export const useFieldsService = () => {
  const context = useContext(FieldsServiceContext)
  if (!context) throw new Error("FieldsService must be provided before use")
  return context
}
export const useFieldsServiceIsDisabled = () => {
  const context = useContext(FieldsServiceContext)
  return context?.isDisabled ?? false
}

export interface ProvideFieldsServiceProps {
  isDisabled?: boolean
  children: ReactNode
}

export const ProvideFieldsService = ({
  isDisabled: isExternallyDisabled = false,
  children
}: ProvideFieldsServiceProps) => {
  const [isDisabled, setIsDisabled] = useState(isExternallyDisabled)
  useEffect(() => {
    setIsDisabled(isExternallyDisabled)
  }, [isExternallyDisabled])

  const toggleDisabled = (flag?: boolean) => {
    setIsDisabled(flag ?? !isDisabled)
  }

  const value: FieldsServiceContextProps = {
    isDisabled,
    toggleDisabled
  }
  return (
    <FieldsServiceContext.Provider value={value}>
      {children}
    </FieldsServiceContext.Provider>
  )
}
