
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useAppSelector } from '../redux/hook';
//import { Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";

Chart.register(ArcElement, LinearScale, CategoryScale, BarElement);

const PieChart = () => {
  const { expenses } = useAppSelector((state) => state.ui);
  const { revenues } = useAppSelector((state) => state.revenue)

  // Calculate total expense
  const totalExpense = expenses.reduce(
    (total: number, expense: any) => total + expense.amount,
    0
  );

  // Calculate total revenue
  const totalRevenue = revenues.reduce(
    (total: number, revenue:any ) => total + revenue.amount,
    0
  );

  const data = {
    labels: ["Expense", "Revenue"],
    datasets: [
      {
        data: [totalExpense, totalRevenue],
        backgroundColor: [
          "purple", // Expense
          "red", // Revenue
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
