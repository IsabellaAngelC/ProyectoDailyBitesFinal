// src/components/LoginButton.jsx

import React from 'react';

const LoginButton = ({ onClick }) => {
  return (
    <button type="submit" onClick={onClick}>
      Entrar
    </button>
  );
};

export default LoginButton;
