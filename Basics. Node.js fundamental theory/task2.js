const stream = require('stream');
const fs = require('fs');
const csv = require('csvtojson');

const readStream = fs.createReadStream("./csv/nodejs-hw1-ex1.csv");
const writeStream = fs.createWriteStream("outputData.txt");
const csvStream = csv({constructResult:false, toArrayString:true}).subscribe((jsonObj) => {
  delete jsonObj.Amount;
  return Promise.resolve();
});

async function run () {
  await stream.pipeline(
    readStream,
    csvStream,
    writeStream,
    (error) => {
      error ? console.error('Something went wrong', error) : console.log('Success!');
    }
  )
}

run();