class Item {
    constructor ( name, price, amount ) {
        this.name = name;
        this.amount = amount;

        this.numPrice = price;
        this.curPrice = ( price/100 ).toLocaleString( "pt-br", { style:"currency", currency:"BRL" } );

        this.numTotal = price * amount;
        this.curTotal = ( this.numTotal / 100 ).toLocaleString( "pt-br", { style:"currency", currency:"BRL" } );
    }
}





// Array com a lista
let listArr;

let getlocalStorage = localStorage.getItem( "shopping" );
if ( getlocalStorage == null ) {

    listArr = new Array();

} else {

    listArr = JSON.parse( getlocalStorage );
    
}

let edit = false;



// Elementos da página
const addEdditPane = document.querySelector( "div#add_edit_pane" );
addEdditPane.style.display = "none";


const inputName = document.querySelector( "input#input_name" );
const inputPrice = document.querySelector( "input#input_price" );
const inputAmount = document.querySelector( "input#input_amount" );


const main = document.querySelector( "main" );
const header = document.querySelector( "header" );
const listDiv = document.querySelector( "div#list_div" );
const mainList = document.querySelector( "ul#main_list" );

const totalProductsData = document.querySelector( "span#total_products" );
const totalPriceData = document.querySelector( "span#total_price" );
const totalItemsData = document.querySelector( "span#total_items" );

loadList();


const footer = document.querySelector( "footer" );
const checkBox = document.querySelector( "input#check_opitions" );

const opitionsList = document.querySelector( "ul#opitions_section" );
const openOpitionsButtom = document.querySelector( "label#open_opitions" );





// Abre/fecha a dock com as opções
checkBox.addEventListener( "click", () => {

    if ( checkBox.checked ) {        // As opções devem estar abertas

        openOpitionsButtom.style.transform = "rotate( 45deg )";
        footer.style.right = "0";

    } else {                        // As opções devem estar fechadas

        openOpitionsButtom.style.transform = "rotate( 0deg )"
        footer.style.right = "-100%";

    }

} );

// Fecha a dock quando a lista for clicata, em qualquer lugar
opitionsList.onclick = () => {

    let clickEvent = new Event( "click" );
    checkBox.checked = false;
    checkBox.dispatchEvent( clickEvent );
    
}





function openAddEditPane ( editFunction = false ) {

    addEdditPane.style.display = "";

    if( editFunction !== false ) {

        edit = editFunction;

    }

}

function closeAddEditPane ( readInputs ) {


    if ( readInputs ) {

        let verify = verifyInputs();

        if ( verify ) {

            if ( edit !== false ) {

                listArr[ edit ] = new Item(
                    verify[ 0 ],
                    verify[ 1 ],
                    verify[ 2 ],
                );

                edit = false;

            } else {

                listArr.push( new Item(
                    verify[ 0 ],
                    verify[ 1 ],
                    verify[ 2 ]
                ) );

            }

            // Salva as alterações no armazenamento local
            localStorage.setItem( "shopping", JSON.stringify( listArr ) );

            loadList();

        }

    }

        
    addEdditPane.style.display = "none";

    // Limpa os valores de cada input
    [ inputName, inputPrice, inputAmount ].forEach( e => {
        e.value = "";
    } );

}

function verifyInputs () {

    let name = inputName.value == "" ? "<Não informado>" : inputName.value;

    let price = Math.trunc(
        Number(
            inputPrice.value
        ).toFixed(2) * 100
    );

    let amount = Number( inputAmount.value ) == 0 ? 1 : Number( inputAmount.value ).toFixed(0);
    

    if ( price <= 0 ) {
        alert( "Erro... Informe os dados corretamente." );
        return false;
    }

    return [ name, price, amount ];

}

function clearList () {

    listArr = [];
    localStorage.setItem( "shopping", JSON.stringify( listArr ) );
    loadList();

}





function remove ( key ) {

    listArr.splice( key, 1 );
    localStorage.setItem( "shopping", JSON.stringify( listArr ) );
    loadList();

}

function loadList () {

    mainList.innerHTML = "";

    if ( listArr.length == 0 ) {

        header.style.display = "block";
        listDiv.style.display = "none";

    } else {

        let produtcs = listArr.length;
        let total = 0;
        let items = 0;

        header.style.display = "none";
        listDiv.style.display = "block";


        listArr.forEach( ( e,k ) => {

            let itemTag = `<li>
                <div class="content">
                    <div>
                        <span class="product_name">${ e.name } -</span>
                        <span class="product_price">${ e.curPrice }</span>
                        <span class="product_amount">(${ e.amount })</span>
                    </div>
                    <div>
                        <span class="product_total">${ e.curTotal }</span>
                    </div>
                </div>
                <div class="buttons">
                    <button class="remove_item" onclick="remove(${ k })">Remover</button>
                    <button class="edit_item" onclick="openAddEditPane(${ k })">Editar</button>
                </div>
            </li>`

            total += e.numTotal;
            items += Number( e.amount );
            mainList.innerHTML += itemTag;

        } );

        totalProductsData.innerText = produtcs;
        totalPriceData.innerHTML = ( total / 100 ).toLocaleString( "pt-br", { style:"currency", currency:"BRL" } );
        totalItemsData.innerHTML = items;


    }

}

