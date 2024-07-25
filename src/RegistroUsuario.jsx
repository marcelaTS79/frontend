import  { useState } from 'react';
import PropTypes from 'prop-types';
import "./index.css";

function RegistroUsuario({ onRegistrar }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [clave, setClave] = useState("");

  function handleRegistrar() {
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
    onRegistrar(); // Para notificar al componente padre que el registro se completó
  }

  return (
    <>
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
      <button onClick={handleRegistrar}>Registrar</button>
    </>
  );
}

RegistroUsuario.propTypes = {
    onRegistrar: PropTypes.func.isRequired,
  };

export default RegistroUsuario;
