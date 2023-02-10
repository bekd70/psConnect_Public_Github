/**
 * Select Deploy -> New Deployment
 * Click the Gear icon and choose Library and choose Deploy
 * Save the Script ID for below
 * 
 * In any Google Sheet go to Extensions -> Apps Script
 * In Apps Script click the + next to libraries and add the Script ID for this library you created
 * 
 * You can then create varaibles for a SQL Query and Sheet/JSON/2DArray
 * i.e.:
 * let sheet = SpreadsheetApp.openById("SPREADSHEETID").getSheetByName("SHEETNAME")
 * let sql = "Select * from students;"
 * psConnect.copyDataToSheet(sql,sheet)
 * 
 * //this will clear any existing data on the sheet and add the data queried from Powerschool to the sheet
 * 
 * or 
 * let sql = "Select * from students;"
 * let jsonData = psConnect.returnDataAsJson(sql)
 * 
 * //this will return the data queried date as an array of JSON objects (i.e. [{studentId:1234, lastfirst: "Smith, John"},{studentId:1234, lastfirst: "Smith, John"}])
 * 
 * or 
 * let sql = "Select * from students;"
 * let arr = psConnect.returnDataAs2dArray(sql)
 * 
 * //this will return the data queried date as a 2D array (i.e. [[1234,"Smith, John"],[1234, "Smith, John"]])
 * 
 * 
 */



/**
* provides a connection to the oracle DB on Powerschool
**/
function getConnection(){
  
  var address = 'YOUR_IP_ADDRESS_TO_POWERSCHOOL'; // Provide the server address
  var user = 'psnavigator'; // Provide the user name
  var userPwd = 'PSNAVIGATOR_PASSWORD'; // Provide the Password
  var db = 'psproddb'; // Provide the DB details
  var dbUrl = 'jdbc:oracle:thin:@//' + address + '/' + db;
  var conn = Jdbc.getConnection(dbUrl, user, userPwd);
  return conn;
}






