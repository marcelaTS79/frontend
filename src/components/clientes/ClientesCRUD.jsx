import { useState, useEffect } from "react";
import "../../index.css";

const ClientesCRUD = () => {
  const [clientes, setClientes] = useState([]);
  const [originalClientes, setOriginalClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClientes = async () => {
    const response = await fetch("http://localhost:3000/clientes", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setClientes(data);
      setOriginalClientes(data); // Guardar la lista original
    } else {
      console.error("Failed to fetch clientes");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleInputChange = (index, field, value) => {
    const newClientes = [...clientes];
    newClientes[index][field] = value;
    setClientes(newClientes);
  };

  const handleSave = async (index) => {
    const cliente = clientes[index];
    try {
      const response = await fetch(`http://localhost:3000/clientes/${cliente.idCliente}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
        credentials: "include",
      });

      if (response.ok) {
        alert("Cliente actualizado");
        fetchClientes(); // Actualizar la lista después de guardar
      } else {
        alert("Error al actualizar el cliente");
      }
    } catch (err) {
      console.error("Error al actualizar el cliente:", err);
      alert("Error al actualizar el cliente");
    }
  };

  const handleDelete = async (index) => {
    const cliente = clientes[index];
    try {
      const response = await fetch(`http://localhost:3000/clientes/${cliente.idCliente}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const newClientes = clientes.filter((c) => c.idCliente !== cliente.idCliente);
        setClientes(newClientes);
        alert("Cliente eliminado");
      } else {
        alert("Error al eliminar el cliente");
      }
    } catch (err) {
      console.error("Error al eliminar el cliente:", err);
      alert("Error al eliminar el cliente");
    }
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      setClientes(originalClientes); // Mostrar todos los clientes si la búsqueda está vacía
    } else {
      // Convertir el término de búsqueda a número
      const searchId = parseInt(searchTerm, 10);

      // Filtrar clientes basados en el ID exacto
      const filteredClientes = originalClientes.filter(cliente => 
        cliente.idCliente === searchId
      );
      
      setClientes(filteredClientes);
    }
  };

  const handleResetSearch = () => {
    setSearchTerm(""); // Limpiar el término de búsqueda
    setClientes(originalClientes); // Volver a mostrar todos los clientes
  };

  return (
    <div className="registro-clientes-crud">
      <h2>Gestión de Clientes</h2>
      <div className="buscar-clientes">
        <input
          type="text"
          placeholder="Buscar Clientes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleResetSearch}>Eliminar Búsqueda</button>
      </div>
        <thead>
          <tr>
            <th>ID Cliente</th>
            <th>Nombres y Apellidos</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>ID Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={cliente.idCliente}>
              <td>{cliente.idCliente}</td>
              <td>
                <input
                  type="text"
                  value={cliente.nombres_apellidos}
                  onChange={(e) => handleInputChange(index, "nombres_apellidos", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={cliente.documento}
                  onChange={(e) => handleInputChange(index, "documento", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={cliente.telefono}
                  onChange={(e) => handleInputChange(index, "telefono", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={cliente.direccion}
                  onChange={(e) => handleInputChange(index, "direccion", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={cliente.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={cliente.idUsuario}
                  onChange={(e) => handleInputChange(index, "idUsuario", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleSave(index)}>Actualizar</button>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
    </div>
  );
};

export default ClientesCRUD;
