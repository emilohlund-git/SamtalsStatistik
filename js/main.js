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

db.collection("samtal").get().then(function(querySnapshot) {
	var loadedRow = 0;
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
	var row = tabell.insertRow(currentRow);
	var cell_kategori = row.insertCell(0);
	var cell_samtalslangd = row.insertCell(1);
	var cell_distraktion = row.insertCell(2);
	cell_kategori.innerHTML = kategori;
	cell_samtalslangd.innerHTML = samtalsLangd.value + " min";
	cell_distraktion.innerHTML = document.getElementById("distraktion-text").value;
	loadedRow++;
	if (currentRow % 2 == 0) {
		tabell.rows[currentRow].classList.add("table-primary");
	} else {
		tabell.rows[currentRow].classList.add("table-default");
	}
        console.log(doc.id, " => ", doc.data());
    });
});

const selectMenu = document.getElementById("select-category");
const tabell = document.getElementById("tabell");
const laggTillSamtal = document.getElementById("lagg-till-samtal");
const samtalsLangd = document.getElementById("samtals-langd");
const bsidRaknare = document.getElementById("bsidRaknare");
var clicked = false;
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
	ovfr,
	btln,
	ovrt,
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
	kategoriBadge.id = raknareText[i];
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
		this.style.opacity = 1;
	});
}


laggTillSamtal.addEventListener('click', function() {
	for(let i = 0; i < kategorier.length; i++) {
		if (selectMenu.options[selectMenu.selectedIndex].value == kategorier[i]) {
			raknare[i]++;
			document.getElementById(raknareText[i]).innerHTML = raknare[i];
		}
	}
	createTableRow(selectMenu.options[selectMenu.selectedIndex].value);
});

function createTableRow(kategori) {
	currentRow++;
	var row = tabell.insertRow(currentRow);
	var cell_kategori = row.insertCell(0);
	var cell_samtalslangd = row.insertCell(1);
	var cell_distraktion = row.insertCell(2);
	cell_kategori.innerHTML = kategori;
	cell_samtalslangd.innerHTML = samtalsLangd.value + " min";
	cell_distraktion.innerHTML = document.getElementById("distraktion-text").value

	if (currentRow % 2 == 0) {
		tabell.rows[currentRow].classList.add("table-primary");
	} else {
		tabell.rows[currentRow].classList.add("table-default");
	}
	
	db.collection("samtal").add({
    		kategori: kategori,
    		samtalslängd: samtalsLangd.value,
		övrigt: document.getElementById("distraktion-text").value
	})
	.then(function(docRef) {
    		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
    		console.error("Error adding document: ", error);
	});
}

function toggleRows(text) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  
  filter = text.toUpperCase();
  tr = tabell.getElementsByTagName("tr");

	for (i = 0; i < kategorier.length; i++) {
		if (clicked) {
			deactivateBadge(räknareText[i]);
		} else {
			activateBadge(räknareText[i]);
		}
	}

  // Loop through all table rows, and hide those who don't match the search query
	if (!clicked) {
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
	} else {
	
 for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
        tr[i].style.display = "";
    }
  }	

	}
}

function deactivateBadge(id) {
	document.getElementById(id).style.opacity = .5;
	if (document.getElementById(id).id == document.getElementById(räknareText[räknareText.length-1]).id) {
		clicked = false;
	}
}

function activateBadge(id) {
	document.getElementById(id).style.opacity = 1;
	if (document.getElementById(id).id == document.getElementById(räknareText[räknareText.length-1]).id) {
		clicked = true;
	}
}



