let buecher = [];
let kategorien = [];

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

function kategorienLaden(){

    let gespeichert =
    localStorage.getItem("kategorien");

    if(gespeichert){

        kategorien =
        JSON.parse(gespeichert);

    }
    else{

        kategorien = [

            "Geschichte",
            "Roman",
            "Fantasy",
            "Krimi",
            "Sachbuch",
            "Biografie"

        ];

        kategorienSpeichern();

    }

    kategorienAnzeigen();

}

function kategorienSpeichern(){

    localStorage.setItem(

        "kategorien",

        JSON.stringify(kategorien)

    );

}

function kategorienAnzeigen(){

    let select =
    document.getElementById("kategorie");

    let filter =
    document.getElementById("filterKategorie");

    let liste =
    document.getElementById("kategorienListe");


    select.innerHTML="";

    filter.innerHTML=
    "<option value=''>Alle Kategorien</option>";

    liste.innerHTML="";


    kategorien.forEach(kategorie=>{


        // Dropdown "Neues Buch"

        let option =
        document.createElement("option");

        option.textContent=kategorie;

        option.value=kategorie;

        select.appendChild(option);


        // Filter

        let option2 =
        document.createElement("option");

        option2.textContent=kategorie;

        option2.value=kategorie;

        filter.appendChild(option2);


        // Verwaltungsliste

        let zeile =
document.createElement("tr");

zeile.innerHTML = `

<td>

${kategorie}

</td>

<td>

<button
class="btnBearbeiten"
onclick="kategorieBearbeiten('${kategorie}')">

✏️

</button>

<button
class="btnLoeschen"
onclick="kategorieLoeschen('${kategorie}')">

🗑️

</button>

</td>

`;

liste.appendChild(zeile);
    });

}

function kategorieHinzufuegen(){

    let name =

    document
    .getElementById("neueKategorie")
    .value
    .trim();


    if(name===""){

        return;

    }


    if(kategorien.includes(name)){

        alert("Kategorie existiert bereits.");

        return;

    }


    kategorien.push(name);

    kategorien.sort();

    kategorienSpeichern();

    kategorienAnzeigen();


    document
    .getElementById("neueKategorie")
    .value="";

}

function kategorieLoeschen(name){

    let anzahl =

    buecher.filter(

        buch =>

        buch.kategorie===name

    ).length;


    if(
        anzahl>0
    ){

        alert(

            "Diese Kategorie wird noch von "

            + anzahl +

            " Buch/Büchern verwendet."

        );

        return;

    }


    if(
        !confirm(
        "Kategorie wirklich löschen?"
        )
    ){

        return;

    }


    kategorien =

    kategorien.filter(

        k=>k!==name

    );


    kategorienSpeichern();

    kategorienAnzeigen();

}

function kategorieBearbeiten(alterName){

    let neuerName =
    prompt(
        "Neuer Kategoriename:",
        alterName
    );

    if(
        !neuerName
    ){

        return;

    }

    neuerName = neuerName.trim();

    if(
        neuerName === ""
    ){

        return;

    }

    if(
        kategorien.includes(neuerName)
    ){

        alert("Diese Kategorie existiert bereits.");

        return;

    }

    // Kategorienliste ändern

    let index =
    kategorien.indexOf(alterName);

    kategorien[index] = neuerName;

    // Bücher anpassen

    buecher.forEach(buch=>{

        if(
            buch.kategorie===alterName
        ){

            buch.kategorie=neuerName;

        }

    });

    kategorien.sort();

    kategorienSpeichern();

    speichern();

    kategorienAnzeigen();

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


kategorienLaden();

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

/*
================================
 Export
================================
*/

function exportieren(){


    let daten = JSON.stringify(
        buecher,
        null,
        4
    );


    let blob = new Blob(
        [daten],
        {
            type:"application/json"
        }
    );


    let url =
    URL.createObjectURL(blob);


    let link =
    document.createElement("a");


    let datum =
    new Date()
    .toISOString()
    .slice(0,10);



    link.href=url;


    link.download =
    "buecher_backup_" 
    + datum 
    + ".json";


    link.click();


    URL.revokeObjectURL(url);


}




/*
================================
 Import
================================
*/

function importieren(){


    let datei =
    document
    .getElementById("importDatei")
    .files[0];



    if(!datei){

        alert(
        "Bitte zuerst eine Backup-Datei auswählen."
        );

        return;

    }



    let reader =
    new FileReader();



    reader.onload=function(e){


        try{


            let importierteDaten =
            JSON.parse(
                e.target.result
            );




if(
    !Array.isArray(importierteDaten)
){

    throw "Ungültiges Format";

}


/*
================================
 Prüfung der Buchdaten
================================
*/

let gueltigeBuecher =
importierteDaten.every(

    buch =>

    buch.titel &&
    buch.autor &&
    buch.datum &&
    buch.kategorie &&
    buch.unterkategorie

);



if(
    !gueltigeBuecher
){

    throw "Keine gültige Bücherdatei";

}



/*
================================
 Überschreiben bestätigen
================================
*/

if(
    confirm(
        "Die vorhandenen Bücher werden überschrieben. Möchtest du fortfahren?"
    )
){

    buecher = importierteDaten;

}
else{

    return;

}


            speichern();


            anzeigen();



            alert(
            "Bücher erfolgreich importiert."
            );



        }

        catch(error){


            alert(
            "Import fehlgeschlagen. Datei prüfen."
            );


        }


    };



    reader.readAsText(datei);


}