import { toast, Toaster } from 'sonner';
import { useDeleteExpenseMutation } from '../store/features/expenseSlice';
import { useDeleteIncomeMutation } from '../store/features/incomeSlice';
import { useNavigate } from 'react-router-dom';

const ModalDetail = ({item, handleClose}) => {
  const [deleteIncome] = useDeleteIncomeMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const navigate = useNavigate();

  const metodoPago = item.id_metodo_pago === 1 ? "Efectivo/Transferencia" 
    : item.id_metodo_pago === 2 ? "Tarjeta de crédito" 
    : "Tarjeta de débito";
  const categoria = item.id_cat_egreso === 1 ? "Repuestos" 
    : item.id_cat_egreso === 2 ? "Impuestos" 
    : item.id_cat_egreso === 3 ? "Varios" 
    : item.id_cat_ingreso === 1 ? "Repuestos" 
    : "Mano de obra";

  const confirmToast = () =>
    toast.custom((t) => (
      <div className="bg-[#EF8410] text-white w-full text-sm md:text-[16px] px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-sm">
        <div>
          <p className="font-medium">
            ¿Está seguro de eliminar este reporte?
          </p>
        </div>
        <div className="ml-4 flex flex-col gap-2 w-[140px]">
          <button
            className="bg-white text-[#EF8410] px-3 py-1 rounded-md font-semibold"
            onClick={() => {
              if (item.id_ingreso) {
                deleteIncome(item.id_ingreso);
              } else {
                deleteExpense(item.id_egreso);
              }

              toast.success("Reporte eliminado correctamente", {
                style: {backgroundColor: "#fff", color : "#01578f", borderColor: "#01578f", fontSize: "16px"},
              });

              toast.dismiss(t.id);
              setTimeout(() => {
                handleClose();
              }, 3000);
            }}
          >
            Confirmar
          </button>
          <button
            className="text-white border border-white px-3 py-1 rounded-md font-semibold hover:bg-white hover:text-[#EF8410] transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
  ));

  return (
    <div className="bg-[#01578f] p-4 md:p-6 mx-4 rounded-lg border-1 border-white">
      <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.descripcion}</h3>
      <div className="flex flex-col gap-2 md:text-xl">
        <p className="font-medium text-[#EF8410]"><b className="text-white font-medium">Fecha:</b> {item.fecha}</p>
        <p className="font-medium text-[#EF8410]"><b className="text-white font-medium">Monto:</b> ${item.monto}</p>
        <p className="font-medium text-[#EF8410]"><b className="text-white font-medium">Tipo:</b> {item.id_ingreso ? "Ingreso" : "Egreso"}</p>
        <p className="font-medium text-[#EF8410]"><b className="text-white font-medium">Categoría:</b> {categoria}</p>
        <p className="font-medium text-[#EF8410]"><b className="text-white font-medium">Método de pago:</b> {metodoPago}</p>
      </div>
      <div className="flex gap-4 mt-4 md:mt-6 justify-center md:text-xl">
        <button onClick={()=> item.id_ingreso ? navigate(`/ingreso/${item.id_ingreso}`) : navigate(`/egreso/${item.id_egreso}`)} className="cursor-pointer py-0-5 px-3 md:px-4 border-2 border-[#EF8410] rounded-md hover:bg-[#EF8410] hover:text-white transition-all">Editar</button>
        <button onClick={()=> confirmToast()} className="cursor-pointer py-0-5 px-3 md:px-4 border-2 border-[#EF8410] rounded-md hover:bg-[#EF8410] hover:text-white transition-all">Borrar</button>
      </div>
      <Toaster richColors />
    </div>
  )
}

export default ModalDetail;