import React, {Component} from 'react'
import Options from './options'
import Categorize from './categorize'
import { getFirebase } from './firebaseConfig';


const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const lineByLine = require("n-readlines");
const chalk = require("chalk");

// If modifying these scopes, delete token.json.
//const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
const SCOPES = ["https://mail.google.com/"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
      //  const messages = await listMessages(oAuth2Client, 'label:inbox subject:reminder'); //a


  // Checks if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// uses the gmail.users.messages.list to list the messages that meet the criteria given
// function listMessages(auth, query) {
//   return new Promise((resolve, reject) => {
//     const gmail = google.gmail({version: 'v1', auth});
//     gmail.users.messages.list(
//       {
//         userId: 'me',
//         q: query,
//       },
//       (err, res) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         if (!res.data.messages) {
//           resolve([]);
//           return;
//         }
//         resolve(res.data.messages);
//       }
//     );
//   });
// }


//getfilter list

// reads filters and gets the eamils according to the filters
const getFilterList = (fileName) => {
  const filteringList = [];
  const liner = new lineByLine(fileName);
  while ((liner = liner.next())) {
    filteringList.push(liner.toString("utf8"));
  }
  return filteringList;
};

async function deleteMessageWrapper(auth) {
  console.log(
    chalk.blue(
      `Started delete operation-------------------------------------------------`
    )
  );
  const batchLimit = 50;
  const filteringList = getFilterList("filterlist.text");
  let finalResult = [];
  let result = await filteringList.forEach(async (item) => {
    let result = await getMessagesByFilter(auth, item);
    let noOfBatches = Math.ceil(result.length / batchLimit);
    for (let i = 0; i < noOfBatches; i++) {
      let ids = [];
      for (let j = i * batchLimit; j < i * batchLimit + batchLimit; j++) {
        if (result[j]) {
          ids.push(result[j]);
        } else {
          break;
        }
      }
      let resultNew = await deleteBatch(auth, ids);
    }
    finalResult.push({
      Filter: item,
      Mails_Fetched: result.length,
    });
    if (filteringList.length === finalResult.length) {
      console.log(
        chalk.red(
          `Deleted items summary----------------------------------------------------`
        )
      );
      console.table(finalResult);
    }
  });
}

async function deleteBatch(auth, list) {
  const gmail = google.gmail({ version: "v1", auth });
  let res = await gmail.users.messages.batchDelete({
    userId: "me",
    resource: { ids: list },
  });
}

async function getMessagesByFilter(auth, filter, token = "", result = []) {
  const gmail = google.gmail({ version: "v1", auth });
  let res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 500,
    pageToken: token,
    q: filter,
  });

  if (res && res.data) {
    let messages = res.data.messages;
    if (messages && messages.length) {
      messages.forEach((message) => result.push(message.id));
      if (res.data.nextPageToken) {
        result = await getMessagesByFilter(
          auth,
          filter,
          res.data.nextPageToken,
          result
        );
      }
    }
  }
  return result;
}



// // creating Labels
// function modifyLabels(auth, messageId, addLabelIds, removeLabelIds) {
//   return new Promise((resolve, reject) => {
//     const gmail = google.gmail({version: 'v1', auth});
//     gmail.users.messages.modify(
//       {
//         id: messageId,
//         userId: 'me',
//         resource: {
//           addLabelIds,
//           removeLabelIds,
//         },
//       },
//       (err, res) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(res);
//         return;
//       }
//     );
//   });
//   messages.forEach(msg => {
//     modifyLabels(oAuth2Client, msg.id, [Label_11], ['INBOX']);
// })
// }

//create filter
// function createFilter(auth){
//   var gmail = google.gmail('v1');
//   var data = {
//     "criteria": {
//       "from": "someone@gmail.com",
//     },
//     "action": {
//     "addLabelIds": [
//       "CLUNK"
//     ],
//     "removeLabelIds": [
//       "INBOX"
//     ],
//     },
//   };
//   gmail.users.settings.filters.create({
//     auth: auth,
//     userId: 'me',
//     resource: data,
//   }, function(err, result) {
//     if (err) {
//       console.log( err);
//     } else {
//       console.log( result );
//       callback( result );
//     }
//   });
// }


/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name} : ${label.id}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}


class UserChoice extends Component{
  constructor(){
    super();
    this.state = {c: false};
    this.click = this.click.bind(this);
  }


  click(){
    this.setState({c: !this.state.c});
  }

  render(){
    return(
      <div onClick = {this.click} id = "container">
        {this.state.c ? <Categorize/> : <Options/>}
      </div>


    )
  }
}

export default UserChoice;