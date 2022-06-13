const pratos = [...document.querySelectorAll('[data-carrosel="prato"]')];
const bebidas = [...document.querySelectorAll('[data-carrosel="bebida"]')];
const sobremesas = [...document.querySelectorAll('[data-carrosel="sobremesa"]')];
const btn = document.querySelector('.btn button');
const modal = document.getElementById('modal')


/* let prato;
let bebida;
let sobremesa;
function escolheAlgo(comidas) {

  comidas.forEach((comida) => {
    comida.addEventListener('click', () => {
      comidas.forEach((comida) => {
        if (comida.classList.contains('active')) {
          comida.classList.remove('active');
          comida.children[4].classList.remove('selected');
        }
      })
      comida.classList.toggle('active');
      comida.children[4].classList.toggle('selected');

      prato = comida.children[1].textContent
      bebida = comida.children[1].textContent
      sobremesa = comida.children[1].textContent
    })
  })

  function finalizar () {  
    const msg = `Olá, gostaria de pedir os seguintes produtos: ${prato}, ${bebida} e ${sobremesa}`
      
    window.open(`https://wa.me/+5591987616051?text=${msg}`)
  }
  btn.addEventListener('click', finalizar)

}

escolheAlgo(pratos)
escolheAlgo(bebidas)
escolheAlgo(sobremesas) */

let pratoSelecionado;
let bebidaSelecionado;
let sobremesaSelecionado;
let pratoValor;
let bebidaValor;
let sobremesaValor;
let unique = [];

pratos.forEach((prato) => {
  prato.addEventListener('click', escolhePrato);

  function escolhePrato () {
    pratos.forEach((prato) => {
      if (prato.classList.contains('active')) {
        prato.classList.remove('active');
        prato.children[4].classList.remove('selected');
      }
    })

    prato.classList.toggle('active');
    pratoSelecionado = prato.children[1].textContent
    pratoValor = prato.children[3].textContent
    prato.children[4].classList.toggle('selected');
    verificar(prato)
  }
})

bebidas.forEach((bebida) => {
  bebida.addEventListener('click', escolheBebida);

  function escolheBebida() {
    bebidas.forEach((bebida) => {
      if (bebida.classList.contains('active')) {
        bebidaCheck = bebida.classList.remove('active');
        bebida.children[4].classList.remove('selected');
      }
    })

    bebida.classList.toggle('active');
    bebidaSelecionado = bebida.children[1].textContent;
    bebidaValor = bebida.children[3].textContent;
    bebida.children[4].classList.toggle('selected');
    verificar(bebida)
  }
})

sobremesas.forEach((sobremesa) => {
  sobremesa.addEventListener('click', escolhesobremesa);
  function escolhesobremesa() {
    sobremesas.forEach((sobremesa) => {
      if (sobremesa.classList.contains('active')) {
        sobremesa.classList.remove('active');
        sobremesa.children[4].classList.remove('selected');
      }
    })
    sobremesa.classList.toggle('active');
    sobremesaSelecionado = sobremesa.children[1].textContent
    sobremesaValor = sobremesa.children[3].textContent
    sobremesa.children[4].classList.toggle('selected');
    verificar(sobremesa)
  }
}) 

function verificar (elements) {
  unique.push(elements.children[1].innerHTML)
  unique = [...new Set(unique)];

  if (unique.length >= 3) {
    btn.classList.add('verify');
    btn.innerHTML = 'Fechar pedido';
  } 
}

function finalizar () {      
  const msg = `Olá, gostaria de pedir os seguintes produtos: ${pratoSelecionado}, ${bebidaSelecionado} e ${sobremesaSelecionado}`

  window.open(`https://wa.me/+5591981028908?text=${msg}`)
}

function openModal () {
  const precos = [pratoValor,bebidaValor,sobremesaValor]
  const precosNumeros = precos.map(item => parseFloat(item.replace('R$ ', '').replace(',','.')));
  const resultado = precosNumeros.reduce((accum, item) =>{
    return accum + item
  },0)

  const resultadoFinal = resultado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

  modal.classList.add('show')

  const showModal = `
  <div class="modal-content">
  <h3>Confirme seu pedido</h3>
  <div class="modal-text">
    <span>${pratoSelecionado}</span>
    <span>${pratoValor}</span>
  </div>
  <div class="modal-text">
    <span>${bebidaSelecionado}</span>
    <span>${bebidaValor}</span>
  </div>
  <div class="modal-text">
    <span>${sobremesaSelecionado}</span>
    <span>${sobremesaValor}</span>
  </div>
  <div class="modal-text">
    <h3>TOTAL</h3>
    <span>${resultadoFinal}</span>
  </div>
  <div class="btn btn-modal">
    <button id="finishing">Tudo certo, pode pedir!</button>
  </div>
  <a class="close" href="/"><h3>Cancelar</h3></a>

  `
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.innerHTML = showModal;
  const finishing = document.getElementById('finishing');
  finishing.addEventListener('click', finalizar);
}

btn.addEventListener('click', openModal)