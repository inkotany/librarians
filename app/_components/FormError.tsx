import React from "react";

interface FormErrorProps {
  error?: string | null;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;

  return <p className="text-red-500 text-sm">{error}</p>;
};

export default FormError;
