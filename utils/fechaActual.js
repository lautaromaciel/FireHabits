const fechaActual = ()=>{
  const ajuste = new Date().getTimezoneOffset();
  const actualMs = new Date().getTime();
  return new Date(actualMs - (ajuste * 60 * 1000));
}

module.exports = fechaActual;
