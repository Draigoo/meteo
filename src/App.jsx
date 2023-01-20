import './App.css';
import {useState} from "react";
import { useEffect } from 'react';


function App() {

    const [ville, setVille] = useState("");
    const [infoMeteo, setInfoMeteo] = useState([]);
    const [suggestion, setSuggestion] = useState("");
    const [input, setinput] = useState("");

    useEffect(()=>
    {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            console.log("Latitude : " + lat + " Longitude: " + lon);
          });

        fetch("https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/geo?lon=1234.aze&lat=221.22")
            .then((el) => el.json())
            .then((res) => setVille(res.city))
            
    },[]);

    useEffect(()=>
    {
        fetch("https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/weather/"+ville)
            .then((el) => el.json())
            .then((res) => setInfoMeteo(res))

    },[ville]);


    function SuggestionTenu()
    {
        switch(infoMeteo.condition)
        {
            case "sunny":
                setSuggestion("Prenez une casquette");
                break;
            case "cloudy":
                setSuggestion("Pas besoin de lunette de soleil aujourd'hui");
                break;
            case "windy":
                setSuggestion("Prenez un manteau, ça souffle fort");
                break;
            case "stormy":
                setSuggestion("Celui une étude de confiance, la foudre ne tombe jamais 2 fois au même endroit");
                break;
            case "rainy":
                setSuggestion("N'oubliez pas le parapluie");
                break;

            default:
        }
    }

    function Search()
    {
        fetch("https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/weather/"+input)
            .then((el) => el.json())
            .then((res) => setInfoMeteo(res))
            .finally()

        SuggestionTenu()
    }


    return (
        <div className="App">

            <input type="text" placeholder='Rechercher' onChange={(e)=>setinput(e.target.value)}/>
            <button onClick={(e) => Search()}>recherche</button>
            
            <div className='ville'>{infoMeteo.city} - France</div>
            
            <div>
                <div className='temperature'>{infoMeteo.temperature}°C</div>
                <div className='condition'>{infoMeteo.condition}</div>
            </div>
            <br/>
            <div className='suggestion'>{suggestion}</div>
        
        </div>
    );
}

export default App;
