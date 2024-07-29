import { useState } from 'react';
import './UsuariosCRUD.css';

const UsuariosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Ejemplo de usuarios. En una aplicación real, estos vendrían de una base de datos
  const exampleUsers = [
    { id: 1, nombres: "Juan", apellidos: "Pérez", documento: "123456789", telefono: "1234567890", direccion: "Calle Falsa 123", email: "juan@example.com", rol: "Admin", clave: "pass123" },
    { id: 2, nombres: "María", apellidos: "Gómez", documento: "987654321", telefono: "0987654321", direccion: "Avenida Siempre Viva 742", email: "maria@example.com", rol: "User", clave: "pass456" }
  ];

  // Simula la carga de usuarios
  useState(() => {
    setUsuarios(exampleUsers);
  }, []);

  const handleSearch = () => {
    const user = exampleUsers.find((user) => user.id === parseInt(searchTerm));
    setUsuarios(user ? [user] : []);
  };

  const handleResetSearch = () => {
    setUsuarios(exampleUsers);
    setSearchTerm("");
  };

  const handleInputChange = (index, field, value) => {
    const newUsuarios = [...usuarios];
    newUsuarios[index][field] = value;
    setUsuarios(newUsuarios);
  };

  const handleSave = () => {
    alert('Usuario actualizado');
  };

  const handleDelete = (index) => {
    const newUsuarios = usuarios.filter((_, i) => i !== index);
    setUsuarios(newUsuarios);
    alert('Usuario eliminado');
  };

  return (
    <div className="usuarios-crud">
      <h2>Usuarios</h2>
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
            <th>Guardar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>
                <input
                  type="text"
                  value={usuario.nombres}
                  onChange={(e) => handleInputChange(index, 'nombres', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={usuario.apellidos}
                  onChange={(e) => handleInputChange(index, 'apellidos', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={usuario.documento}
                  onChange={(e) => handleInputChange(index, 'documento', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={usuario.telefono}
                  onChange={(e) => handleInputChange(index, 'telefono', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={usuario.direccion}
                  onChange={(e) => handleInputChange(index, 'direccion', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={usuario.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={usuario.rol}
                  onChange={(e) => handleInputChange(index, 'rol', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="password"
                  value={usuario.clave}
                  onChange={(e) => handleInputChange(index, 'clave', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleSave(index)}>Guardar</button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosCRUD;
