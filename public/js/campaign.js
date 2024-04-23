$(document).ready(function() {
    $('#table-link-conversion').DataTable({
        pageLength: 5,
        lengthChange: false,
        searching: false,
        info: false,
        pagingType: "simple_numbers",
        order: [[0, "asc"]]
    })
})

const makeChart = options => {
    const { id, label, labels, data, colors, type } = options
    const ctx = document.getElementById(id)

    if(type == 'doughnut') {
        const chartData = {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                hoverOffset: 4
            }]
        }
        
        new Chart(ctx, { type, data: chartData })
    }
    else if(type == 'pie') {
        const chartData = {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                hoverOffset: 4
            }]
        }
        
        new Chart(ctx, { type, data: chartData })
    }
    else if(type == 'bar') {
        const chartData = {
            labels,
            datasets: [{
                label,
                data,
                backgroundColor: colors
            }]
        }
        
        new Chart(ctx, { type, data: chartData, options: { scales: { y: { beginAtZero: true } } } })
    }
}