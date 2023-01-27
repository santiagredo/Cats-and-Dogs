const url = 'https://api.thecatapi.com/v1/images/search';
const urlFavorites = 'https://api.thecatapi.com/v1/favourites/';
const apiKey = 'live_cWCosz42tbHH8MVFDgKvhRXYbafbTcY7OcCZmR46RmVZCNfnbjEdM0j1jrlA26ZR';


const div = document.getElementById("div-renderer");
const buttonCatRandomizer = document.getElementById("button-cat-randomizer");


const display = document.getElementById("display");
const input = document.getElementById("input");
const buttonDecrease = document.getElementById("button-decrease");
const buttonReset = document.getElementById("button-reset");
const buttonIncrease = document.getElementById("button-increase");


const divFavorites = document.getElementById("div-renderer-favorites");
const buttonCatFavorites = document.getElementById("button-cat-favorites");


async function CatRandomizer(){  
    div.innerHTML = '<h2>Loading...</h2>';

    try{
        const response = await fetch(`${url}?limit=${counter}`, {
            headers: {
                'x-api-key': apiKey
            }
        });
        const data = await response.json();

        div.innerHTML = '';

        data.map((element, index) => {
            let childDiv = document.createElement('div');

            let image = document.createElement('img');
            image.src = data[index].url;
            childDiv.appendChild(image);
            
            let button = document.createElement('button');
                button.style.position = 'absolute';
                button.innerText = '❤️';
                button.style.padding = '0';
                button.style.fontSize = '2rem';
                button.style.width = '4rem';
                button.style.marginTop = '1.2rem';
                button.style.marginLeft = '15rem';
                button.style.background = 'none';
                button.style.opacity = '50%';
                button.style.border = 'none';
                button.style.boxShadow = 'none';

                button.onmouseover = () => {
                    button.style.opacity = '100%';
                }

                button.onmouseleave = () => {
                    button.style.opacity = '50%';
                }

                button.addEventListener("click", async () => {
                    const response = await fetch(urlFavorites, {
                        method: 'POST',
                        headers: {
                            'x-api-key': apiKey,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'image_id': data[index].id
                        })
                    })
                    
                    
                    LoadCatFavorites();
                })

            childDiv.appendChild(button);

            div.appendChild(childDiv);
        });

    }catch{
        div.innerHTML = '<h2>Unexpected error, please try again...</h2>';
    }
}


async function LoadCatFavorites(){
    divFavorites.innerHTML = '<h2>Loading...</h2>';

    try{
        const res = await fetch(`${urlFavorites}?order=DESC`, {
            headers: {'x-api-key': apiKey}
        });
        const data = await res.json();
    
        divFavorites.innerHTML = '';
        divFavorites.style.flexDirection = 'row';
    
        data.map((element, index) => {
            let childDiv = document.createElement('div');
    
            let image = document.createElement('img');
            image.src = data[index].image.url;
            childDiv.appendChild(image);
    
            let button = document.createElement('button');
                button.style.position = 'absolute';
                button.innerText = '❌';
                button.style.padding = '0';
                button.style.fontSize = '2rem';
                button.style.width = '4rem';
                button.style.marginTop = '1.2rem';
                button.style.marginLeft = '15rem';
                button.style.background = 'none';
                button.style.opacity = '50%';
                button.style.border = 'none';
                button.style.boxShadow = 'none';
    
                button.onmouseover = () => {
                    button.style.opacity = '100%';
                }
    
                button.onmouseleave = () => {
                    button.style.opacity = '50%';
                }
    
                button.addEventListener("click", async () => {
                    if(confirm("Do you want to remove this cat from favorites?") === true){
                        try{
                            const response = await fetch(`${urlFavorites}${data[index].id}`, {
                                method: 'DELETE',
                                headers: {
                                    'x-api-key': apiKey,
                                    'Content-Type': 'application/json'
                                }
                            })
                            LoadCatFavorites();
                        }catch{
                            alert('There was an error processing your request, please try again...')
                        }
                    }
                })
            
            childDiv.appendChild(button);
    
            divFavorites.appendChild(childDiv);
    
        })

    }catch{
        divFavorites.style.flexDirection = 'column';
        divFavorites.innerHTML = '<h2>Unexpected error, please try again...</h2>';
    }
}


let counter = 1;
display.innerText=`${counter} 😸`;

buttonDecrease.addEventListener("click", () => {
    if(counter <= 1){
        counter = 1;
    }else{
        counter--;
    }
    display.innerText=`${counter} 😸`;
})

buttonReset.addEventListener("click", () => {
    counter = 1; 
    display.innerText=`${counter} 😸`;
})

buttonIncrease.addEventListener("click", () => {
    if(counter >= 15){
        counter = 15;
    }else{
        counter++;
    }
    display.innerText=`${counter} 😸`;
})

buttonCatRandomizer.addEventListener("click", CatRandomizer);
buttonCatFavorites.addEventListener("click", LoadCatFavorites);
CatRandomizer();