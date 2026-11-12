import DatePicker from "react-datepicker";
import { useState } from "react";

import { categories } from "../data/categories";

import "react-datepicker/dist/react-datepicker.css";
import type { DraftExpense } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const { dispatch } = useBudget()

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement> | React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? +value: value
    })
  }

  const handleChangeDate = (value: Date | null) => {
    if (value === null) {
      return
    }
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(expense).includes('')) {
      setError('Todos lo campos son obligatorios');
      return;
    }
    dispatch({ type: 'add-expense', payload: { expense } })
  }

  return (
    <form onSubmit={ handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">Nuevo Gasto</legend>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="expenseName"
          className="text-xl"
        >Nombre Gasto</label>
        <input 
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del Gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="amount"
          className="text-xl"
        >Cantidad:</label>
        <input 
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto: Ej. 300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="category"
          className="text-xl"
        >Categoría:</label>
        <select
          id="category"
          // placeholder="Añade la cantidad del gasto: Ej. 300"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {
            categories.map(category => (
              <option 
                key={category.id}
              >{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="category"
          className="text-xl"
        >Fecha Gasto:</label>
        <DatePicker
          className="bg-slate-100 p-2 border-0 w-full"
          dateFormat="dd/MM/yyyy"
          selected={expense.date}
          onSelect={ handleChangeDate}
        />
      </div>
      <input 
        type="submit"
        value="Registrar Gasto" 
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      />
    </form>
  )
}
