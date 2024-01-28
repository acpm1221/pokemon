const select = document.getElementById("PokemonTypes");
const submit_btn = document.getElementById("submit_btn");
 const flip_container = document.getElementById("flip_container");
const reset_btn = document.getElementById("reset_btn");
const searchPokemon = document.getElementById("searchPokemon")

const pokemontypes_obj ={};

let pokemonArray = [];

const poktypeArr = ["normal" , "fighting", "flying" , "poison","ground" , "rock" , "bug" , "ghost" , "steel" , "fire","water","grass","electric","psychic","ice" , "dragon", "dark", "fairy"< "unknown" , "shadow"];

// console.log(select.value);

// Search pokemon by Type through select tag

async function searchByTypes(){
      
    const fetchData = await fetch("https://pokeapi.co/api/v2/type");
    const pokemonTypes = await fetchData.json();

//   console.log(pokemonTypes);
   
    let typesArray = pokemonTypes.results; 

    typesArray.forEach(type => {
        
        let option = document.createElement("option");
       option.innerHTML = type.name;
       pokemontypes_obj[type.name] = type.url;
       option.setAttribute('value' , type.name);
       select.append(option);
      
});
}
// console.log(pokemontypes_obj);

// Explored how to fetch pok abilities through function

async function getPokeAblities(URL){
    
    let data = await fetch(URL);
    let parsedData = await data.json();
     
    // console.log(parsedData.abilities);
    let str = [];
    for(let i = 0 ; i < parsedData.abilities.length ; i++){
           str[i]  = parsedData.abilities[i].ability.name
}
    return str;
}

//  filter pokemon by type

 async function filterByType (e){
    e.preventDefault();

   let pokemonType = select.value;
   const URL = pokemontypes_obj[pokemonType];
  console.log(URL);
  let pokemonData = await fetch(URL);
  let pokemonsObj = await pokemonData.json();

  console.log(pokemonsObj);

       let pokemon_type_array = pokemonsObj.pokemon;

    //    console.log(pokemon_type_array);

     flip_container.innerHTML = "";

       let length = pokemon_type_array.length > 20 ? 20 : pokemon_type_array.length;

       for(let i = 0 ; i < length ; i++){
            
          const cardId = document.createElement("p");
          cardId.innerHTML = `#${i+1}`;
         cardId.setAttribute('id' , "cardId");

           const flip_card = document.createElement("div");
           flip_card.classList.add("flip_card") 

           const flip_inner_container = document.createElement("div");
           flip_inner_container.classList.add("flip_inner_container")

           const flip_card_front = document.createElement("div");
           flip_card_front.classList.add("flip_card_front")
           flip_card_front.setAttribute('id',`${select.value}`);

           const flip_card_back = document.createElement("div");
           flip_card_back.classList.add("flip_card_back")
           flip_card_back.setAttribute('id',`${select.value}`);

           const pokemonDiv1 = document.createElement("div");
          const pokemonTitle = document.createElement("h2");
              pokemonTitle.classList.add("firstCaps")

          const pokemonTitle2 = document.createElement("h2");
             pokemonTitle2.classList.add("firstCaps")

          const pokemonImg = document.createElement("img");
          const pokemonImg2 = document.createElement("img");

          const abilitiesHeader = document.createElement("h3");
          const pokemonAbilities = document.createElement("p");
          const type = document.createElement("p");
          type.innerHTML = select.value;
          type.setAttribute('id' , "type");
        
          const pokemonDiv2 = document.createElement("div");

          pokemonTitle.innerHTML = pokemon_type_array[i].pokemon.name;
          pokemonTitle2.innerHTML = pokemon_type_array[i].pokemon.name;

           const img_URL   = await fetch(pokemon_type_array[i].pokemon.url);
            const front_img_parsed_data= await img_URL.json();
            const front_img_url = front_img_parsed_data.sprites.front_default;
            const img_URL2 = await fetch(pokemon_type_array[i].pokemon.url);
            const parsed_data = await img_URL2.json();
            const img_back_url = parsed_data.sprites.back_default;

            let pokAbilities = await getPokeAblities(pokemon_type_array[i].pokemon.url)
        //    console.log(pokAbilities);
               let strAbilities =  pokAbilities.join('\n');
         pokemonImg.setAttribute('src' , front_img_url);
         pokemonImg2.setAttribute('src' , img_back_url);

         pokemonAbilities.innerText = strAbilities;
         abilitiesHeader.innerHTML = "Abilities";
        //  console.log(pokemonAbilities.innerHTML);
           // console.log(pokemonTitle);
          pokemonDiv1.append(cardId, pokemonImg , pokemonTitle , type);
          pokemonDiv2.append(pokemonImg2 ,pokemonTitle2 , abilitiesHeader , pokemonAbilities);
          flip_card_front.append(pokemonDiv1);
          flip_card_back.append(pokemonDiv2);
          flip_inner_container.append(flip_card_front , flip_card_back);
          flip_card.append(flip_inner_container);
          flip_container.append(flip_card);
       }
}

// Diff types of pokemon on page load

 async function loadedCards(){
    let count = 0;
     for(let j = 1 ; j <= 17 ; j ++){
    let URL = `https://pokeapi.co/api/v2/type/${j}/`;
    let pokemonData = await fetch(URL);
    let pokemonsObj = await pokemonData.json();
    // console.log(pokemonsObj);
         let pokemon_type_array = pokemonsObj.pokemon; 
  
        //  console.log(pokemon_type_array);
  
    //    flip_container.innerHTML = "";
        let id = pokemonsObj.id;
        // console.log(id);
         let length = pokemon_type_array.length > 4 ? 4 : pokemon_type_array.length;
  
         for(let i = 0 ; i < length  ; i ++){
              
            const cardId = document.createElement("p");
            cardId.innerHTML = `#${i+1}`;
           cardId.setAttribute('id' , "cardId");
  
             const flip_card = document.createElement("div");
             flip_card.classList.add("flip_card") 
  
             const flip_inner_container = document.createElement("div");
             flip_inner_container.classList.add("flip_inner_container")
  
             const flip_card_front = document.createElement("div");
             flip_card_front.classList.add("flip_card_front")
             flip_card_front.setAttribute('id',`${poktypeArr[count]}`);
  
             const flip_card_back = document.createElement("div");
             flip_card_back.classList.add("flip_card_back")
             flip_card_back.setAttribute('id',`${poktypeArr[count]}`);
  
             const pokemonDiv1 = document.createElement("div");
            const pokemonTitle = document.createElement("h2");
                pokemonTitle.classList.add("firstCaps")
  
            const pokemonTitle2 = document.createElement("h2");
               pokemonTitle2.classList.add("firstCaps")
  
            const pokemonImg = document.createElement("img");
            const pokemonImg2 = document.createElement("img");
            
            const abilitiesHeader = document.createElement("h3");
            const pokemonAbilities = document.createElement("p");
            const type = document.createElement("p");
            type.innerHTML = poktypeArr[count];
            type.setAttribute('id' , "type");
          
            const pokemonDiv2 = document.createElement("div");
  
            pokemonTitle.innerHTML = pokemon_type_array[i].pokemon.name;
            pokemonTitle2.innerHTML = pokemon_type_array[i].pokemon.name;

            const img_URL   = await fetch(pokemon_type_array[i].pokemon.url);
            const front_img_parsed_data= await img_URL.json();
            const front_img_url = front_img_parsed_data.sprites.front_default;
            const img_URL2 = await fetch(pokemon_type_array[i].pokemon.url);
            const parsed_data = await img_URL2.json();
            const img_back_url = parsed_data.sprites.back_default;
            
            
             let pokAbilities = await getPokeAblities(pokemon_type_array[i].pokemon.url)
            //  console.log(pokAbilities);
                 let strAbilities = pokAbilities.join('\n');
           pokemonImg.setAttribute('src' , front_img_url);
           pokemonImg2.setAttribute('src' , img_back_url);
           pokemonAbilities.innerText = strAbilities;
           abilitiesHeader.innerHTML = "Abilities";
          //  console.log(pokemonAbilities.innerHTML);
             // console.log(pokemonTitle);
            pokemonDiv1.append(cardId, pokemonImg , pokemonTitle , type);
            pokemonDiv2.append(pokemonImg2 ,pokemonTitle2 , abilitiesHeader , pokemonAbilities);
            flip_card_front.append(pokemonDiv1);
            flip_card_back.append(pokemonDiv2);
            flip_inner_container.append(flip_card_front , flip_card_back);
            flip_card.append(flip_inner_container);
            flip_container.append(flip_card);
       }
         count++;
        }
    
}

//  Created pokemon Array by fetching datas from api

async function fetchPokemon(){
        let promises = [];

     for(let i = 1 ; i <= 150 ; i++){
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`
          promises.push(fetch(url).then((res)=>res.json()));
}
     Promise.all(promises)
     .then((allPromises)=> {
            const filteredPokArr = allPromises.map((pokemon =>({
                frontImage: pokemon.sprites.front_default,
                backImage: pokemon.sprites.back_default,
                pokemon_id:pokemon.id,
                name : pokemon.name,
                type : pokemon.types[0].type.name,
                abilities : pokemon.abilities.map(ability=>ability.ability.name).join(', '),
            })))
            pokemonArray = filteredPokArr;
       
     })
    }
    fetchPokemon();

// created cards for fetched data of pokemon array from api

function createCard(filteredPok){
       for(let i = 0 ; i < filteredPok.length ; i++){
        const cardId = document.createElement("p");
        cardId.innerHTML = filteredPok[i].pokemon_id;
       cardId.setAttribute('id' , "cardId");

         const flip_card = document.createElement("div");
         flip_card.classList.add("flip_card") 

         const flip_inner_container = document.createElement("div");
         flip_inner_container.classList.add("flip_inner_container")

         const flip_card_front = document.createElement("div");
         flip_card_front.classList.add("flip_card_front")
         flip_card_front.setAttribute('id',`${filteredPok[i].type}`);

         const flip_card_back = document.createElement("div");
         flip_card_back.classList.add("flip_card_back")
         flip_card_back.setAttribute('id',`${filteredPok[i].type}`);

         const pokemonDiv1 = document.createElement("div");
        const pokemonTitle = document.createElement("h2");
            pokemonTitle.classList.add("firstCaps")

        const pokemonTitle2 = document.createElement("h2");
           pokemonTitle2.classList.add("firstCaps")

        const pokemonImg = document.createElement("img");
        const pokemonImg2 = document.createElement("img");
        
        const abilitiesHeader = document.createElement("h3");
        const pokemonAbilities = document.createElement("p");
        const type = document.createElement("p");
        type.innerHTML =filteredPok[i].type;
        type.setAttribute('id' , "type");
      
        const pokemonDiv2 = document.createElement("div");

        pokemonTitle.innerHTML = filteredPok[i].name;
        pokemonTitle2.innerHTML = filteredPok[i].name;
        //  console.log(pokAbilities);
             
       pokemonImg.setAttribute('src' , filteredPok[i].frontImage);
    //    console.log(pokemonImg);
       pokemonImg2.setAttribute('src' , filteredPok[i].backImage);
       pokemonAbilities.innerText = filteredPok[i].abilities;
       abilitiesHeader.innerHTML = "Abilities";
      //  console.log(pokemonAbilities.innerHTML);
         // console.log(pokemonTitle);
        pokemonDiv1.append(cardId, pokemonImg , pokemonTitle , type);
        pokemonDiv2.append(pokemonImg2 ,pokemonTitle2 , abilitiesHeader , pokemonAbilities);
        flip_card_front.append(pokemonDiv1);
        flip_card_back.append(pokemonDiv2);
        flip_inner_container.append(flip_card_front , flip_card_back);
        flip_card.append(flip_inner_container);
        flip_container.append(flip_card);
}
}


document.addEventListener('DOMContentLoaded' ,()=>{
               searchByTypes();
})
document.addEventListener('DOMContentLoaded' , loadedCards)
searchPokemon.addEventListener('input' , (e)=>{
       const filteredPokemon = pokemonArray.filter(pokemon =>pokemon.name.includes(e.target.value.toLowerCase()));
       flip_container.innerHTML = "";
       createCard(filteredPokemon);
})
submit_btn.addEventListener('click' , filterByType);
reset_btn.addEventListener('click' ,loadedCards);

 