"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
   ArcElement,
   Chart,
   CategoryScale,
   LinearScale,
   Tooltip,
   Title,
   Legend,
   BarElement,
} from "chart.js";

interface Props {
   data: { title: string; data: number }[];
}

function BarChart({ data }: Props) {
   Chart.register([
      BarElement,
      CategoryScale,
      LinearScale,
      Tooltip,
      Title,
      Legend,
   ]);
   return (
      <Bar
         className="h-full"
         data={{
            labels: data.map((data) => data.title),
            datasets: [
               {
                  label: "Number of tests",
                  data: data.map((data) => data.data),
                  backgroundColor: [
                     "rgba(75, 192, 192, 1)", // Light blue (existing)
                     "#90EE90", // Light green
                     "#2ECC71", // Emerald green
                     "#f3ba2f", // Orange (existing)
                     "#2a71d0", // Dark blue (existing)
                  ],
                  // borderColor: "black",
                  borderWidth: 1,
               },
            ],
         }}
      />
   );
}

export default BarChart;
