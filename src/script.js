class Item {
    constructor ( name, price, amount ) {
        this.name = name;
        this.amount = amount;

        this.numPrice = price;
        this.curPrice = ( price/100 ).toLocaleString( "pt-br", { style:"currency", currency:"BRL" } );

        this.numTotal = price * amount;
        this.numTotal = ( price * amount / 100 ).toLocaleString( "pt-br", { style:"currency", currency:"BRL" } );
    }
}





// Elementos da página
const addEdditPane = document.querySelector( "div#add_edit_pane" );
addEdditPane.style.display = "none";


const inputName = document.querySelector( "input#input_name" );
const inputPrice = document.querySelector( "input#input_price" );
const inputAmount = document.querySelector( "input#input_amount" );


const footer = document.querySelector( "footer" );
const checkBox = document.querySelector( "input#check_opitions" );

const opitionsList = document.querySelector( "ul#opitions_section" );
const openOpitionsButtom = document.querySelector( "label#open_opitions" );

// Array com a lista
let listArr;

let getlocalStorage = localStorage.getItem( "shopping" );
if ( getlocalStorage == null ) {

    listArr = new Array();

} else {

    listArr = JSON.parse( getlocalStorage );
    
}





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





function openAddEditPane () { addEdditPane.style.display = ""; }
function closeAddEditPane ( readInputs ) {


    if ( readInputs ) {

        let verify = verifyInputs();

        if ( verify ) {

            listArr.push( new Item(
                verify[0],
                verify[1],
                verify[2]
            ) );

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
