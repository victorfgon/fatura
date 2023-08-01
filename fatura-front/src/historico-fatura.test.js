import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import HistoricoFaturas from './historico-faturas';

jest.mock('axios');

const mockFaturasData = [
    {
      id: 1,
      cliente: '123',
      nome: 'João da Silva',
      mesReferencia: 'JAN/2023',
      dataVencimento: '2023-01-10',
      energiaEletricaKwh: 200,
      energiaEletricaPrecoUnit: 0.50,
      energiaEletricaValor: 100,
      energiaInjetadaHfpKwh: 50,
      energiaInjetadaHfpPrecoUnit: 0.30,
      energiaInjetadaHfpValor: 15,
      enCompSemIcmsKwh: 150,
      enCompSemIcmsPrecoUnit: 0.40,
      enCompSemIcmsValor: 60,
      contribIlumPublicaMunicipal: 5,
      taxa2Via: 2,
      valorTotal: 182,
    },
    {
      id: 2,
      cliente: '456',
      nome: 'Maria Souza',
      mesReferencia: 'FEV/2023',
      dataVencimento: '2023-02-10',
      energiaEletricaKwh: 180,
      energiaEletricaPrecoUnit: 0.55,
      energiaEletricaValor: 99,
      energiaInjetadaHfpKwh: 40,
      energiaInjetadaHfpPrecoUnit: 0.25,
      energiaInjetadaHfpValor: 10,
      enCompSemIcmsKwh: 140,
      enCompSemIcmsPrecoUnit: 0.38,
      enCompSemIcmsValor: 53.2,
      contribIlumPublicaMunicipal: 4.8,
      taxa2Via: 2,
      valorTotal: 169,
    },
  ];
describe('HistoricoFaturas', () => {
  const renderHistoricoFaturas = () => {
    axios.get.mockResolvedValue({ data: mockFaturasData });
    render(
      <Router>
        <HistoricoFaturas />
      </Router>
    );
  };

  it('renders the page title', () => {
    renderHistoricoFaturas(); 
    const pageTitle = screen.getByText('Histórico de Faturas');
    expect(pageTitle).toBeInTheDocument();
  });

  it('displays the list of customers with their respective months', async () => {
    renderHistoricoFaturas();
    await waitFor(() => {
      const customers = screen.getAllByRole('row');
      expect(customers.length).toBe(mockFaturasData.length + 1); 
    });
  });

  it('updates the selected month when clicking on a button', async () => {
    renderHistoricoFaturas(); 
    const [sampleCustomer] = mockFaturasData;
    const selectedMonth = sampleCustomer.mesReferencia;

    await waitFor(() => {
      const customers = screen.getAllByRole('row');
      expect(customers.length).toBe(mockFaturasData.length + 1); 
    });

    const monthButton = screen.getByText(selectedMonth);
    fireEvent.click(monthButton);

    await waitFor(() => {
      const monthDetails = screen.getByText(`Detalhes da Fatura - Mês: ${selectedMonth}`);
      expect(monthDetails).toBeInTheDocument();
    });
  });
});
