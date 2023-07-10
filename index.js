const valorPesq = document.getElementById("valorpesq")
const id_adress = document.getElementById("id_adress")
const id_location = document.getElementById("id_location")
const id_timezone = document.getElementById("id_timezone")
const id_isp = document.getElementById("id_isp")
const btn_pesquisar = document.getElementById("btn_pesquisar")
let map;



btn_pesquisar.addEventListener("click", ()=>{
    let valueinput = valorPesq.value
    const endPoint = 'https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_59SEiIwsCwFBEyGE7fQPYEL28z8Ou&ipAddress=' + valueinput
    fetch(endPoint)
    .then(res =>res.json())
    .then(dados=>{
        console.log(dados)
        id_adress.innerHTML = dados.ip
        id_location.innerHTML = dados.location.country + ", " + dados.location.region
        id_timezone.innerHTML = dados.location.timezone
        id_isp.innerHTML = dados.isp
        console.log(dados.location.lat,dados.location.lng)
        map.remove()
        map = L.map('map').setView([-7.32861, -35.3325], 22)
       })
        
       
})


function sucess(pos){
    console.log(pos.coords.latitude, pos.coords.longitude)
        
    map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 22);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
    .bindPopup('Você esta aqui.')
    .openPopup();
}
    

function error(err){
    console.log(err)
}

var watchID = navigator.geolocation.watchPosition(sucess, error, {
    enableHighAccuracy: true,
    timeout: 5000
})