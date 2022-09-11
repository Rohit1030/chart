import React from "react";
import "../Chart/Chart.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Chart(props){
    return (
        <div className="chart">
            <ResponsiveContainer>
                <BarChart data={props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="strike" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calloi" fill="#f56042" />
                    <Bar dataKey="putoi" fill="#42f57b" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}