import { useEffect, useState } from "react";
import "./index.css";
import logo from './assets/LOGO STEIR.png';
import FormularioUsuario from './components/Usuarios/FormularioUsuario';
import UsuariosCRUD from "./components/Usuarios/UsuariosCRUD";

function App() {
  const [rol, setRol] = useState(""); // Estado para guardar el rol
  const [clave, setClave] = useState(""); // Estado para guardar clave
  const [logueado, setLogueado] = useState(false);
  const [formulario, setFormulario] = useState(null);

  // Manejadores de eventos para actualizar el estado
  function cambiarRol(evento) {
    setRol(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  // Función para manejar el ingreso
  async function ingresar() {
    try {
      const peticion = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rol, clave }),
        credentials: 'include'
      });
      if (peticion.ok) {
        setLogueado(true);
      } else {
        alert('Usuario o clave incorrectos');
      }
    } catch (error) {
      console.error('Error al hacer fetch:', error);
    }
    //if (rol === "jefe de colaboradores" && clave === "12345") {
      //alert("Datos correctos");
      //setLogueado(true);
    //} else {
     // alert("Datos incorrectos");
      //setFormulario('usuarios');
    //}

  }

  async function validar() {
    try {
      const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' });
      if (peticion.ok) {
        setLogueado(true);
      }
    } catch (error) {
      console.error('Error al hacer fetch:', error);
    }
  }

  useEffect(() => {
    validar();
  }, []);

  // Renderizar contenido basado en el estado de autenticación
  if (!logueado) {
    if (formulario === 'usuarios') {
      return <FormularioUsuario onRegistrar={() => setLogueado(true)} />;
    }

    return (
      <div className="container-login">
        <div className="header">
          <span>Inicio</span> &lt; <span>Volver atrás</span>
        </div>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1>Sistema Taller Escultura e Imagineria Religiosa</h1>
        <p>¿No tienes una Cuenta? <a href="#" onClick={() => setFormulario('usuarios')}>Realizar Registro</a></p>
        <label htmlFor="rol">
          Usuario:
          <input
            id="rol"
            type="text"
            value={rol}
            onChange={cambiarRol}
          />
        </label>
        <label htmlFor="clave">
          Contraseña:
          <input
            id="clave"
            type="password"
            value={clave}
            onChange={cambiarClave}
          />
        </label>
        <button type="submit" onClick={ingresar}>
          Inicio Sesión
        </button>
        <p>¿Olvido la contraseña? <a href="#">Ingrese para recuperarla</a></p>
      </div>
    );
  }

  // Si está logueado, mostrar opciones de CRUD
  return (
    <>
      <h1>Bienvenido a STEIR</h1>
      <div className="two-column-layout">
        <div className="form-column">
          <button onClick={() => setFormulario('usuarios')}>Usuarios</button>
          <button onClick={() => setFormulario('clientes')}>Clientes</button>
          <button onClick={() => setFormulario('productos')}>Productos</button>
          <button onClick={() => setFormulario('cotizaciones')}>Cotizaciones</button>
          <button onClick={() => setFormulario('ordenesCompra')}>Órdenes de Compra</button>
          <button onClick={() => setFormulario('facturas')}>Facturas</button>
        </div>
        <div className="crud-column">
          {formulario === 'usuarios' && <UsuariosCRUD />}
        </div>
      </div>
    </>
  );
}

export default App;
