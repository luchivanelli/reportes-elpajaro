import { useState } from "react";
import { useGetExpensesQuery } from "../store/features/expenseSlice";
import { useGetIncomesQuery } from "../store/features/incomeSlice";
import Loader from "./Loader";
import { dateFormat, dateToMonth, parseDate } from "../utils/dateFormat";

const CardHome = ({idCard, title, number, options}) => {
  const { data: expenses, isLoading: isLoadingExpenses } = useGetExpensesQuery();
  const { data: incomes, isLoading: isLoadingIncomes } = useGetIncomesQuery();
  const [category, setCategory] = useState("income-repuestos");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (isLoadingExpenses || isLoadingIncomes) return <Loader/>;
  if (!incomes || !expenses) return

  // filtrar por dia (card 4)
  if (idCard === "card-home-4") {
    const parsedDate = dateFormat(date);
    const filteredExpenses = expenses.filter(expense => expense.fecha == parsedDate);
    const filteredIncomes = incomes.filter(income => income.fecha == parsedDate);

    number = filteredIncomes.reduce((acc, income) => acc + Number(income.monto), 0) - filteredExpenses.reduce((acc, expense) => acc + Number(expense.monto), 0)
  }
  if (idCard === "card-home-6" && month) {
    const parsedMonth = dateToMonth(month);
    const filteredExpenses = expenses.filter(expense => expense.fecha.endsWith(parsedMonth));
    const filteredIncomes = incomes.filter(income => income.fecha.endsWith(parsedMonth));

    number = filteredIncomes.reduce((acc, income) => acc + Number(income.monto), 0) - filteredExpenses.reduce((acc, expense) => acc + Number(expense.monto), 0)
  }

  // función para filtrar por fechas y categorias (card 5)
  const filterByDate = (item) => {
    if (!startDate && !endDate) return true;
    const fecha = parseDate(item.fecha)
 
    if (startDate && fecha < new Date(startDate)) return false;
    if (endDate && fecha > new Date(endDate)) return false;
    return true;
  };

  let filteredNumber = 0;

  if (category === "income-repuestos") {
    filteredNumber = incomes
      .filter(income => income.id_cat_ingreso === 1)
      .filter(filterByDate)
      .reduce((acc, income) => acc + Number(income.monto), 0);
  } else if (category === "income-mano-obra") {
    filteredNumber = incomes
      .filter(income => income.id_cat_ingreso === 2)
      .filter(filterByDate)
      .reduce((acc, income) => acc + Number(income.monto), 0);
  } else if (category === "expense-repuestos") {
    filteredNumber = expenses
      .filter(expense => expense.id_cat_egreso === 1)
      .filter(filterByDate)
      .reduce((acc, expense) => acc + Number(expense.monto), 0);
  } else if (category === "expense-impuestos") {
    filteredNumber = expenses
      .filter(expense => expense.id_cat_egreso === 2)
      .filter(filterByDate)
      .reduce((acc, expense) => acc + Number(expense.monto), 0);
  } else if (category === "expense-varios") {
    filteredNumber = expenses
      .filter(expense => expense.id_cat_egreso === 3)
      .filter(filterByDate)
      .reduce((acc, expense) => acc + Number(expense.monto), 0);
  }

  number === null ? number = filteredNumber : number;

  return (
    <div id={idCard} className="w-full flex flex-col justify-between p-4 rounded-xl border-2 border-[#ffffff] shadow-sm shadow-[#ffffff79]">
      <div>
        <h3 className={`text-lg lg:text-2xl font-medium pb-4 ${!title ? "hidden" : null}`}>{title}</h3>
        {/* filtro de fecha (por dia) */}
        {idCard === "card-home-4" && (
          <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-2 py-1 rounded-md mb-2 focus:outline-none w-full text-sm lg:text-base"/>
        )}

        {/* filtro de fecha (por mes) */}
        {idCard === "card-home-6" && (
          <input 
          type="month" 
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-2 py-1 rounded-md mb-2 focus:outline-none w-full text-sm lg:text-base"/>
        )}

        {/* filtro de categoría */}
        {options && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-2 py-1 rounded-md mb-2 focus:outline-none w-full lg:text-base"
          >
            <option value="income-repuestos" className="text-[#01578f]" >Repuestos (ingreso)</option>
            <option value="income-mano-obra" className="text-[#01578f]" >Mano de obra (ingreso)</option>
            <option value="expense-repuestos" className="text-[#01578f]" >Repuestos (egreso)</option>
            <option value="expense-impuestos" className="text-[#01578f]" >Impuestos (egreso)</option>
            <option value="expense-varios" className="text-[#01578f]" >Varios (egreso)</option>
          </select>
        )}

        {/* filtro de fechas (por rango) */}
        {(options) && (
          <div className="flex text-sm gap-2 mb-2">
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="border px-2 py-1 rounded-md w-1/2 lg:text-base"
            />
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="border px-2 py-1 rounded-md w-1/2 lg:text-base"
            />
          </div>
        )}
      </div>

      <p className="text-end text-2xl lg:text-3xl font-semibold">{`$${number}`}</p>
    </div>
  );
}

export default CardHome;
