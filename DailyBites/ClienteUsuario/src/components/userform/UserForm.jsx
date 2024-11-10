// src/components/UserForm.jsx
import React from 'react';

const UserForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Correo:</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hora de entrega:</label>
        <select name="horaEntrega" value={formData.horaEntrega} onChange={handleChange} required>
          {[...Array(13).keys()].map((i) => (
            <option key={i} value={`${i + 7}:00`}>
              {i + 7}:00
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Método de pago:</label>
        <select name="metodoPago" value={formData.metodoPago} onChange={handleChange} required>
          <option value="Nequi">Nequi</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Banco">Banco</option>
        </select>
      </div>
    </form>
  );
};

export default UserForm;
