const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msgOne');
const messageTwo= document.querySelector('#msgTwo');
const messageThree = document.querySelector('#msgThree');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    
    fetch(`/weather?location=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent = JSON.stringify(data.error);
                messageTwo.textContent = ""; 
                messageThree.textContent = ""; 
            }else{
                console.log(data)
                messageOne.textContent = "You Wrote" + JSON.stringify(data.locationProvided);
                messageTwo.textContent = "Location founded "  + JSON.stringify(data.locationFound);  
                messageThree.textContent = `Temperature: ${JSON.stringify(data.weather.current.temperature)}, 
                                            Time: ${JSON.stringify(data.weather.location.localtime)}` 
            }; 
        })
    })


});