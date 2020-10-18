import { GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { CREDENTIALS, GOOGLE_SHEET_ID } from '../secrets';
import * as franceBuyData from '../src/assets/data/input/france-buy.json';
import * as franceRentData from '../src/assets/data/input/france-rent.json';
import { FranceBuyListingJsonFormat, FranceUniversalListingRawFormat } from '../models/france.model';
import * as fs from 'fs';

enum DataDirection {
  Pull = 'pull',
  Push = 'push',
}

enum Country {
  France = 'france',
  Us = 'us',
}

enum PaymentType {
  Buy = 'buy',
  Rent = 'rent',
}

const dataDirection = process.argv[2] as DataDirection;
const country = process.argv[3] as Country;
const paymentType = process.argv[4] as PaymentType;

function createFileName(): string {
  const ending = dataDirection === DataDirection.Pull ? '-output.json' : '.json';
  return `${country}-${paymentType}` + ending;
}

async function accessSpreadsheet(): Promise<GoogleSpreadsheetWorksheet> {
  try {
    console.log('accessSpreadsheet()');
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth(CREDENTIALS);
    // doc.useApiKey('YOUR-API-KEY');
    await doc.loadInfo();
    const sheets = doc.sheetsByTitle;
    console.log(sheets);
    console.log(`sheet name should be ${country}-${paymentType}`);
    const sheet = sheets[`${country}-${paymentType}`];
    console.log(`Using sheet ${sheet.title}`);
    return sheet;
  } catch (error) {
    console.log(error);
  }
}

async function addDataToSpreadsheet(): Promise<void> {
  let sheet: GoogleSpreadsheetWorksheet;
  try {
    sheet = await accessSpreadsheet();
    console.log('sheet: ', sheet);
  } catch (error) {
    return error;
  }
  const newListings = getListingsFromJson();
  let count = 0;
  const listings = newListings.map(rawListing => {
    if (!rawListing.result.estViager && rawListing.result.surface > 0) {
      count++;
      return formatListingForSpreadsheet(rawListing);
    }
  });
  console.log('addRows: ', listings);

  await sheet.addRows(listings);
  console.log(`${count + 1} new rows added to the sheet`);
}

async function pullDataFromSpreadsheet(): Promise<void> {
  let sheet: GoogleSpreadsheetWorksheet;
  let sheetRows: GoogleSpreadsheetRow[];
  try {
    sheet = await accessSpreadsheet();
    await sheet.loadHeaderRow();
    sheetRows = await sheet.getRows();
  } catch (error) {
    console.error(error);
    return;
  }
  const headers = sheet.headerValues;
  console.log('headers: ', headers);
  const formattedRows = sheetRows.map((row: GoogleSpreadsheetRow) => {
    const listing = {};
    headers.forEach((header: keyof FranceBuyListingJsonFormat) => {
       listing[header] = row[header];
    });
    return listing as FranceBuyListingJsonFormat;
  });
  console.log(formattedRows[5]);
  fs.writeFile(outputPath, JSON.stringify(formattedRows), (err: NodeJS.ErrnoException) => {
    if (err) {
      throw err;
    }
    console.log('File has been created successfully');
  });
}

function formatListingForSpreadsheet(rawListing: FranceUniversalListingRawFormat) {
  const listing = rawListing.result;
  console.log(listing.idannonce);
  return {
    idannonce: listing.idannonce,
    bu: JSON.stringify(listing.bu),
    ville: listing.ville,
    nbpieces: listing.nbpieces,
    surface: listing.surface,
    nbchambres: listing.nbchambres,
    longitude: listing.longitude,
    latitude: listing.latitude,
    titre: listing.titre,
    prix: Number(listing.prix ? listing.prix.replace(' ', '').replace('€', '') : 0),
    urlann: listing.urlann,
    department: listing.department,
    district: listing.district,
    postalCode: Number(listing.postalCode ? listing.postalCode : 0),
    monthlyPayment: Number(listing.monthlyPayment ? listing.monthlyPayment.replace(' €/mois', '') : 0),
    geometry: JSON.stringify(listing.geometry),
    date: Date.now(),
  };
}

function getListingsFromJson(): FranceUniversalListingRawFormat[] {
  const listings = paymentType === PaymentType.Buy ? franceBuyData : franceRentData;
  return listings as FranceUniversalListingRawFormat[];
}

const fileName = createFileName();
const outputPath = `./src/assets/data/output/${fileName}`;

if (dataDirection === DataDirection.Pull) {
  console.log('Pull');
  pullDataFromSpreadsheet();
} else if (dataDirection === DataDirection.Push) {
  console.log('Push');
  addDataToSpreadsheet();
} else {
  console.log('No command provided for sheets');
}

