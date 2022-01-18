// import { resolve } from "parcel-bundler/lib/utils/localRequire";
// import { async } from "regenerator-runtime";
import "regenerator-runtime";

const StateUpdateEvent = new Event("stateUpdate");
function stateMaganer(){
    this.state = {
        isLoading:false,
        info: {},
    };
    this.setState = (newState) => {
        this.state = {...newState};
        dispatchEvent(StateUpdateEvent);
    };
};
                          
export const StateMan = new stateMaganer();                        

// const API_KEY = "45724376bcfc1427b7dc9e210a6703cb";
const API_KEY = "779cae00529a74e2473e72fa0f5b8f72";

export const getCityData = async (city) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
        {
            headers:{ Accept: "application/json",},
            method: "GET",
            mode: "cors",
        })
        .then((res) => res.json())
        .then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
        
    });
    
};