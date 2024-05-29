

import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  PieChart,
  Pie,
  LabelList
} from 'recharts';


const Main = () => {
  const dataRiderVsMonth = [
    { month: 'Jan-2023', riders: 30 },
    { month: 'Feb-2023', riders: 40 },
    { month: 'March-2023', riders: 50 },
  ];

  const dataPieChart1 = [
    { name: 'January', value: 50 },
    { name: 'February', value: 100 },
    { name: 'march', value: 120 },

  ];

  const dataPieChart2 = [
    { name: 'Jan-2023', value: 100 },
    { name: 'Feb-2023', value: 250 },
    { name: 'March-2023', value: 300 },
 
  ];

  const COLORS = ['#FF8042','#0088FE', '#FF0000', '#FFBB28', '#FF8042'];


  const renderLabel = ({ name, value }) => `${name} : ${value}`;

const CustomLabel = ({ viewBox, value }) => {
  const { cx, cy } = viewBox;
  return (
    <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#888">{value}</text>
  );
};

  return (
    <main className="main-container">
      <div className="main-title">
        {/* <h3 style={{color:'black'}}> DASHBOARD</h3> */}
      </div>


      <div className="chart-row" style={{ textAlign: 'center' }}>
     
        <div className="chart-container">
          <h4 style={{color:'black'}} >Rider vs Month</h4>
          <ResponsiveContainer className="chart-container" width="100%" height={300}>
          <BarChart data={dataRiderVsMonth}>
            <XAxis dataKey="month" />
            <YAxis>
              <Label value="Rider" offset={0} angle={-90} position="insideLeft" fill="#0088FE" />
            </YAxis>
            <Tooltip dataKey="riders" name="months" fill="#0088FE" />
            <Legend />
            <Bar dataKey="riders" name="Month" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
        </div>


        <div className="chart-container">
          <h4 style={{color:'black'}}  >Rider vs Month</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={dataPieChart1} dataKey="value" nameKey="name" label={renderLabel}>
                {dataPieChart1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div> 

 
     <div className="chart-row" style={{ textAlign: 'center' }}>
       
        <div className="chart-container">
        <h4 style={{color:'black'}}  >Rider vs Month</h4>
        <ResponsiveContainer className="chart-container" width="100%" height={300}>
          <BarChart data={dataRiderVsMonth}>
            <XAxis dataKey="month" />
            <YAxis>
              <Label value="Rider" offset={0} angle={-90} position="insideLeft" fill="#0088FE" />
            </YAxis>
            <Tooltip dataKey="riders" name="months" fill="#0088FE" />
            <Legend />
            <Bar dataKey="riders" name="Month" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
        </div>

 
        <div className="chart-container">
        <h4 style={{color:'black'}}  >Rider vs Month</h4>
        <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={dataPieChart2} dataKey="value" nameKey="name" label={renderLabel}>
          {dataPieChart2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
       

         
          <LabelList
            dataKey="value"
            position="inside"
            content={({ percent }) => `${(percent * 100).toFixed(2)}%`}
          />


          <LabelList
            dataKey="name"
            position="outside"
            content={({ value }) => value}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};

export default Main;
