import { useState, useEffect } from "react";

const RegistroUsuarioCRUD = () => {
  const [registroUsuarios, setRegistroUsuarios] = useState([]);
  const [originalUsuarios, setOriginalUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRegistroUsuarios = async () => {
    const response = await fetch("http://localhost:3000/registrousuarios", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setRegistroUsuarios(data);
      setOriginalUsuarios(data); // Guardar la lista original
    } else {
      console.error("Failed to fetch registros de usuarios");
    }
  };

  useEffect(() => {
    fetchRegistroUsuarios();
  }, []);

  const handleInputChange = (index, field, value) => {
    const newRegistroUsuarios = [...registroUsuarios];
    newRegistroUsuarios[index][field] = value;
    setRegistroUsuarios(newRegistroUsuarios);
  };

  const handleSave = async (index) => {
    const registroUsuario = registroUsuarios[index];
    try {
      const response = await fetch(`http://localhost:3000/registrousuarios/${registroUsuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registroUsuario),
        credentials: "include",
      });

      if (response.ok) {
        alert("Registro de usuario actualizado");
        fetchRegistroUsuarios();  // Actualizar la lista después de guardar
      } else {
        alert("Error al actualizar el registro de usuario");
      }
    } catch (err) {
      console.error("Error al actualizar el registro de usuario:", err);
      alert("Error al actualizar el registro de usuario");
    }
  };

  const handleDelete = async (index) => {
    const registroUsuario = registroUsuarios[index];
    try {
      const response = await fetch(`http://localhost:3000/registrousuarios/${registroUsuario.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const newRegistroUsuarios = registroUsuarios.filter((u) => u.id !== registroUsuario.id);
        setRegistroUsuarios(newRegistroUsuarios);
        alert("Registro de usuario eliminado");
      } else {
        alert("Error al eliminar el registro de usuario");
      }
    } catch (err) {
      console.error("Error al eliminar el registro de usuario:", err);
      alert("Error al eliminar el registro de usuario");
    }
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      setRegistroUsuarios(originalUsuarios); // Mostrar todos los usuarios si la búsqueda está vacía
    } else {
      // Filtrar usuarios basados en el término de búsqueda
      const filteredUsuarios = originalUsuarios.filter(usuario =>
        Object.values(usuario).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setRegistroUsuarios(filteredUsuarios);
    }
  };

  const handleResetSearch = () => {
    setSearchTerm(""); // Limpiar el término de búsqueda
    setRegistroUsuarios(originalUsuarios); // Volver a mostrar todos los usuarios
  };

  return (
    <div className="registro-usuarios-crud">
      <h2>Gestión de Usuarios</h2>
      <div className="buscar-usuarios">
        <input
          type="text"
          placeholder="Buscar Usuarios"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleResetSearch}>Eliminar Búsqueda</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Clave</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registroUsuarios.map((registroUsuario, index) => (
            <tr key={registroUsuario.id}>
              <td>{registroUsuario.id}</td>
              <td>
                <input
                  type="text"
                  value={registroUsuario.nombres}
                  onChange={(e) => handleInputChange(index, "nombres", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={registroUsuario.apellidos}
                  onChange={(e) => handleInputChange(index, "apellidos", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={registroUsuario.documento}
                  onChange={(e) => handleInputChange(index, "documento", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={registroUsuario.telefono}
                  onChange={(e) => handleInputChange(index, "telefono", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={registroUsuario.direccion}
                  onChange={(e) => handleInputChange(index, "direccion", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={registroUsuario.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={registroUsuario.rol}
                  onChange={(e) => handleInputChange(index, "rol", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="password"
                  value={registroUsuario.clave}
                  onChange={(e) => handleInputChange(index, "clave", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleSave(index)}>Actualizar</button>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroUsuarioCRUD;
