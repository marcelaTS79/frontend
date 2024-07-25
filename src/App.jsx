import { useState } from "react";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState("");//Estado para guardar el usuario
  const [clave, setClave] = useState("");//Estado para gusradr clave
  const [logueado, setLogueado] = useState(false)

  // Estados para los campos de registro
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  

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

  
  function registrarUsuario() {
    console.log(`Registrando usuario con los siguientes datos:
    Nombres: ${nombres}
    Apellidos: ${apellidos}
    Documento: ${documento}
    Teléfono: ${telefono}
    Dirección: ${direccion}
    Email: ${email}
    Rol: ${rol}
    Clave: ${clave}`);

    // Aquí puedes agregar la lógica para registrar el usuario, por ejemplo, enviando los datos a un servidor
    alert("Usuario registrado exitosamente");
  }

  return (
    <>
    {logueado ? (<>
      <h1>Registro Usuarios</h1>
      <label>
            Nombres:
            <input
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </label>
          <label>
            Apellidos:
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </label>
          <label>
            Documento:
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </label>
          <label>
            Dirección:
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Rol:
            <input
              type="text"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            />
          </label>
          <label>
            Clave:
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </label>
          <button onClick={registrarUsuario}>Registrar</button>
        </>
      ) : (
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
    )}
    </>
  );
}

export default App;
