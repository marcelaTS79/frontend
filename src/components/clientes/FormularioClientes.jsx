import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "../../index.css";

function FormularioCliente({ onRegistrar, clienteEditando }) {
  const [nombres_apellidos, setNombresApellidos] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [idUsuario, setIdUsuario] = useState(""); 

  useEffect(() => {
    if (clienteEditando) {
      setNombresApellidos(clienteEditando.nombres_apellidos);
      setDocumento(clienteEditando.documento);
      setTelefono(clienteEditando.telefono);
      setDireccion(clienteEditando.direccion);
      setEmail(clienteEditando.email);
      setIdUsuario(clienteEditando.idUsuario); 
    }
  }, [clienteEditando]);

  const registrarCliente = async () => {
    const cliente = {
      nombres_apellidos, 
      documento,
      telefono,
      direccion,
      email,
      idUsuario // Incluye idUsuario en el cliente
    };

    try {
      const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Cliente registrado');
        onRegistrar(); // Notificar al componente padre
      } else {
        const errorData = await response.json();
        alert('Error al registrar el cliente: ' + errorData.message);
      }
    } catch (err) {
      console.error('Error al registrar el cliente:', err);
      alert('Error al registrar el cliente');
    }
  };

  return (
    <>
      <h1>{clienteEditando ? 'Editar Cliente' : 'Registrar Cliente'}</h1>
      <label>
        Nombres y Apellidos:
        <input
          type="text"
          value={nombres_apellidos}
          onChange={(e) => setNombresApellidos(e.target.value)}
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
        ID Usuario:
        <input
          type="text"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
        />
      </label>
      <button onClick={registrarCliente}>{clienteEditando ? 'Actualizar' : 'Registrar'}</button>
    </>
  );
}

FormularioCliente.propTypes = {
  onRegistrar: PropTypes.func.isRequired,
  clienteEditando: PropTypes.object,
};

export default FormularioCliente;
