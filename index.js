const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis'); //add to node

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
  const messages = await listMessages(oAuth2Client, 'label:inbox subject:reminder');


  // Checks if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}
// uses the gmail.users.messages.list to list the messages that meet the criteria given
function listMessages(auth, query) {
  return new Promise((resolve, reject) => {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list(
      {
        userId: 'me',
        q: query,
      },
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        if (!res.data.messages) {
          resolve([]);
          return;
        }
        resolve(res.data.messages);
      }
    );
  });
}


//getfilter list
// reads filters and gets the eamils according to the filters
getFilterList = (fileName) => {
  const filteringList = [];
  const liner = new lineByLine(fileName);
  while ((line = liner.next())) {
    filteringList.push(line.toString("utf8"));
  }
  return filteringList;
};

// //batch delete from api
// function deleteMessage(userId, messageId) {
//   const gmail = google.gmail({ version: "v1", auth });
//   let res = await gmail.users.messages.batchDelete({
//     userId: "me",
//     resource: { ids: list },
//   });
// }
//add async


// creating Labels
function modifyLabels(auth, messageId, addLabelIds, removeLabelIds) {
  return new Promise((resolve, reject) => {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.modify(
      {
        id: messageId,
        userId: 'me',
        resource: {
          addLabelIds,
          removeLabelIds,
        },
      },
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        return;
      }
    );
  });
  messages.forEach(msg => {
    modifyLabels(oAuth2Client, msg.id, [Label_11], ['INBOX']);
})
}

function findMessages(auth) {
  var gmail = google.gmail('v1');
  gmail.users.messages.list({
  auth: auth,
  userId: 'me',
  maxResults: 10,
  q:""
}, function(err, response) {
    console.log(response);
    console.log("++++++++++++++++++++++++++");
    parseMessage(response.messages,auth); //snippet not available
  });
}

function printMessage(messageID,auth) {
  var gmail = google.gmail('v1');
  gmail.users.messages.get({
  auth: auth,
  userId: 'me',
  id:messageID[0].id
}, function(err, response) {
    console.log(response);
    messageID.splice(0,1);
    if(messageID.length>0)
     printMessage(messageID,auth);
   else {
     console.log("All Done");
   }
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
