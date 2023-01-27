const url = 'https://api.thedogapi.com/v1/images/search';
const urlFavorites = 'https://api.thedogapi.com/v1/favourites/';
const urlUpload = 'https://api.thedogapi.com/v1/images/upload';
const urlGetUpload = 'https://api.thedogapi.com/v1/images?limit=100';
const apiKey = 'live_cNBkNdY2gcBVNnf2EGyUNXaJudrL9dm7SoU5RJt87CIeZTswq8jb2bvuqZIzk1pt';


const div = document.getElementById("div-renderer");
const buttonDogRandomizer = document.getElementById("button-dogs-randomizer");


const display = document.getElementById("display");
const input = document.getElementById("input");
const buttonDecrease = document.getElementById("button-decrease");
const buttonReset = document.getElementById("button-reset");
const buttonIncrease = document.getElementById("button-increase");


const buttonDogUpload = document.getElementById("button-dog-upload");


const divUploaded = document.getElementById("div-renderer-uploaded");


const divFavorites = document.getElementById("div-renderer-favorites");
const buttonDogFavorites = document.getElementById("button-dog-favorites");

async function DogRandomizer(){
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
                    try{
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
                        button.style.opacity = '100%';
                        LoadDogFavorites();
                    }catch{
                        alert('There was an error adding the dog as a favorite, please try again...')
                    }
                })

            childDiv.appendChild(button);

            div.appendChild(childDiv);
        });

    }catch{
        div.innerHTML = '<h2>Unexpected error, please try again...</h2>';
    }   
}



async function UploadDogPhoto(){
    const form = document.getElementById("formUpload");
    const formData = new FormData(form);

    try{
        const response = await fetch(urlUpload, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey
            },
            body: formData
        })
        alert('Photo uploaded successfully!');
        LoadDogUpload();
    }catch{
        alert('There was an error uploading your photo, please try again...')
    }
}



async function LoadDogUpload(){
    divUploaded.innerHTML = '<h2>Loading...</h2>';

    try{
        const response = await fetch(`${urlGetUpload}`, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        });
        const data = await response.json();
        console.log(data)
    
        divUploaded.innerHTML = '';
    
        data.map((element, index) => {
            let childDiv = document.createElement('div');
    
            let image = document.createElement('img');
            image.src = data[index].url;
            childDiv.appendChild(image);
            
    
            divUploaded.appendChild(childDiv);
        });
    }catch{
        divUploaded.innerHTML = '<h2>Unexpected error, please try again...</h2>';
    }
}



async function DeleteDogUpload(id){
    const response = await fetch(`https://api.thedogapi.com/v1/images/${id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': apiKey,
        }
    })
    const data = await response;
    console.log(data.status, data);
    LoadDogUpload();
}



async function LoadDogFavorites(){
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
                    if(confirm("Do you want to remove this dog from favorites?") === true){
                        try{
                            const response = await fetch(`${urlFavorites}${data[index].id}`, {
                                method: 'DELETE',
                                headers: {
                                    'x-api-key': apiKey,
                                    'Content-Type': 'application/json'
                                }
                            })
                            LoadDogFavorites();
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
display.innerText=`${counter} 🐶`;

buttonDecrease.addEventListener("click", () => {
    if(counter <= 1){
        counter = 1;
    }else{
        counter--;
    }
    display.innerText=`${counter} 🐶`;
})

buttonReset.addEventListener("click", () => {
    counter = 1; 
    display.innerText=`${counter} 🐶`;
})

buttonIncrease.addEventListener("click", () => {
    if(counter >= 15){
        counter = 15;
    }else{
        counter++;
    }
    display.innerText=`${counter} 🐶`;
})

buttonDogRandomizer.addEventListener("click", DogRandomizer);
buttonDogUpload.addEventListener("click", UploadDogPhoto);
buttonDogFavorites.addEventListener("click", LoadDogFavorites);
DogRandomizer();
LoadDogUpload();