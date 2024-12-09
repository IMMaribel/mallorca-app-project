import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Actualiza el estado para renderizar una UI alternativa en caso de error
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Puedes registrar el error en un servicio de reporte de errores
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // UI alternativa en caso de error
      return (
        <div className="flex items-center justify-center h-screen bg-red-100 text-red-800">
          <h1>Oops! Something went wrong.</h1>
        </div>
      );
    }
    // Renderiza los hijos si no hay error
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, // Aseguramos que `children` es requerido y del tipo `node`
};

export default ErrorBoundary;
