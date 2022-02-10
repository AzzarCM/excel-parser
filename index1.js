const XLSX = require('xlsx')
const firebase = require('firebase')

require('firebase/firestore')

//initiate cloud firestore through firebase
firebase.initializeApp({
  apiKey: "AIzaSyB35vZ1rmJgXqJZNqFFax7ID_oLQwOORQc",
  authDomain: "excel-parser-ab90b.firebaseapp.com",
  projectId: "excel-parser-ab90b",
})

let db = firebase.firestore();


let workbook = XLSX.readFile('Filtered Speeds(676).xlsx')
const ws = workbook.Sheets['Table Partner Offers_Managed_Fi']

const excelData = XLSX.utils.sheet_to_json(ws);

const newData = excelData.slice(0,10).map((data)=>({
  telusName: data.TELUS_Offer_name,
  speed: data.Speed
}))

newData.forEach((obj)=>{
  db.collection('offer').add({
    telusOfferName: obj.telusName,
    speed: obj.speed

  }).then(function(docRef) {
    console.log('document written with ID: ', docRef.id);
  })
  .catch(function(error) {
    console.log('error adding document', error);
  })
})

