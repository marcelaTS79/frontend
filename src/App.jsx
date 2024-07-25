import { useState } from "react";
import "./index.css";
import RegistroUsuario from "./RegistroUsuario";

function App() {
  const [usuario, setUsuario] = useState("");//Estado para guardar el usuario
  const [clave, setClave] = useState("");//Estado para gusradr clave
  const [logueado, setLogueado] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  function ingresar() {
    console.log(`usuario:`, usuario);
    console.log(`clave:`, clave);
    if (usuario === "jefe de colaboradores" && clave === "12345") {
      alert("Datos correctos");
      setLogueado(true)
    } else {
      alert("Datos incorrectos");
    }
  }

  function handleRegistroCompleto() {
    setLogueado(false);
  }

  if (logueado) {
    return <RegistroUsuario onRegistrar={handleRegistroCompleto} />;
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <label htmlFor="usuario">
        Usuario:
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={cambiarUsuario}
        />
      </label>
      <label htmlFor="clave">
        Clave:
        <input
          id="clave"
          type="password"
          value={clave}
          onChange={cambiarClave}
        />
      </label>
      <button type="submit" onClick={ingresar}>
        Ingresar
      </button>
    </>
  );
}

export default App;