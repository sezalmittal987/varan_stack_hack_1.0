import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import axios from 'axios';


export default class UserChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    const {eventId} = this.props;
    axios({
      method: 'post',
      url: `/user/chart/${eventId}`
    }).then(response => {
      console.log("Chart Response", response.data);
      if(response.data.status === 0 ) throw new Error(response.data.message);    
      const chartData = response.data.event;
      const data = [];
      data.push(chartData["corporate"])
      data.push(chartData["group"])
      data.push(chartData["others"])
      data.push(chartData["self"])

      this.setState({data: data})
      console.log(this.state.data);
    }).catch(error => {
      console.log("chart error ", error.message);
    })
  }
  render() {
    const state = {
      labels: ['Corporate', 'Group',
               'Others','Self'],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350'
          ],
          data: this.state.data
        }
      ]
    }
    return (
      <div style = {{marginTop: "100px"}}>
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Types of Registered Users',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}