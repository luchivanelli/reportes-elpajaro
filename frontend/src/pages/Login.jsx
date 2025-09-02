import logo from '../assets/logo.png';
import eye from '../assets/eye.svg';
import eyeOff from '../assets/eye-off.svg';
import { useState } from 'react';
import { usePostLoginMutation } from '../store/features/loginSlice';
import { useNavigate } from 'react-router-dom';
import { store } from '../store/store';
import { incomeSlice } from '../store/features/incomeSlice';
import { expenseSlice } from '../store/features/expenseSlice';


const Login = () => {
  const [postLogin] = usePostLoginMutation()
  const [errors, setErrors] = useState({});
  const [iconPass, setIconPass] = useState(eyeOff);
  const navigate = useNavigate()

  const handleIconPass = () => {
    iconPass == eyeOff ? setIconPass(eye) : setIconPass(eyeOff);
  }

  const validate = (data) => {
    const newErrors = {};
    if (!data.username) newErrors.username = "El usuario es obligatorio";
    if (!data.password) newErrors.password = "La contraseña es obligatoria";
    return newErrors;
  };

  const handleSubmit = (e)=> {
    e.preventDefault()

    const formData = new FormData(e.target);
    const loginData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const validationErrors = validate(loginData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // no continuar si hay errores
    }

    const button = document.getElementById("button-login")
    button.disabled = true; // deshabilitar el botón para evitar múltiples envíos

    postLogin(loginData)
    .unwrap()
    .then(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', data.tipo);

      // limpiar cache de RTK Query
      store.dispatch(incomeSlice.util.resetApiState());
      store.dispatch(expenseSlice.util.resetApiState());
      navigate("/")
    })
    .catch(error => {
      console.error('Error en login:', error);
      setErrors({login: "Credenciales incorrectas"})
      button.disabled = false
    });

  }

  return (
    <main className="w-full p-4 md:p-6 h-screen max-w-[1200px] mx-auto">
      <img src={logo} alt="logo" className='w-[200px] mx-auto'/>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto flex flex-col gap-4">
        <h1 className="text-xl font-medium text-center pb-4 text-[#01578f]">Inicio de sesión</h1>
        <div className='flex flex-col w-full text-[#01578f]'>
          <label htmlFor="username" className="font-semibold">Usuario</label>
          <input type="text" name='username' className="border-1 rounded-md px-1 py-0.5"/>
          {errors.username && <span className="text-[#c3191a] text-sm md:text-base">{errors.username}</span>}
        </div>
        <div className='flex flex-col w-full text-[#01578f]'>
          <label htmlFor="password" className="font-semibold">Contraseña</label>
          <div className='relative'>
            <input type={iconPass == eyeOff ? "password" : "text"} name='password' className="w-full border-1 rounded-md px-1 py-0.5"/>
            <img onClick={handleIconPass} src={iconPass} className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
          {errors.password && <span className="text-[#c3191a] text-sm md:text-base">{errors.password}</span>}
        </div>
        <div>
          {errors.login && <span className="text-[#c3191a] text-sm md:text-base pb-1">{errors.login}</span>}
          <button id='button-login' type="submit" className="w-full bg-[#01578f] text-white py-1 mt-4 rounded-md font-semibold">Iniciar sesión</button>
        </div>
      </form>
    </main>
  )
}

export default Login;