let buecher = [];

let sortierRichtung = true;
let aktuelleSortierung = "";


/*
================================
 Daten laden
================================
*/

function laden(){

    let gespeichert = localStorage.getItem("buecher");

    if(gespeichert){

        buecher = JSON.parse(gespeichert);

    }
    else{

        // Beispielbücher beim ersten Start

        buecher = [

            {
                titel:"Die Weltgeschichte",
                autor:"Max Mustermann",
                datum:"2020-01-10",
                kategorie:"Geschichte",
                unterkategorie:"Mittelalter"
            },

            {
                titel:"Der Zauberwald",
                autor:"Anna Müller",
                datum:"2023-03-14",
                kategorie:"Fantasy",
                unterkategorie:"High Fantasy"
            },

            {
                titel:"Deutschland im Wandel",
                autor:"Peter Schmidt",
                datum:"2018-07-22",
                kategorie:"Geschichte",
                unterkategorie:"Neuzeit"
            }

        ];

        speichern();

    }

    anzeigen();

}



/*
================================
 Daten speichern
================================
*/

function speichern(){

    localStorage.setItem(
        "buecher",
        JSON.stringify(buecher)
    );

}



/*
================================
 Neues Buch hinzufügen
================================
*/

function buchHinzufuegen(){

    let buch = {

        titel:
        document.getElementById("titel").value,

        autor:
        document.getElementById("autor").value,

        datum:
        document.getElementById("datum").value,

        kategorie:
        document.getElementById("kategorie").value,

        unterkategorie:
        document.getElementById("unterkategorie").value

    };


    if(
        buch.titel==="" ||
        buch.autor===""
    ){

        alert("Bitte Titel und Autor eingeben!");

        return;

    }


    buecher.push(buch);


    speichern();

    anzeigen();


    // Eingabefelder leeren

    document.getElementById("titel").value="";
    document.getElementById("autor").value="";
    document.getElementById("datum").value="";
    document.getElementById("unterkategorie").value="";


}



/*
================================
 Tabelle anzeigen
================================
*/

function anzeigen(){

    let tabelle =
    document.getElementById("tabelle");


    let suche =
    document.getElementById("suche")
    .value
    .toLowerCase();


    let filter =
    document.getElementById("filterKategorie")
    .value;


    tabelle.innerHTML="";


    buecher

    .filter(buch=>{


        let textTreffer =

        buch.titel
        .toLowerCase()
        .includes(suche)

        ||

        buch.autor
        .toLowerCase()
        .includes(suche);



        let kategorieTreffer =

        filter===""
        ||
        buch.kategorie===filter;



        return textTreffer &&
        kategorieTreffer;


    })


    .forEach((buch,index)=>{


        let zeile =
        document.createElement("tr");


        zeile.innerHTML = `


        <td>${buch.titel}</td>

        <td>${buch.autor}</td>

        <td>${buch.datum}</td>

        <td>${buch.kategorie}</td>

        <td>${buch.unterkategorie}</td>


        <td>

        <div class="aktionen">

        <button
        class="btnBearbeiten"
        onclick="bearbeiten(${index})">

        ✏️

        </button>


        <button
        class="btnLoeschen"
        onclick="loeschen(${index})">

        🗑️

        </button>


        </div>

        </td>


        `;


        tabelle.appendChild(zeile);


    });


}



/*
================================
 Löschen
================================
*/

function loeschen(index){

    if(
        confirm(
        "Dieses Buch wirklich löschen?"
        )
    ){

        buecher.splice(index,1);

        speichern();

        anzeigen();

    }

}



/*
================================
 Bearbeiten
================================
*/

function bearbeiten(index){


    let buch=buecher[index];


    let neuerTitel =
    prompt(
    "Titel:",
    buch.titel
    );


    let neuerAutor =
    prompt(
    "Autor:",
    buch.autor
    );


    let neuesDatum =
    prompt(
    "Erscheinungsdatum:",
    buch.datum
    );


    let neueKategorie =
    prompt(
    "Kategorie:",
    buch.kategorie
    );


    let neueUnterkategorie =
    prompt(
    "Unterkategorie:",
    buch.unterkategorie
    );



    if(neuerTitel){

        buch.titel=neuerTitel;

    }


    if(neuerAutor){

        buch.autor=neuerAutor;

    }


    if(neuesDatum){

        buch.datum=neuesDatum;

    }


    if(neueKategorie){

        buch.kategorie=neueKategorie;

    }


    if(neueUnterkategorie){

        buch.unterkategorie=
        neueUnterkategorie;

    }


    speichern();

    anzeigen();

}



/*
================================
 Sortieren
================================
*/

function sortieren(spalte){


    if(
        aktuelleSortierung===spalte
    ){

        sortierRichtung =
        !sortierRichtung;

    }
    else{

        aktuelleSortierung=spalte;

        sortierRichtung=true;

    }



    buecher.sort((a,b)=>{


        let wertA =
        a[spalte].toLowerCase();


        let wertB =
        b[spalte].toLowerCase();



        if(wertA < wertB){

            return sortierRichtung
            ? -1
            : 1;

        }


        if(wertA > wertB){

            return sortierRichtung
            ? 1
            : -1;

        }


        return 0;


    });



    anzeigen();


}



/*
================================
 Start
================================
*/


laden();



/*
================================
 PWA Service Worker
================================
*/

if(
"serviceWorker" in navigator
){

    navigator.serviceWorker
    .register(
    "service-worker.js"
    )

    .then(()=>{

        console.log(
        "PWA Service Worker aktiv"
        );

    })

    .catch(
    error=>console.log(error)
    );

}