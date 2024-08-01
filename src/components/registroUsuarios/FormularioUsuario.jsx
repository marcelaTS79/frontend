import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "../../index.css";

function FormularioUsuario({ onRegistrar, usuarioEditando }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [clave, setClave] = useState("");

  useEffect(() => {
    if (usuarioEditando) {
      setNombres(usuarioEditando.nombres);
      setApellidos(usuarioEditando.apellidos);
      setDocumento(usuarioEditando.documento);
      setTelefono(usuarioEditando.telefono);
      setDireccion(usuarioEditando.direccion);
      setEmail(usuarioEditando.email);
      setRol(usuarioEditando.rol);
      setClave(usuarioEditando.clave);
    }
  }, [usuarioEditando]);

  const registrarUsuario = async () => {
    const usuario = {
      nombres,
      apellidos,
      documento,
      telefono,
      direccion,
      email,
      rol,
      clave,
    };

    try {
      const response = await fetch('http://localhost:3000/registrousuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Usuario registrado');
        onRegistrar();// Notificar al componente padre
      } else {
        alert('Error al registrar el usuario');
      }
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <>
      <h1>{usuarioEditando ? 'Editar Usuario' : 'Registrar Usuario'}</h1>
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
          type="email"
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
      <button onClick={registrarUsuario}>{usuarioEditando ? 'Actualizar' : 'Registrar'}</button>
    </>
  );
}

FormularioUsuario.propTypes = {
  onRegistrar: PropTypes.func.isRequired,
  usuarioEditando: PropTypes.object,
};

export default FormularioUsuario;
