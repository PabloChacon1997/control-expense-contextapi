import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTrackr from "./components/BudgetTrackr"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"


function App() {

  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]) 

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planficiador de Gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg m-10 p-10">
        { isValidBudget ? <BudgetTrackr /> : <BudgetForm /> }
      </div>
      {
        isValidBudget && (
          <div className="max-w-3xl mx-auto py-10">
            <ExpenseList />
            <ExpenseModal />
          </div>
        )
      }
    </>
  )
}

export default App
