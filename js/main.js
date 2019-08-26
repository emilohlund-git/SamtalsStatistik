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
const läggTillSamtal = document.getElementById("lägg-till-samtal");
const samtalsLängd = document.getElementById("samtals-längd");
const bsidRäknare = document.getElementById("bsidRäknare");

var currentRow = 0;
var bsid = 0;
var mbid = 0;
var övfr = 0;
var btln = 0;
var övrt = 0;
var shml = 0;
var kort = 0;

let kategorier = [
	"BankID på Fil",
	"Mobilt BankID",
	"Överföring",
	"Betalning",
	"Säkerhetsmeddelande",
	"Kort",
	"Övrigt",
];

let räknare = [
	bsid,
	mbid,
	övfr,
	btln,
	övrt,
	shml,
	kort,
];

let räknareText = [
	"bsid",
	"mbid",
	"övfr",
	"btln",
	"övrt",
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
	document.getElementById(räknareText[i]).classList.add("badge");
	document.getElementById(räknareText[i]).classList.add("badge-pill");
	document.getElementById(räknareText[i]).classList.add("badge-primary");
	document.getElementById(räknareText[i]).style.cursor = "pointer";
	document.getElementById(räknareText[i]).addEventListener('click', function() {
		toggleRows(kategorier[i]);	
	});
}


läggTillSamtal.addEventListener('click', function() {
	for(let i = 0; i < kategorier.length; i++) {
		if (selectMenu.options[selectMenu.selectedIndex].value == kategorier[i]) {
			räknare[i]++;
			document.getElementById(räknareText[i]).innerHTML = räknare[i];
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
	cell_samtalslängd.innerHTML = samtalsLängd.value + " min";
	cell_distraktion.innerHTML = document.getElementById("distraktion-text").value;

	if (currentRow % 2 == 0) {
		tabell.rows[currentRow].classList.add("table-primary");
	} else {
		tabell.rows[currentRow].classList.add("table-default");
	}	
}

function toggleRows(text) {

}


