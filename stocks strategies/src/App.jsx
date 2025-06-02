import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StockDashboard() {
  const [params, setParams] = useState({ 
    stockSymbol: 'WIPRO', 
    timeFrame: '1D',
    indicator: 'RSI',
    threshold: '70',
    quantity: '100'
  });

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Submitted params:', params);
  };

  // Stock data
  const stockData = [
    {
      Symbol: "WIPRO",
      LTP: "385.75",
      Change: "-0.45",
      Volume: "2.5M",
      BuyQty: "1200",
      SellQty: "800",
      chartColor: "#8B5CF6"
    },
    {
      Symbol: "TCS",
      LTP: "3251.25",
      Change: "+0.32",
      Volume: "1.8M",
      BuyQty: "750",
      SellQty: "500",
      chartColor: "#10B981"
    },
    {
      Symbol: "RELIANCE",
      LTP: "2532.10",
      Change: "+0.48",
      Volume: "3.2M",
      BuyQty: "1800",
      SellQty: "1500",
      chartColor: "#3B82F6"
    },
    {
      Symbol: "HDFCBANK",
      LTP: "1450.75",
      Change: "+0.34",
      Volume: "2.1M",
      BuyQty: "900",
      SellQty: "700",
      chartColor: "#F59E0B"
    },
    {
      Symbol: "INFY",
      LTP: "1426.00",
      Change: "+0.42",
      Volume: "1.9M",
      BuyQty: "1500",
      SellQty: "1200",
      chartColor: "#EC4899"
    }
  ];

  // Generate chart data for each stock
  const generateChartData = (index) => {
  const baseValue = parseFloat(stockData[index].LTP);
  return {
    labels: ["9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"],
    datasets: [{
      label: "Price",
      data: Array(8).fill(0).map(() => {
        const randomValue = (Math.random() * 10 - 5);
        return (baseValue + randomValue).toFixed(2);
      }),
      borderColor: stockData[index].chartColor,
      backgroundColor: `${stockData[index].chartColor}20`,
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 0
    }]
  };
};

  // Compact chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { display: false }
    },
    interaction: { intersect: false }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white p-4 md:p-6 flex flex-col gap-4 w-full overflow-hidden relative">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl animate-float-delay"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-lg z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Quantum Trader Pro
        </h1>
        <p className="text-center text-white/70 text-sm mt-1">
          Real-time algorithmic trading dashboard
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10">
        {/* Input Panel */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg">
          <CardContent className="p-4 space-y-3">
            <h2 className="text-lg font-bold text-cyan-400 mb-2">Trade Parameters</h2>
            {[
              { name: 'stockSymbol', label: 'Stock Symbol', type: 'select', options: stockData.map(s => s.Symbol) },
              { name: 'timeFrame', label: 'Time Frame', type: 'select', options: ['1D', '1W', '1M', '1Y'] },
              { name: 'indicator', label: 'Indicator', type: 'select', options: ['RSI', 'MACD', 'Bollinger', 'VWAP'] },
              { name: 'threshold', label: 'Threshold', type: 'text' },
              { name: 'quantity', label: 'Quantity', type: 'number' }
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="block text-xs font-medium text-white/70">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={params[field.name]}
                    onChange={handleChange}
                    className="w-full bg-white/10 text-white text-sm rounded-lg px-3 py-2 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition"
                  >
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    name={field.name}
                    value={params[field.name]}
                    onChange={handleChange}
                    className="w-full bg-white/10 text-white text-sm border-white/10 focus:border-cyan-400 h-9"
                  />
                )}
              </div>
            ))}
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 mt-2 shadow-lg shadow-cyan-500/20"
            >
              Execute Trade
            </Button>
          </CardContent>
        </Card>

        {/* Main Dashboard Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Mini Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stockData.slice(0, 2).map((stock, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-bold" style={{ color: stock.chartColor }}>{stock.Symbol}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${stock.Change.startsWith('+') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {stock.Change}%
                    </span>
                  </div>
                  <div className="h-[120px]">
                    <Line data={generateChartData(index)} options={chartOptions} />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span>LTP: {stock.LTP}</span>
                    <span>Vol: {stock.Volume}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stock Table */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-900/50 to-blue-900/50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/80">Symbol</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/80">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/80">Change</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/80">Volume</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/80">Buy Qty</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white/80">Sell Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((stock, index) => (
                    <tr 
                      key={index} 
                      className="border-t border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium" style={{ color: stock.chartColor }}>{stock.Symbol}</td>
                      <td className="px-4 py-3 text-sm">{stock.LTP}</td>
                      <td className={`px-4 py-3 text-sm font-medium ${stock.Change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.Change}%
                      </td>
                      <td className="px-4 py-3 text-sm text-white/80">{stock.Volume}</td>
                      <td className="px-4 py-3 text-sm text-green-400">{stock.BuyQty}</td>
                      <td className="px-4 py-3 text-sm text-red-400">{stock.SellQty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
        {[
          { title: "NIFTY 50", value: "17,943.90", change: "-0.21%", color: "bg-gradient-to-br from-purple-600/30 to-purple-800/30", border: "border-purple-500/20" },
          { title: "BANK NIFTY", value: "38,405.05", change: "+0.08%", color: "bg-gradient-to-br from-blue-600/30 to-blue-800/30", border: "border-blue-500/20" },
          { title: "Advancers", value: "1,248", change: "62%", color: "bg-gradient-to-br from-green-600/30 to-green-800/30", border: "border-green-500/20" },
          { title: "Decliners", value: "752", change: "38%", color: "bg-gradient-to-br from-red-600/30 to-red-800/30", border: "border-red-500/20" }
        ].map((card, index) => (
          <Card key={index} className={`${card.color} backdrop-blur-md border ${card.border} rounded-xl shadow-lg`}>
            <CardContent className="p-3">
              <p className="text-xs text-white/70">{card.title}</p>
              <div className="flex items-end justify-between mt-1">
                <p className="text-xl font-bold">{card.value}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${card.change.startsWith('+') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {card.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add this to your global CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 10s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}