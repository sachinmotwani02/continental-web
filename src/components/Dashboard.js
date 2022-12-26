import React, {useState} from 'react'
import NavbarComponent from './NavbarComponent'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const [taskData, setTaskData] = React.useState([]);


  function getData() {
    console.log(startDate + ' to ' +endDate)
    axios.post('http://localhost:5000/get_data1',{"a":startDate/1000,"b":endDate/1000},
    {
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }})
    .then((response) => {
      setTaskData(response.data);
      console.log(response.data)
    });
  }
  
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());
  
  function OnClick() {
    console.log(startDate)
    console.log(endDate)
  }

  const labels = taskData.map(function(e) {
    return e.cycle_name;
  });

  const data1 = taskData.map(function(e) {
    return e.task.Light_guide;
  });
  const data2 = taskData.map(function(e) {
    return e.task.diffuser;
  });
  const data3 = taskData.map(function(e) {
    return e.task.Adhesive_tape_check;
  });
  const data4 = taskData.map(function(e) {
    return e.task.lcd;
  });
  const data5 = taskData.map(function(e) {
    return e.task.Metal_stacker;
  });
  const data6 = taskData.map(function(e) {
    return e.task.grown_check;
  });

const data = {
  labels,
  datasets: [
    {
      label: 'Light Guide',
      data: data1,
      backgroundColor: '#7F78FF',
    },
    {
      label: 'Diffuser',
      data: data2,
      backgroundColor: '#997AFF',
    },
    {
      label: 'Adhesive Tape Check',
      data: data3,
      backgroundColor: '#9864E8',
    },
    {
      label: 'LCD',
      data: data4,
      backgroundColor: '#C37AFF',
    },
    {
      label: 'Metal Stacker',
      data: data5,
      backgroundColor: '#CD67EB',
    },
    {
      label: 'Grown Check',
      data: data6,
      backgroundColor: '#E575FF',
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: taskData.length + ' CYCLES',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};


  return (
    <div className='dash'>
      <NavbarComponent />
      <div className='color-box dashboard'></div>
      <div className="select-container">
        <div className='give-margin'>
          <p>From</p>
          <DatePicker 
          wrapperClassName="datePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date.getTime())}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          timeInputLabel="Time:"
          dateFormat="dd/MM/yyyy h:mm aa"
          showTimeInput
          />
        </div>
        <div className='give-margin'>
          <p>To</p>
          <DatePicker 
            selected={endDate}
            onChange={(date) => setEndDate(date.getTime())}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyyy h:mm aa"
            showTimeInput
          />
        </div>  
        <button onClick={getData} type="submit" className='button'>Get Results</button>
        </div>
        <div className='chart-contain'>
          <Bar options={options} data={data}/>
        </div>
    </div>
  )
}

export default Dashboard