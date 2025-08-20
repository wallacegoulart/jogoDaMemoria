//variaveis do jogo
let flippedCards = []; // Array que armazena as cartas viradas ( sempre tera no maximo duas cartas)
let matchedPairs = 0; // contadores de pares encontrados
let attemtps = 0; // contadores de tentativas do jogador
let isCheckingPair = false;// trava o jogo enquanto verifica o par ou esconde as cartas 


//array com todas as cartas do jogo
const cardsItems = [
    {id: 1 , content:"👻" , mateched: false},
    {id: 2 , content:"👻" , mateched: false},
    {id: 3 , content:"💩" , mateched: false},
    {id: 4 , content:"💩" , mateched: false},
    {id: 5 , content:"🥊" , mateched: false},
    {id: 6 , content:"🥊" , mateched: false},
    {id: 7 , content:"🪘" , mateched: false},
    {id: 8 , content:"🪘" , mateched: false},
    {id: 9 , content:"🥅" , mateched: false},
    {id: 10 , content:"🥅" , mateched: false},
    {id: 11 , content:"🎱" , mateched: false},
    {id: 12 , content:"🎱" , mateched: false},
    {id: 13 , content:"🪃" , mateched: false},
    {id: 14 , content:"🪃" , mateched: false},
    {id: 15 , content:"🗿" , mateched: false},
    {id: 16 , content:"🗿" , mateched: false},

];

// função para embaralhar as cartas
function shuffleCards(array){
    const shuffled = array.sort(() => (Math.random() > 0.5 ? 1 : -1 )); // positivo vai depois, negativo vai antes 
    
    return shuffled ;
}


//função para criar a carta 
function createCard(card){
    //cria o elemento principal da carta. 
    const cardElement = document.createElement("div");
    cardElement.className = "cards";

    //cria o elemento do emoji 
    const emoji = document.createElement("span");
    emoji.className = "cards-emoji";
    emoji.textContent = card.content;

    //adiciona o emoji ao card
    cardElement.appendChild(emoji);

    //adiciona o evento de clique na carta
    cardElement.addEventListener("click", () => handleCardClinck(cardElement , card));


    return cardElement
}

// renderizar as cartas no html
function renderCards(){

    const deck = document.getElementById("deck");
    deck.innerHTML = "";


    const cards = shuffleCards(cardsItems);
    cards.forEach( (item) => {
       const cardElement = createCard(item);
       deck.appendChild(cardElement);

    });

}

function handleCardClinck(cardElement , card){
    
    if(isCheckingPair  // aqui verifica se tem duas cartas no array 
        || 
        cardElement.classList.contains("revealed") // e aqui verifica se o click é na mesma carta
    ){ 
        return;
    }

    //revela a carta 
    cardElement.classList.add("revealed");


    //adiciona no array as cartas viradas
    flippedCards.push({cardElement , card});

    //vamos validar se no array ja tem duas cartas 
    if(flippedCards.length === 2){
        
        //atualiza para verdadeiro para sinalizar que vamos veirificar o par
        isCheckingPair = true;
        
        //atualiza a quantidade de jogadas
        attemtps++

        // selecionar as cartas 
        const [fisrtCard , secondCard] = flippedCards ;

        // verificar de as cartas formam um par 
        if(fisrtCard.card.content === secondCard.card.content){

            //atualizando o placar 
            matchedPairs++;
            

            //marcar as cartas como encontradas
            cardsItems.forEach((item) => {
                if(item.content === fisrtCard.card.content ){
                    item.mateched = true;
                }
            })
            
            //criar uma nova jogada
            flippedCards = [] ;
            isCheckingPair = false;
            updateStats()

            const toFind = cardsItems.find( item => item.mateched === false);
            if(!toFind){
                alert("Parabéns, você encontrou todos os pares!!!!")
            }

        } else {
            setTimeout(()=>{ 

                fisrtCard.cardElement.classList.remove("revealed");
                secondCard.cardElement.classList.remove("revealed");

                //criar uma nova jogada
                flippedCards = [] ;
                isCheckingPair = false;
                updateStats()

            },1000)

        }

    }
        
}

// Função para atualizar os contadores do placar e tentativas
function updateStats(){
    document.getElementById("status").textContent = `${matchedPairs} acertos de ${attemtps} tentativas`

}


//Função para reiniciar o jogo 
function resetGame(){
    //reseta todas as variveis do jogo
    flippedCards = []; 
    matchedPairs = 0; 
    attemtps = 0;
    isCheckingPair = false; 

    // demarcar todas as cartas
     cardsItems.forEach((item) => (item.mateched = false));

     //renderiza novamente e atualiza a pontução
     renderCards();
     updateStats();
}

function initGame(){
    renderCards();

    //Adiciona o evento de reiniciar o jogo no botão
    document.getElementById("restart").addEventListener("click",resetGame)
}

initGame();



