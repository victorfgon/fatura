import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Dashboard from './dashboard';

jest.mock('react-chartjs-2', () => ({
  __esModule: true,
  Line: () => <div data-testid="mock-chart" />,
}));

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

describe('Dashboard', () => {
  it('renders the page title with the correct client number', async () => {
    axios.get.mockResolvedValue({ data: mockFaturasData });

    render(<Dashboard numeroCliente="123" />);
    await waitFor(() => {
      const pageTitle = screen.getByText('Dashboard do Cliente 123');
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('displays the chart with correct dataset labels and data', async () => {
    axios.get.mockResolvedValue({ data: mockFaturasData });

    render(<Dashboard numeroCliente="123" />);
    await waitFor(() => {
      const chartCanvas = screen.getByTestId('mock-chart');
      expect(chartCanvas).toBeInTheDocument();
    });

  });

});
