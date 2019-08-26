// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDlwrO0FWzSeu9dLTazo9KxefKnLzaBQ0Q",
    authDomain: "samtalsstatistik.firebaseapp.com",
    databaseURL: "https://samtalsstatistik.firebaseio.com",
    projectId: "samtalsstatistik",
    storageBucket: "samtalsstatistik.appspot.com",
    messagingSenderId: "128962238132",
    appId: "1:128962238132:web:501147a99bd2a881"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const selectMenu = document.getElementById("select-category");
const tabell = document.getElementById("tabell");
const laggTillSamtal = document.getElementById("lagg-till-samtal");
const samtalsLangd = document.getElementById("samtals-langd");
const bsidRaknare = document.getElementById("bsidRaknare");

var currentRow = 0;
var bsid = 0;
var mbid = 0;
var ovfr = 0;
var btln = 0;
var ovrt = 0;
var shml = 0;
var kort = 0;

let kategorier = [
	"BankID på Fil",
	"Mobilt BankID",
	"Overforing",
	"Betalning",
	"Sakerhetsmeddelande",
	"Kort",
	"Ovrigt",
];

let raknare = [
	bsid,
	mbid,
	övfr,
	btln,
	övrt,
	shml,
	kort,
];

let raknareText = [
	"bsid",
	"mbid",
	"ovfr",
	"btln",
	"ovrt",
	"shml",
	"kort",
];

for (let i = 0; i < kategorier.length; i++) {
	var option = document.createElement("option");
	option.text = kategorier[i];
	selectMenu.add(option);
	
	var kategoriText = document.createElement("p");
	kategoriText.id = "kategori" + i;
	var text = document.createTextNode(kategorier[i]);
	kategoriText.appendChild(text);
	document.getElementById("statistik" + i).appendChild(kategoriText);

	var kategoriBadge = document.createElement("span");
	kategoriBadge.id = räknareText[i];
	var badgeText = document.createTextNode("0");
	kategoriBadge.appendChild(badgeText);
	kategoriText.appendChild(kategoriBadge);

	document.getElementById("kategori" + i).classList.add("lead");
	document.getElementById(raknareText[i]).classList.add("badge");
	document.getElementById(raknareText[i]).classList.add("badge-pill");
	document.getElementById(raknareText[i]).classList.add("badge-primary");
	document.getElementById(raknareText[i]).style.cursor = "pointer";
	document.getElementById(raknareText[i]).addEventListener('click', function() {
		toggleRows(kategorier[i]);	
	});
}


laggTillSamtal.addEventListener('click', function() {
	for(let i = 0; i < kategorier.length; i++) {
		if (selectMenu.options[selectMenu.selectedIndex].value == kategorier[i]) {
			raknare[i]++;
			document.getElementById(raknareText[i]).innerHTML = raknare[i];
		}
	}
	createTableRow(selectMenu.options[selectMenu.selectedIndex].value)
	db.collection("cities").doc("LA").set({
    		name: "Los Angeles",
    		state: "CA",
    		country: "USA"
	});
});

function createTableRow(kategori) {
	currentRow++;
	var row = tabell.insertRow(currentRow);
	var cell_kategori = row.insertCell(0);
	var cell_samtalslängd = row.insertCell(1);
	var cell_distraktion = row.insertCell(2);
	cell_kategori.innerHTML = kategori;
	cell_samtalslängd.innerHTML = samtalsLangd.value + " min";
	cell_distraktion.innerHTML = document.getElementById("distraktion-text").value;

	if (currentRow % 2 == 0) {
		tabell.rows[currentRow].classList.add("table-primary");
	} else {
		tabell.rows[currentRow].classList.add("table-default");
	}	
}

function toggleRows(text) {

}


