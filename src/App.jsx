// App.jsx
import { useEffect, useState } from "react";
import "./index.css";
import logo from "./assets/LOGO STEIR.png";
import UsuariosCRUD from "./components/Usuarios/UsuariosCRUD";
import FormularioUsuario from "./components/registroUsuarios/FormularioUsuario";
import RegistroUsuarioCRUD from "./components/registroUsuarios/registroUsuarioCRUD";
import FormularioCliente from "./components/clientes/FormularioClientes";
import ClientesCRUD from "./components/clientes/ClientesCRUD";

function App() {
  const [rol, setRol] = useState("");
  const [clave, setClave] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [formulario, setFormulario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);

  function cambiarRol(evento) {
    setRol(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  async function ingresar() {
    const peticion = await fetch(
      `http://localhost:3000/login?rol=${encodeURIComponent(
        rol
      )}&clave=${encodeURIComponent(clave)}`,
      {
        credentials: "include",
      }
    );
    if (peticion.ok) {
      setLogueado(true);
    } else {
      setFormulario("usuarios");
      alert("Usuario o clave incorrectos");
    }
  }

  async function validar() {
    const peticion = await fetch("http://localhost:3000/validar", {
      credentials: "include",
    });
    if (peticion.ok) {
      setLogueado(true);
    }
  }

  function cerrarSesion() {
    fetch("http://localhost:3000/logout", { credentials: "include" }).then(
      (response) => {
        if (response.ok) {
          setLogueado(false);
          setFormulario(null);
        }
      }
    );
  }

  const handleRegistrar = (data, tipo) => {
    if (tipo === "usuario") {
      setUsuarios([...usuarios, data]);
    } else if (tipo === "cliente") {
      setClientes([...clientes, data]);
    }
    setFormulario(null); // Ocultar formulario después de registrar
  };

  useEffect(() => {
    validar();
    
    async function fetchUsuarios() {
      const response = await fetch("http://localhost:3000/usuarios", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        console.error("Error al buscar usuarios");
      }
    }

    async function fetchClientes() {
      const response = await fetch("http://localhost:3000/clientes", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setClientes(data);
      } else {
        console.error("Error al buscar clientes");
      }
    }

    fetchUsuarios();
    fetchClientes();
  }, []);

  const renderFormulario = () => {
    switch (formulario) {
      case "usuarios":
        return (
          <div className="contenedor-registro-usuarios">
            <div className="crud-usuarios">
              <UsuariosCRUD usuarios={usuarios} />
            </div>
            <div className="formulario-usuarios">
              <FormularioUsuario onRegistrar={handleRegistrar} />
            </div>
          </div>
        );
      case "registrousuarios":
        return (
          <div className="contenedor-registro-usuarios">
            <div className="crud-usuarios">
              <RegistroUsuarioCRUD />
            </div>
            <div className="formulario-usuarios">
              <FormularioUsuario onRegistrar={handleRegistrar} />
            </div>
          </div>
        );
      case "clientes":
        return (
          <div className="contenedor-registro-clientes">
            <div className="crud-clientes">
              <ClientesCRUD />
            </div>
            <div className="formulario-clientes">
              <FormularioCliente 
                onRegistrar={(cliente) => handleRegistrar(cliente, "cliente")} 
                clienteEditando={null}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {!logueado ? (
        formulario === "usuarios" ? (
          <FormularioUsuario onRegistrar={handleRegistrar} />
        ) : (
          <div className="container-login">
            <div className="header">
              <span>Inicio</span> &lt;{" "}
              <span onClick={() => setFormulario(null)}>Volver atrás</span>
            </div>
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <h1>Sistema Taller Escultura e Imagineria Religiosa</h1>
            <p>
              ¿No tienes una Cuenta?{" "}
              <a href="#" onClick={() => setFormulario("usuarios")}>
                Realizar Registro
              </a>
            </p>
            <label htmlFor="rol">
              Usuario:
              <input id="rol" type="text" value={rol} onChange={cambiarRol} />
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
            <p>
              ¿Olvido la contraseña? <a href="#">Ingrese para recuperarla</a>
            </p>
          </div>
        )
      ) : (
        <>
          <h1>Bienvenido a STEIR</h1>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
          <div className="two-column-layout">
            <div className="form-column">
              <button onClick={() => setFormulario("usuarios")}>
                Usuarios
              </button>
              <button onClick={() => setFormulario("registrousuarios")}>
                Registro Usuarios
              </button>
              <button onClick={() => setFormulario("clientes")}>
                Clientes
              </button>
              <button onClick={() => setFormulario("productos")}>
                Productos
              </button>
              <button onClick={() => setFormulario("cotizaciones")}>
                Cotizaciones
              </button>
              <button onClick={() => setFormulario("ordenesCompra")}>
                Órdenes de Compra
              </button>
              <button onClick={() => setFormulario("facturas")}>
                Facturas
              </button>
            </div>
            <div className="crud-column">
              {renderFormulario()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
