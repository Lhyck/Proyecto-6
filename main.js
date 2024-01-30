window.addEventListener('load', () => {

    let valorTemperatura = document.getElementById('valor_temp');
    let descripcionTemperatura = document.getElementById('desc_temp');
    let icon = document.getElementById('icon');
    let velcidadViento = document.getElementById('vel_viento');
    let humedad = document.getElementById('humedad');
    let containerPronostico = document.getElementById('pronostico');

    

            let lon = -65.33129512353948;
            let lat = -24.18338609618345;
            let api = "742cc42f63362b2cd908a39ab24ed2f5";
            let part = "minutely,hourly";
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=es&units=metric&exclude=${part}&appid=${api}`
            console.log(url);


            fetch(url)
                .then(response => { return response.json() })
                .then(data => {
                    console.log(data.current.temp)
                    let temperaturaActual = Math.round(data.current.temp);
                    valorTemperatura.textContent = `${temperaturaActual} °C`;

                    console.log(data.current.weather[0].description);
                    let des = data.current.weather[0].description;
                    descripcionTemperatura.textContent = des.toUpperCase();

                    console.log(data.current.wind_speed);
                    let vel = data.current.wind_speed;
                    velcidadViento.textContent = `Viento: a ${vel} Kh/h`

                    console.log(data.current.humidity);
                    let hum = data.current.humidity;
                    humedad.textContent = `Humedad: ${hum} %`

                    console.log(data.current.weather[0].main)
                    let iconImg = data.current.weather[0].main;

                    setIcono(icon, iconImg);



                    cardsPronosticos(data, containerPronostico);



                })
                .catch(err => {
                    console.log(err);
                })
     
});


let setIcono = (icon, iconImg) => {

    switch (iconImg) {
        case 'Thunderstorm':
            icon.src = 'assets/icons/thunder.svg'
            console.log('TORMENTA');
            break;
        case 'Drizzle':
            icon.src = 'assets/icons/rainy-2.svg'
            console.log('LLOVIZNA');
            break;
        case 'Rain':
            icon.src = 'assets/icons/rainy-7.svg'
            console.log('LLUVIA');
            break;
        case 'Snow':
            icon.src = 'assets/icons/snowy-6.svg'
            console.log('NIEVE');
            break;
        case 'Clear':
            icon.src = 'assets/icons/day.svg'
            console.log('LIMPIO');
            break;
        case 'Atmosphere':
            icon.src = 'assets/icons/weather.svg'
            console.log('ATMOSFERA');
            break;
        case 'Clouds':
            icon.src = 'assets/icons/cloudy-day-1.svg'
            console.log('NUBES');
            break;
        default:
            icon.src = 'assets/icons/cloudy-day-1.svg'
            console.log('por defecto');
    }
}

let cardsPronosticos = (data, containerPronostico) => {

    let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];


    for (let i = 1; i < 4; i++) {

        let pronostico = document.createElement("div");
        pronostico.className += "pronostico__card";

        let dia = document.createElement("h1");
        let timestamp = data.daily[i].dt;
        let a = new Date(timestamp * 1000);
        let dayOfWeek = days[a.getDay()]
        console.log(dayOfWeek);
        let texto = document.createTextNode(dayOfWeek);
        dia.appendChild(texto);
        pronostico.appendChild(dia);

        let iconDiv = document.createElement("div");
        iconDiv.className += "icon__container";

        let icon = document.createElement("img");
        icon.className += "icon__img";
        let iconImg = data.daily[i].weather[0].main;
        setIcono(icon, iconImg);
        iconDiv.appendChild(icon);
        pronostico.appendChild(iconDiv);


        let min = data.daily[i].temp.min;
        let max = data.daily[i].temp.max;
        let datosMin = document.createElement("h5");
        let newContent = document.createTextNode(`Min: ${min}°`);
        datosMin.appendChild(newContent);
        pronostico.appendChild(datosMin);
        let datosMax = document.createElement("h5");
        let newContent1 = document.createTextNode(`Max: ${max}°`);
        datosMax.appendChild(newContent1);
        pronostico.appendChild(datosMax);


        let hum1 = data.daily[i].humidity;
        let humedad = document.createElement("h5");
        let newContentH = document.createTextNode(`Humedad: ${hum1}%`);
        humedad.appendChild(newContentH);
        pronostico.appendChild(humedad);

        containerPronostico.appendChild(pronostico);
    }


}

/*formulario */


function onClick(event) {
    event.preventDefault();
    this.style.backgroundColor = "salmon";
    console.log("click ...");
    console.log(event);

    const mensaje = {

        nombre: document.getElementById('nombre').value,
        celular: document.getElementById('celular').value,
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value,

    }
    console.log(mensaje);


    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: "POST",
            body: JSON.stringify(mensaje),
            headers: { "Content-type": "application/json; charset" }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            Swal.fire(
                ' Su registro se ha realizado con exito ... ',
                ' Lo contactaremos a la brevedad '

            );
            cleanForm();

        })
        .catch((err) => console.log(err));

    function cleanForm() {
        let formulario = document.getElementById('form1');
        formulario.reset();
    }

    function redirectUrl() {
        window.location.href = "https://google.com";
    }

}
let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick);