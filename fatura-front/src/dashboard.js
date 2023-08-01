import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const orderedMonths = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

const sortMonths = (months) => {
  return months.sort((a, b) => orderedMonths.indexOf(a.slice(0, 3)) - orderedMonths.indexOf(b.slice(0, 3)));
};

const Dashboard = ({ numeroCliente }) => {
  const [faturas, setFaturas] = useState([]);

  useEffect(() => {
    fetchFaturas();
  }, []);

  const fetchFaturas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/faturas');
      setFaturas(response.data);
    } catch (error) {
      console.error('Erro ao buscar faturas:', error);
    }
  };

  const groupFaturasByMes = () => {
    const faturasByMes = {};
    faturas.forEach((fatura) => {
      if (!faturasByMes[fatura.mesReferencia]) {
        faturasByMes[fatura.mesReferencia] = [];
      }
      faturasByMes[fatura.mesReferencia].push(fatura);
    });
    return faturasByMes;
  };

  const calcularVariacoes = (faturasMes) => {
    let energiaEletricaValor = 0;
    let energiaInjetadaHfpValor = 0;
    let enCompSemIcmsValor = 0;
    let valorTotal = 0;

    faturasMes.forEach((fatura) => {
      energiaEletricaValor += fatura.energiaEletricaValor;
      energiaInjetadaHfpValor += fatura.energiaInjetadaHfpValor;
      enCompSemIcmsValor += fatura.enCompSemIcmsValor;
      valorTotal += fatura.valorTotal;
    });

    return {
      energiaEletricaValor,
      energiaInjetadaHfpValor,
      enCompSemIcmsValor,
      valorTotal,
    };
  };

  const faturasByMes = groupFaturasByMes();
  const sortedMonths = sortMonths(Object.keys(faturasByMes));

  const variacoesMeses = sortedMonths.map((mesReferencia) => {
    const faturasMes = faturasByMes[mesReferencia];
    return calcularVariacoes(faturasMes);
  });

  const labels = sortedMonths;

  const datasets = [
    {
      label: 'Energia Elétrica Valor',
      data: variacoesMeses.map((v) => v.energiaEletricaValor),
      borderColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'Energia Injetada HFP Valor',
      data: variacoesMeses.map((v) => v.energiaInjetadaHfpValor),
      borderColor: 'rgba(54, 162, 235, 1)',
    },
    {
      label: 'En. Comp. Sem ICMS Valor',
      data: variacoesMeses.map((v) => v.enCompSemIcmsValor),
      borderColor: 'rgba(75, 192, 192, 1)',
    },
    {
      label: 'Valor Total',
      data: variacoesMeses.map((v) => v.valorTotal),
      borderColor: 'rgba(153, 102, 255, 1)',
    },
  ];

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            if (label) {
              return `${label}: ${context.parsed.y}`;
            }
            return `${context.parsed.y}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h1>Dashboard do Cliente {numeroCliente}</h1>
      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;