import { useNavigate, useParams } from "react-router-dom";
import { useUpdateIncomeMutation, useGetIncomesQuery } from "../store/features/incomeSlice";
import { useGetIncomeCategoriesQuery, useGetPaymentsQuery } from "../store/features/selectsSlice";
import { useState } from "react";
import Loader from "../components/Loader";
import { dateFormat, dateFormatToInput } from "../utils/dateFormat";
import { toast, Toaster } from 'sonner'

const UpdateIncome = () => {  
  // fetching de categorías de ingresos y métodos de pago
  const { data: incomeCategories, isLoading: isLoading1 } = useGetIncomeCategoriesQuery();
  const { data: payments, isLoading: isLoading2 } = useGetPaymentsQuery();
  const { data: incomes } = useGetIncomesQuery();

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams()
  // hook para editar ingreso
  const [updateIncome] = useUpdateIncomeMutation()
  
  if (isLoading1 || isLoading2 || !incomes) return <Loader />
  const incomeToEdit = incomes.find(income => income.id_ingreso === Number(id));

  const validate = (data) => {
    const newErrors = {};
    if (!data.date) newErrors.date = "La fecha es obligatoria";
    if (!data.amount) newErrors.amount = "El monto es obligatorio";
    if (!data.description) newErrors.description = "La descripción es obligatoria";
    if (!data.category) newErrors.category = "La categoría es obligatoria";
    if (!data.payment) newErrors.payment = "El método de pago es obligatorio";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // creación del objeto con los datos del formulario
    const formData = new FormData(e.target);
    const incomeData = {
      date: dateFormat(formData.get('income-date')),
      amount: formData.get('income-amount'),
      description: formData.get('income-description'),
      category: formData.get('income-categories'),
      payment: formData.get('income-payment')
    };

    // validar antes de enviar
    const validationErrors = validate(incomeData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // no continuar si hay errores
    }

    const button = document.getElementById("button-update-income");
    button.disabled = true; // deshabilitar el botón para evitar múltiples envíos
    
    // llamada a la mutación para editar el ingreso
    updateIncome({id, incomeData})
      .then((data) => {
        if (data.error && data.error.status === 401) {
          toast.error("Tu sesión expiró. Iniciá sesión de nuevo.");
          setTimeout(()=> {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            navigate('/inicio-sesion', { replace: true });
          }, 2500)
        } else {
          toast.success("Ingreso actualizado correctamente. Redirigiendo a la sección 'Reportes'", {
            style : {backgroundColor: "#fff", color : "#01578f", borderColor: "#01578f", fontSize: "16px"}
          })
        }
        setTimeout(()=> {
            e.target.reset();
            navigate("/reportes");
            button.disabled = false; // reactivar el botón
        }, 2500)
      })
      .catch((error) => {
        console.error('Error en la consulta:', error);
      });
  }

  return (
    <main className="w-full overflow-y-auto p-4 md:p-6 h-screen md:text-lg max-w-[1200px] mx-auto">
      <h2 className="text-xl md:text-2xl font-medium text-center pb-4">Editar ingreso</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl text-[#01578f] flex flex-col gap-2">
        <div className="flex flex-col w-full">
          <label htmlFor="income-date" className="font-semibold">Fecha</label>
          <input type="date" name="income-date" defaultValue={dateFormatToInput(incomeToEdit.fecha)} className="border-1 rounded-md px-1 py-0.5"/>
          {errors.date && <span className="text-[#c3191a] text-sm md:text-base">{errors.date}</span>}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="income-amount" className="font-semibold">Monto</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">$</span>
            <input 
              type="number" 
              name="income-amount" 
              defaultValue={incomeToEdit.monto}
              className="border rounded-md pl-5 pr-2 py-0.5 w-full"
            />
          </div>
          {errors.amount && <span className="text-[#c3191a] text-sm md:text-base">{errors.amount}</span>}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="income-description" className="font-semibold">Descripción</label>
          <textarea rows={3} name="income-description" defaultValue={incomeToEdit.descripcion} className="border-1 resize-none rounded-md px-1 py-0.5"/>
          {errors.description && <span className="text-[#c3191a] text-sm md:text-base">{errors.description}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="income-categories" className="font-semibold">Categoría</label>
          <select name="income-categories" defaultValue={incomeToEdit.id_cat_ingreso} className="border-1 rounded-md px-1 py-0.5 focus:outline-none">
            <option value="" disabled>
              Seleccioná una categoría
            </option>
            {incomeCategories.map(category => (
              <option key={category.id_cat_ingreso} value={category.id_cat_ingreso}>{category.nombre}</option>
            ))}
          </select>
          {errors.category && <span className="text-[#c3191a] text-sm md:text-base">{errors.category}</span>}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="income-payment" className="font-semibold">Método de pago</label>
          <select name="income-payment" defaultValue={incomeToEdit.id_metodo_pago} className="border-1 rounded-md px-1 py-0.5 focus:outline-none">
            <option value="" disabled >
              Seleccioná una método de pago
            </option>
            {payments.map(payment => (
              <option key={payment.id_metodo_pago} value={payment.id_metodo_pago}>{payment.nombre}</option>
            ))}
          </select>
          {errors.payment && <span className="text-[#c3191a] text-sm md:text-base">{errors.payment}</span>}
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center w-full">
          <button id="button-update-income" type="submit" className="font-semibold bg-[#01578f] text-white mt-3 py-1 rounded-md w-full">Guardar</button>
          <button type="button" onClick={()=> navigate("/reportes")} className="font-semibold bg-[#c3191a] text-white mt-1 md:mt-3 py-1 rounded-md w-full">Cancelar</button>
        </div>
      </form>
      <Toaster richColors />
    </main>
  );
}

export default UpdateIncome;