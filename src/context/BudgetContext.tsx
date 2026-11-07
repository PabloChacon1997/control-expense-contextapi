import { createContext, useReducer, type ReactNode } from "react"

import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

type BudgetConextProps = {
  state: BudgetState
  dispatch: React.ActionDispatch<[action: BudgetActions]>
}

type BudgetProviderProps = {
  children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const BudgetConext = createContext<BudgetConextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetConext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </BudgetConext.Provider>
  )
}