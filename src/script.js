// Elementos da página
const addEdditPane = document.querySelector( "div#add_edit_pane" );
addEdditPane.style.display = "none";

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





function openAddEditPane () { addEdditPane.style.display = ""; }
function closeAddEditPane ( readInputs ) {

    addEdditPane.style.display = "none";

    if ( readInputs ) {

        alert( "Ler os inputs e registrar no armazenamento do navegador." )

    }

}

