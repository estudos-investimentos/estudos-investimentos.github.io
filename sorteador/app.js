
let pessoas = ['Arthur', 'Murilo', 'Paulo', 'Everton'];
const pessoa_sorteada = document.querySelector('.pessoa_sorteada');
const dimdim = document.querySelector('.dimdim');

// count method in arrays
Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
});


function sorteia_pessoa(participantes){
    const n_participantes = participantes.length
    const sorteado = Math.floor(Math.random() * n_participantes);
    return participantes[sorteado]
};

// funcao para aleatorizar o array
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


//simulacao para verificar se o metodo é justo
function simula_rodadas(n_rodadas){
    
    const simulacao =  [];
    for (let i = 0; i < n_rodadas; i++) {
        shuffle(pessoas)
        const element = sorteia_pessoa(pessoas);
        simulacao.push(element);
    }
    
    console.log(simulacao)
    
    for (let j = 0; j < pessoas.length; j++){
        const pessoa = pessoas[j]
        const contagem = simulacao.count(pessoa)
        const pct = Math.round(contagem / n_rodadas * 10000) / 100
        console.log('contagem ' + pessoa + ' = ' + contagem + "(" + pct + "%)")
    }
};

function muda_pessoa(){
    shuffle(pessoas)
    const milionario_da_rodada = sorteia_pessoa(pessoas)
    pessoa_sorteada.textContent = milionario_da_rodada
    dimdim.textContent = '$$$$$'
};
