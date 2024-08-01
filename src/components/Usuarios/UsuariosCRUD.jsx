import { useState, useEffect } from 'react';

const UsuariosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar usuarios desde el servidor
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          credentials: 'include'
        });
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSearch = () => {
    const user = usuarios.find((user) => user.id === parseInt(searchTerm));
    setUsuarios(user ? [user] : []);
  };

  const handleResetSearch = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        credentials: 'include'
      });
      const data = await response.json();
      setUsuarios(data);
      setSearchTerm("");
    } catch (err) {
      console.error('Error resetting search:', err);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newUsuarios = [...usuarios];
    newUsuarios[index][field] = value;
    setUsuarios(newUsuarios);
  };

  const handleSave = async (index) => {
    const usuario = usuarios[index];
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario),
        credentials: 'include'
      });
      if (response.ok) {
        alert('Usuario actualizado');
      } else {
        alert('Error al actualizar el usuario');
      }
    } catch (err) {
      console.error('Error al actualizar el usuario:', err);
    }
  };

  const handleDelete = async (index) => {
    const usuario = usuarios[index];
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setUsuarios(usuarios.filter((_, i) => i !== index));
        alert('Usuario eliminado');
      } else {
        alert('Error al eliminar el usuario');
      }
    } catch (err) {
      console.error('Error al eliminar el usuario:', err);
    }
  };

  return (
    <div className="usuarios-crud">
      <h2>Admin Usuarios</h2>
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
            <th>Rol</th>
            <th>Clave</th>
            <th>Actualizar</th>
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
                <button onClick={() => handleSave(index)}>Actualizar</button>
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
