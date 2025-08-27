import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useGetExpensesQuery } from "../store/features/expenseSlice";
import { useGetIncomesQuery } from "../store/features/incomeSlice";
import sort from "../assets/arrows-sort.svg";
import ModalDetail from "../components/ModalDetail";
import { dateFormat, parseDate } from "../utils/dateFormat";

const Reports = () => {
  const { data: expenses = [], isLoading: isLoadingExpenses } = useGetExpensesQuery();
  const { data: incomes = [], isLoading: isLoadingIncomes } = useGetIncomesQuery();
  
  
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [filter2, setFilter2] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" o "desc"
  const [selectedItem, setSelectedItem] = useState(null);
  
  
  // Combina datos y los ordena inicialmente
  useEffect(() => {
    const merged = [...expenses, ...incomes].sort(
      (a, b) => parseDate(b.fecha) - parseDate(a.fecha) // Descendente por defecto
    );
    setReports(merged);
  }, [expenses, incomes]);
  
  if (isLoadingExpenses || isLoadingIncomes) return <Loader />;
  
  // Filtrado y búsqueda
  const filteredReports = reports.filter((item) => {
    const matchesSearch = item.descripcion
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "income" && item.id_ingreso) ||
      (filter === "expense" && item.id_egreso);

    const matchesFilter2 =
      filter2 === "all" ||
      (filter2 === "income-repuestos" &&
        item.id_ingreso &&
        item.id_cat_ingreso === 1) ||
      (filter2 === "income-mano-obra" &&
        item.id_ingreso &&
        item.id_cat_ingreso === 2) ||
      (filter2 === "expense-repuestos" &&
        item.id_egreso &&
        item.id_cat_egreso === 1) ||
      (filter2 === "expense-impuestos" &&
        item.id_egreso &&
        item.id_cat_egreso === 2) ||
      (filter2 === "expense-varios" &&
        item.id_egreso &&
        item.id_cat_egreso === 3);
    
    const matchesDate = !searchDate || item.fecha === dateFormat(searchDate);

    return matchesSearch && matchesFilter && matchesFilter2 && matchesDate;
  });

  // Cambiar orden
  const handleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);

    setReports((prevReports) =>
      [...prevReports].sort((a, b) =>
        newOrder === "desc"
          ? parseDate(b.fecha) - parseDate(a.fecha)
          : parseDate(a.fecha) - parseDate(b.fecha)
      )
    );
  };

  const handleOpen = (item) => {
    setSelectedItem(item);
  }


  return (
    <main className="w-full p-4 md:p-6 h-screen max-w-[1200px] mx-auto">
      <h2 className="text-xl font-medium text-center pb-4">Reportes</h2>

      {/* Barra de búsqueda y filtros */}
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 rounded-md mb-4 w-full focus:outline-none md:text-lg "
      />

      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border px-2 py-1 rounded-md mb-4 w-full focus:outline-none md:text-lg"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-2 py-[4.5px] md:py[5px] rounded-md mb-4 focus:outline-none md:text-lg"
          >
            <option value="all" className="text-[#01578f]">Todos</option>
            <option value="income" className="text-[#01578f]">Ingresos</option>
            <option value="expense" className="text-[#01578f]">Egresos</option>
          </select>

          <img src={sort} onClick={handleSort} className="cursor-pointer mb-4 md:w-10" />
        </div>

        <select
          value={filter2}
          onChange={(e) => setFilter2(e.target.value)}
          className="border px-2 py-[4.5px] md:py[5px] rounded-md mb-4 focus:outline-none md:text-lg"
        >
          <option value="all" className="text-[#01578f]">Todos</option>
          <option value="income-repuestos" className={`text-[#01578f] ${filter == "expense" ? "hidden" : null}`}>Repuestos (ingreso)</option>
          <option value="income-mano-obra" className={`text-[#01578f] ${filter == "expense" ? "hidden" : null}`}>Mano de obra (ingreso)</option>
          <option value="expense-repuestos" className={`text-[#01578f] ${filter == "income" ? "hidden" : null}`}>Repuestos (egreso)</option>
          <option value="expense-impuestos" className={`text-[#01578f] ${filter == "income" ? "hidden" : null}`}>Impuestos (egreso)</option>
          <option value="expense-varios" className={`text-[#01578f] ${filter == "income" ? "hidden" : null}`}>Varios (egreso)</option>
        </select>
      </div>

      {/* Lista */}
      <div className="max-h-[calc(100vh-220px)] md:max-h-[calc(100vh-250px)] overflow-y-auto pr-1 md:pr-4">
        {filteredReports.map((item, index) => (
          <div key={index} onClick={()=> handleOpen(item)} className="border-b py-2 flex flex-col gap-1 px-1 hover:bg-[#01568f49] cursor-pointer">
            <p className="font-semibold md:text-xl">{item.descripcion}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-400 md:text-lg">{item.fecha}</p>
              <span
                className={`py-0.5 px-1 text-sm md:text-base rounded-md text-white ${
                  item.id_ingreso ? "bg-[#01578f]" : "bg-[#c3191a]"
                }`}
              >
                {item.id_ingreso ? "Ingreso" : "Egreso"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          id="modal-item"
          className="absolute top-0 left-0 w-full h-full bg-[#000000e3] flex justify-center items-center"
          onClick={() => setSelectedItem(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ModalDetail item={selectedItem} handleClose={() => setSelectedItem(null)}/>
          </div>
        </div>
      )}
    </main>
  );
};

export default Reports;
