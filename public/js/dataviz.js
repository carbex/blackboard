var ctx1 = document.getElementById("myChart1");

let countMale = ctx1.dataset.countmale
let countFemale = ctx1.dataset.countfemale

new Chart(ctx1, {

    type: 'bar',
    data: {
        labels: ["Sex"],
        datasets: [{
            label: 'Male',
            data: countMale,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)'
            ],
            borderWidth: 1
      },{
        label: 'Female',
        data: countFemale,
        backgroundColor: [
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgb(255, 159, 64)'
        ],
        borderWidth: 1
  }]
    }, 
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Répartition des utilisateurs'
          }
        }
      }
});

var ctx2 = document.getElementById("myChart2");

let unreadMessages = ctx2.dataset.unreadmessages
let readMessages = ctx2.dataset.readmessages

new Chart(ctx2, {

    type: 'doughnut',
    data: {
        labels: ["Lus", "Non lus"],
        datasets: [{
            label: 'Messages',
            data: [readMessages, unreadMessages],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)'
            ],
            borderWidth: 1
      }]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Répartition des messages'
          }
        }
      }
});

var ctx3 = document.getElementById("myChart3");

let paidAndShipted = ctx3.dataset.paidandshipted
let paidAndUnshipted = ctx3.dataset.paidandunshipted

new Chart(ctx3, {

    type: 'pie',
    data: {
        labels: ["Payé et envoyé", "Payé mais pas envoyé"],
        datasets: [{
            label: 'Envois',
            data: [paidAndShipted, paidAndUnshipted],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)'
            ],
            borderWidth: 1
      }]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Répartition des commandes'
          }
        }
      }
});

var ctx4 = document.getElementById("myChart4");

let turnover = JSON.parse(ctx4.dataset.turnoverstringyfied)

let months = []
let turnovers = []
for(let i=0; i<turnover.length; i++ ) {
    months[i] = turnover[i]._id.month
    turnovers[i] = turnover[i].turnover
}

let Months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

for(let j=0; j<Months.length; j++) {
    for(let i=0; i<months.length; i++) {
        if(months[i] === j+1) {
            months[i] = Months[j]
        }
    }
}

new Chart(ctx4, {

    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'CA/mois',
            data: turnovers,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'x',
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

