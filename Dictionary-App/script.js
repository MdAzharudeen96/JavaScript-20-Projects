const resultDiv = document.querySelector(".result");
const wordEle = document.querySelector("#word");
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const wordMeaning = document.querySelector(".word-definition");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const handle = async function(e) {
    if(e.keyCode == 13){
        const word = e.target.value;
        console.log(word);

        //Request to API
        const result = await fetch(url+word);

        const data = await result.json()
        console.log(data)
        //Change Result CSS display property
        resultDiv.style.display = "block";

        //Check the input word is Available or not
        if(result.ok){

            //Change the css property to display
            document.querySelectorAll(".wordmeaning")[0].style.removeProperty("display");
            document.querySelectorAll(".wordmeaning")[1].style.removeProperty("display");
            document.querySelector(".synonyms").style.display = "flex";
            phonetics.style.removeProperty("display");
            audio.style.removeProperty("display");

            //Get values from fetched API-Data
            wordEle.innerText = data[0].word;
            phonetics.innerText = data[0].phonetics[0].text;
            audio.src = data[0].phonetics[0].audio;
            wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
            const synonymsArray = data[0].meanings[0].definitions[0].synonyms;
            // console.log(synonymsArray)
            let synonymsData = "";

            //check synonyms availabilty
            if(synonymsArray.length){
                for(let i=0; i<synonymsArray.length; i++){
                    synonymsData += `<p class="pills">${synonymsArray[i]}</p>`;  
                }
            }else{
                synonymsData = `<p class="pills">No Synonyms Available</p>`;
            }
            document.querySelector(".synonyms").innerHTML = synonymsData;
            
        }else{
            audio.style.display = "none";
            wordEle.innerHTML = data.title;
            document.querySelectorAll(".wordmeaning")[0].style.display = "none";
            document.querySelectorAll(".wordmeaning")[1].style.display = "none";
            phonetics.style.display = "none";
            wordMeaning.innerText = data.message;
            document.querySelector(".synonyms").style.display = "none";

        }
    }
};