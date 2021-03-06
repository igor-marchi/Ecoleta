function populateUFs(){
    const ufSelect = document.querySelector("select[name = uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) /* maneira de enxuta de função anonima com 1 return e 1 parametro */
    .then( states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })

}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    console.log(indexOfSelectedState)
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json()) /* maneira de enxuta de função anonima com 1 return e 1 parametro */
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false

    })
}

document
    .querySelector("select[name = uf]")
    .addEventListener("change", getCities)


// Itens de coleta
//Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    // adicionar ou remover uma class com js

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    /* console.log("ITEM ID: ", itemId) */

    //verificar se existem items selecionados, se sim
    //pegar ps itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //true or false
        return itemFound
    })

 //se já estiver selecionado, 

    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {
        //se não estiver seleconado
        //adicionar a seleção
        selectedItems.push(itemId)
    }


    /* console.log(selectedItems) */
     

    //atualizar o campo escondido com os iten selecionados
    collectedItems.value = selectedItems
    







}





