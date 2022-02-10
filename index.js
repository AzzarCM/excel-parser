const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const XLSX = require('xlsx')

initializeApp({
  credential: cert('./excel-key.json')
});

const db = getFirestore();

let workbook = XLSX.readFile('Filtered Speeds(676).xlsx')
const ws = workbook.Sheets['Table Partner Offers_Managed_Fi']

const excelData = XLSX.utils.sheet_to_json(ws);

const newData = excelData.slice(0,10).map((data)=>({
  telusName: data.TELUS_Offer_name,
  speed: data.Speed
}))

newData.forEach(( obj ) =>{
  db.collection('offer').add({
    telusOfferName: obj.telusName,
    speed: obj.speed
  }).then((docRef)=>{
    console.log(docRef.id);
  }).catch((error)=>{
    console.log(error);
  })
})