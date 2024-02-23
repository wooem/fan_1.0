function calcularMargem() {
  const precoCompra = parseFloat(document.getElementById('precoCompra').value);
  const precoVendaUnitario = parseFloat(document.getElementById('precoVendaUnitario').value);
  const quantidade = parseFloat(document.getElementById('quantidade').value);

  if (isNaN(precoCompra) || isNaN(precoVendaUnitario) || isNaN(quantidade)) {
      alert('Por favor, insira números válidos.');
      return;
  }

  const precoVendaTotal = precoVendaUnitario * quantidade;
  const margemAbsoluta = precoVendaTotal - (precoCompra * quantidade);
  const margemPercentual = ((precoVendaTotal - (precoCompra * quantidade)) / precoVendaTotal) * 100;
  

  const resultMargemAbs = document.getElementById('resultMargemAbs');
  const resultMargemPercentual = document.getElementById('resultMargemPercentual');
  

  resultMargemAbs.innerHTML = `Margem Absoluta: R$${margemAbsoluta.toFixed(2)}`;
  resultMargemPercentual.innerHTML = `Margem Percentual: ${margemPercentual.toFixed(2)}%`;
  
}


function calcularMarkup() {
  const ttvMarkup = parseFloat(document.getElementById('precoVendaUnitarioMarkup').value);
  const ttcMarkup = parseFloat(document.getElementById('ttc').value);

  if (isNaN(ttvMarkup) || isNaN(ttcMarkup) || ttcMarkup <= ttvMarkup) {
      alert('Por favor, insira números válidos. O TTC deve ser maior que o TTV.');
      return;
  }

  const markup = ((ttcMarkup / ttvMarkup) - 1) * 100;

  const resultMarkup = document.getElementById('resultMarkup');
  resultMarkup.innerText = `Markup: ${markup.toFixed(2)}%`;
}

function calcularTTCDesejado() {
  const ttvTTCDesejado = parseFloat(document.getElementById('precoVendaUnitarioMarkup').value);
  const markupTTCDesejado = parseFloat(document.getElementById('markupTTC').value);

  if (isNaN(ttv) || isNaN(markup)) {
    alert('Por favor, insira números válidos.');
    return;
  }

  const markupDecimalTTCDesejado = markupTTCDesejado / 100;
  const ttcDesejado = ttvTTCDesejado * (1 + markupDecimalTTCDesejado);

  const resultTTCDesejado = document.getElementById('resultTTCDesejado');
  resultTTCDesejado.innerText = `TTC Desejado: R$${ttcDesejado.toFixed(2)}`;
}

function converterParaHectolitros() {
  const litros = parseFloat(document.getElementById('litros').value);
  const unidadesPorCaixa = parseFloat(document.getElementById('unidadesPorCaixa').value);
  const caixas = parseFloat(document.getElementById('caixas').value);

  const hectolitros = (litros / 100000) * unidadesPorCaixa * caixas;

  const resultadoHectolitros = document.getElementById('resultadoHectolitros');
  resultadoHectolitros.innerHTML = `Equivalente em hectolitros: ${hectolitros.toFixed(2)} hL`;
}

function calcularQuantidadeCaixas() {
  const hectolitros = parseFloat(document.getElementById('hectolitros').value);
  const ML_Unidade = parseFloat(document.getElementById('mlunidade').value);
  const unidadesPorCaixa = parseFloat(document.getElementById('unidadesPorCaixaReverse').value);

  if (isNaN(hectolitros) || isNaN(ML_Unidade) || isNaN(unidadesPorCaixa) || hectolitros < 0 || ML_Unidade < 0 || unidadesPorCaixa < 0) {
      alert('Por favor, insira números válidos. Hectolitros, mililitros por unidade e unidades por caixa devem ser valores positivos.');
      return;
  }

  const quantidadeCaixas = Math.round(hectolitros / ((ML_Unidade/100000) * unidadesPorCaixa));

  const resultCaixas = document.getElementById('resultCaixas');
  resultCaixas.innerHTML = `Quantidade de caixas: ${quantidadeCaixas}`;
}

function calculateRE() {
  const rePercentage = parseFloat(document.getElementById("rePercentage").value);
  const segment = document.getElementById("segment").value;
  const isWeekday = document.getElementById("isWeekday").value === "true";
  const totalVisits = parseInt(document.getElementById("totalVisits").value);
  const minRotaVisits = parseInt(document.getElementById("minRotaVisits").value) || 0;

  let maxVisitsPerSegment = 0;
  let maxTimePerSegment = 0;

  switch (segment) {
    case "cluster1":
      maxTimePerSegment = 15;
      break;
    case "cluster2":
      maxTimePerSegment = 20;
      break;
    case "cluster3":
      maxTimePerSegment = 25;
      break;
    case "cluster4":
      maxTimePerSegment = 30;
      break;
    case "cluster5":
      maxTimePerSegment = 60;
      break;
    default:
      break;
  }

  if (isWeekday) {
    maxVisitsPerSegment = Math.floor(280 / maxTimePerSegment);
  } else {
    maxVisitsPerSegment = Math.floor(168 / maxTimePerSegment);
  }

  const maxTimeTotal = maxVisitsPerSegment * maxTimePerSegment;

  const remainingVisits = totalVisits - minRotaVisits;
  const remainingTime = maxTimeTotal - minRotaVisits * 2; // Assuming 2 minutes per visit for Rota Mínima

  const reAchieved = ((maxTimeTotal - minRotaVisits * 2) / maxTimeTotal) * 100;

  const averageTimePerVisit = remainingTime / remainingVisits;
  const formattedAverageTimePerVisit = formatMinutesToTime(averageTimePerVisit);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div style="background-color: #00BFFF; padding: 10px; margin-bottom: 10px;">
      <p>Quantidade de PDVs para ${rePercentage}% de RE com tempo máximo de ${maxTimePerSegment} minutos: ${Math.min(maxVisitsPerSegment, totalVisits)} PDVs</p>
    </div>
    <div style="background-color: #87CEFA; padding: 10px; margin-bottom: 10px;">
      <p>Quantidade média de tempo por visita para ${rePercentage}% de RE: ${formattedAverageTimePerVisit}</p>
    </div>
    <div style="background-color: #87CEEB; padding: 10px; margin-bottom: 10px;">
      <p>Quantidade de PDVs com visita de 2 minutos (Rota Mínima): ${minRotaVisits} PDVs</p>
      <p>Quantidade média de tempo por visita dos demais PDVs: ${formatMinutesToTime(averageTimePerVisit - 2)}</p>
    </div>
  `;
}


function formatMinutesToTime(mins) {
  const minutes = Math.floor(mins);
  const seconds = Math.round((mins - minutes) * 60);
  return `${minutes} minutos e ${seconds} segundos`;
}



function toggleCalculator(calculatorId) {
  const calculadoras = document.querySelectorAll('.calculadora');
  calculadoras.forEach(calculadora => {
      calculadora.classList.remove('visible');
  });

  const calculadoraSelecionada = document.getElementById(calculatorId);
  calculadoraSelecionada.classList.add('visible');
}
