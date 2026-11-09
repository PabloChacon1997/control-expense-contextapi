import { useContext } from "react"
import { BudgetConext } from "../context/BudgetContext"


export const useBudget = () => {
  const context = useContext(BudgetConext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}