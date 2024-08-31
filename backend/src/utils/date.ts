export const getLocalNow = () => {
  const now = new Date();

  return now.toLocaleString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Utiliza el formato de 24 horas
  });
};
