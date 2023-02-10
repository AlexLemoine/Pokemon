// ***** FONCTIONS *****

// On définit une fonction pour afficher le nom du pokemon trouvé.
function showSearch(pokeSearch){

    // Ajout du h1 au DOM 
    // pour chaque élément trouvé
    // Exemple: pour chaque élément trouvé qui commence par 'b'
    // on ajoute un h1
    pokeSearch.forEach(poke => {
        items.innerHTML+=`<a class="title">${poke.name}</a>`;
    })
    return pokeSearch;
    
};


// ***** VARIABLES ***** 

const input = document.querySelector("#search");
const items = document.querySelector(".items");
const pokeTitle = document.querySelector(".title");
let pokeSearch = [];
const urlImg = [];


// ***** PROGRAMME *****


async function getPokemons()
{
    // On définit l'url:
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=3000';

    // fect() = fonction de js pour envoyer requête vers serveur
    // 1er paramètre obligatoire = url
    // retourne une promesse (= fonction asynchrone)
    // la réponse correspond à toute la requête http (réponse brute avec bcp d'infos)
    const res = await fetch(url);

    // récupère données en json
    const data = await res.json();
    console.log(data);

    return data;
};

// Retourne une promesse (=return data)
getPokemons()
    .then(function(data){

        // data = localStorage.setItem('PokemonsList',data.toString(data.results));
        localStorage.setItem('PokemonsList',JSON.stringify(data.results));
        return data.results;

    })
    .then(function (dataResults){

        // on récupère les noms dans un tableau
        let pokemons = [];
        for(let i=0;i<dataResults.length;i++){
            pokemons.push(dataResults[i]);
            console.log('pokemonNames = '+pokemons[i].name);
        };

        return pokemons;

    })
    .then(function(pokemons){

        // On place un écouteur sur l'élément input.
        input.addEventListener("input",e => {

        // Vider l'item
        items.innerHTML='';
        
        // On cible la valeur entrée par l'utilisateur.
        // On la change en minuscule pour faire concorder avec le tableau pokemons.
        let element = e.target.value.toLowerCase();

        // On filtre notre tableau en fonction de la valeur entrée par l'utilisateur
        // On s'assure également que tout le tableau est en minuscule.
        pokeSearch = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().startsWith(element)
            );
            console.log('pokeSearch1 = '+pokeSearch);

        // On affiche les résultats trouvés par l'utilisateur.
        showSearch(pokeSearch);

        return pokeSearch;
              
        });

    })
    .then(function(pokeSearch){

        console.log('pokeSearch3 = '+pokeSearch);

        if(pokeSearch.length > 0){
            console.log('pokeSearch2 = '+pokeSearch[2].name);

            pokeSearch.forEach(poke => {
                console.log('pokeUrl = '+poke.url)
                
            });
                
        };

    });
        


    // placer écouteur sur les items
    //items.addEventListener("click",e => {
    
    // Lorsque l'élément est cliqué,
    // = if pokeTitle:active
    // afficher l'image et le nom du poke sélectionné

    // afficher l'image et le nom du poke sélectionné
    // -> faire un .fetch() de l'url du poke sélectionné
    // -> faire un .json() de ce résultat
    // -> dans l'url: cibler le paramètre ".sprites.back_default"
    // -> l'intégrer dans une balise <img>
    //pokeTitle.innerHTML+=`<img class="pokeImg" src="${poke.url}"></img>`;
