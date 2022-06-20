const locales: { [key: string]: Record<any, any> | undefined } = {
  // 'en' locale is required!
  en: {
    header: "Do you need more time?",
    message: "Your session will end automatically",
    extendSessionBtn: "I need more time",
    resetSessionBtn: "End session",
  },
  es: {
    header: "¿Necesita más tiempo?",
    message: "Su sesión se cerrará automáticamente",
    extendSessionBtn: "Necesito más tiempo",
    resetSessionBtn: "Cerrar sesión",
  },
};

export default locales;
