const inputTiempo = document.getElementById('input-tiempo');
const btnRegistrar = document.getElementById('btn-registrar');
const btnResetear = document.getElementById('btn-resetear');
const listaTiempos = document.getElementById('lista-tiempos');
const textoVueltaRapida = document.getElementById('mejor-tiempo');
const textoPromedioVuelta = document.getElementById('promedio');
const textoPeorVuelta = document.getElementById('peor-tiempo');
const tiempos = [];

  function formatearTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);
    const segundosRestantes = (segundosTotales % 60).toFixed(3);
    const segundosFormateados = segundosRestantes.padStart(6, "0");
    return minutos + ":" + segundosFormateados;
  }

  function promediosVueltas(tiempos) {
    if (tiempos.length === 0) {
        return 0;
    }
    let suma = 0;
    for (let i = 0; i < tiempos.length; i++)
    suma = suma + tiempos[i];
    const promedioSegundos = suma / tiempos.length;
    return formatearTiempo(promedioSegundos);
  }


btnRegistrar.addEventListener('click', function() {

  console.log('¡boton pulsado!');

  const tiempoIngresado = inputTiempo.value;
  const partesTiempo = tiempoIngresado.split(':');
  const parteMinutos = parseFloat(partesTiempo[0]);
  const parteSegundos = parseFloat(partesTiempo[1]);
  const segundosTotales = (parteMinutos * 60) + parteSegundos;

  tiempos.push(segundosTotales);

  const nuevaVuelta = document.createElement('li');

  nuevaVuelta.textContent = `Vuelta ${tiempos.length}: ${tiempoIngresado}`;

  listaTiempos.appendChild(nuevaVuelta);

  const vueltaRapidaSegundos = Math.min(...tiempos);
  const vueltaRapidaTexto = formatearTiempo(vueltaRapidaSegundos);
  console.log("vuelta rapida", vueltaRapidaTexto);

  textoVueltaRapida.textContent = `Vuelta rápida: ${vueltaRapidaTexto}`;

  const vueltaLentaSegundos = Math.max(...tiempos);
  const vueltaLentaTexto = formatearTiempo(vueltaLentaSegundos);

  textoPeorVuelta.textContent = `Vuelta lenta: ${vueltaLentaTexto}`;

  const promedioTexto = promediosVueltas(tiempos);
  textoPromedioVuelta.textContent = `Promedio vuelta: ${promedioTexto}`;

  inputTiempo.value = '';
});

btnResetear.addEventListener('click', function() {
  listaTiempos.innerHTML = '';
  tiempos.length = 0;
  textoVueltaRapida.textContent = "Vuelta Rapida: --:--.---";
  textoPeorVuelta.textContent = "Peor Vuelta: --:--.---";
  textoPromedioVuelta.textContent = "Promedio de Vuelta: --:--.---";
});