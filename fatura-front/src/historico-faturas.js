import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './historico-faturas.css';

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
  'NOV',
  'DEZ',
];

const HistoricoFaturas = () => {
  const [faturas, setFaturas] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null); 

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

  const groupByCliente = () => {
    const clienteMap = new Map();
    faturas.forEach((fatura) => {
      if (!clienteMap.has(fatura.cliente)) {
        clienteMap.set(fatura.cliente, []);
      }
      clienteMap.get(fatura.cliente).push(fatura);
    });
    return clienteMap;
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const getNomeCliente = (numeroCliente) => {
    const faturaCliente = faturas.find((fatura) => fatura.cliente === numeroCliente);
    return faturaCliente ? faturaCliente.nome : 'Nome não encontrado';
  };

  const sortMonths = (months) => {
    return months.sort((a, b) => orderedMonths.indexOf(a.slice(0, 3)) - orderedMonths.indexOf(b.slice(0, 3)));
  };

  return (
    <div>
      <h1>Histórico de Faturas</h1>
      <table>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Número do Cliente</th>
            <th>Meses de Referência</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(groupByCliente()).map(([cliente, faturasCliente]) => (
            <tr key={cliente}>
              <td>{getNomeCliente(cliente)}</td>
              <td>
                <Link to={`/dashboard/${cliente}`} className="customer-button">
                  {cliente}
                </Link>
              </td>
              <td>
                {sortMonths(
                  faturasCliente.map((fatura) => fatura.mesReferencia)
                ).map((month) => (
                  <button
                    key={month}
                    onClick={() => handleMonthClick(month)}
                    className={selectedMonth === month ? 'active' : ''}
                  >
                    {month}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMonth && (
        <div className="fatura-details">
          <h2>Detalhes da Fatura - Mês: {selectedMonth}</h2>
          <table>
            <thead>
              <tr>
                <th>Número do Cliente</th>
                <th>Data de Vencimento</th>
                <th>Consumo de Energia</th>
                <th>Preço Unitário</th>
                <th>Valor Total </th>
                <th>Energia Injetada HFP </th>
                <th>Preço Unitário HFP </th>
                <th>Valor Total HFP </th>
                <th>Energia Compensada Sem ICMS </th>
                <th>Preço Unitário Sem ICMS </th>
                <th>Valor Total Sem ICMS </th>
                <th>Contribuição Ilum. Pública (R$)</th>
                <th>Taxa 2ª Via de Débito (R$)</th>
                <th>Valor Total (R$)</th>
              </tr>
            </thead>
            <tbody>
              {faturas
                .filter((fatura) => fatura.mesReferencia === selectedMonth)
                .map((fatura) => (
                  <tr key={fatura.id}>
                    <td>{fatura.cliente}</td>
                    <td>{fatura.dataVencimento}</td>
                    <td>{fatura.energiaEletricaKwh}</td>
                    <td>{fatura.energiaEletricaPrecoUnit}</td>
                    <td>{fatura.energiaEletricaValor}</td>
                    <td>{fatura.energiaInjetadaHfpKwh}</td>
                    <td>{fatura.energiaInjetadaHfpPrecoUnit}</td>
                    <td>{fatura.energiaInjetadaHfpValor}</td>
                    <td>{fatura.enCompSemIcmsKwh}</td>
                    <td>{fatura.enCompSemIcmsPrecoUnit}</td>
                    <td>{fatura.enCompSemIcmsValor}</td>
                    <td>{fatura.contribIlumPublicaMunicipal}</td>
                    <td>{fatura.taxa2Via}</td>
                    <td>{fatura.valorTotal}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoricoFaturas;
