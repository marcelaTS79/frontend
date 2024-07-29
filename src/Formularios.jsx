import PropTypes from 'prop-types';

function Formularios({ setFormulario }) {
  return (
    <>
      <h1>Opciones de Formularios</h1>
      <button onClick={() => setFormulario('usuarios')}>Registro de Usuarios</button>
      <button onClick={() => setFormulario('clientes')}>Registro de Clientes</button>
      <button onClick={() => setFormulario('productos')}>Registro de Productos</button>
      <button onClick={() => setFormulario('ventas')}>Ventas</button>
    </>
  );
}

Formularios.propTypes = {
  setFormulario: PropTypes.func.isRequired,
};

export default Formularios;
