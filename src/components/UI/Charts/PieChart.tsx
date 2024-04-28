"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Title, Legend } from "chart.js";

interface Props {
   data: { title: string; data: number }[];
}

const PieChart = ({ data }: Props) => {
   Chart.register([ArcElement, Tooltip, Title, Legend]);
   return (
      <Pie
         className="p-2"
         data={{
            labels: data.map((data) => data.title),
            datasets: [
               {
                  label: "Total Marks Gained",
                  data: data.map((data) => data.data),
                  backgroundColor: [
                     "rgba(75, 192, 192, 1)", // Light blue (existing)
                     "#90EE90", // Light green
                     "#2ECC71", // Emerald green
                     "#f3ba2f", // Orange (existing)
                     "#2a71d0", // Dark blue (existing)
                  ],
                  // borderColor: "black",
                  borderWidth: 1
               },
            ],
         }}
      />
   );
};

export default PieChart;
