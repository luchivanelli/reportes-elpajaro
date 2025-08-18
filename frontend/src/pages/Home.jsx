import CardHome from "../components/CardHome";
import { useGetIncomesQuery } from "../store/features/incomeSlice";
import { useGetExpensesQuery } from "../store/features/expenseSlice";
import { useGetExpenseCategoriesQuery, useGetIncomeCategoriesQuery, useGetPaymentsQuery } from "../store/features/selectsSlice";
import Loader from "../components/Loader";

const Home = () => {
  const { data: incomes, error, isLoading : isLoading2 } = useGetIncomesQuery();
  const { data: expenses, isLoading : isLoading1} = useGetExpensesQuery();
  const { data: expenseCategories, isLoading: isLoading3 } = useGetExpenseCategoriesQuery();
  const { data: incomeCategories, isLoading: isLoading4 } = useGetIncomeCategoriesQuery();

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) return <Loader />

  const categories = [...incomeCategories, ...expenseCategories]
  const totalIncome = incomes.reduce((acc, income) => acc + Number(income.monto), 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + Number(expense.monto), 0);


  return (
    <main className="h-screen flex overflow-y-hidden w-full md:max-w-[1200px] md:mx-auto">
      <div className="p-4 md:p-6 w-full flex flex-col gap-4 lg:gap-6 overflow-y-auto">
        <div className="flex flex-col gap-4 lg:gap-6">
          <CardHome idCard="card-home-1" title="Ingreso total" number={totalIncome}/>
          <CardHome idCard="card-home-2" title="Egreso total" number={totalExpense}/>
          <CardHome idCard="card-home-3" title="Balance total" number={totalIncome - totalExpense}/>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <CardHome idCard="card-home-4" title="Balance total por día" number={0}/>
          <CardHome idCard="card-home-6" title="Balance total por mes" number={0}/>
          <CardHome idCard="card-home-5" title="Total por filtros" options={categories} number={null}/>
        </div>
      </div>
    </main>
  );
}

export default Home;