/**
* takes an sql statement as a parameter and connects to PS DB to get 
* saves the data to a sheet also provided as parameter
* this can take several minutes if you are executing many rows of data from PS.
*
*  ***Note that this will clear the data sheet send a a parameter***
* 
* @param {String}    sql    SQL to execute
* @param {Object}    sheet  sheet object
* 
**/
function copyDataToSheet(sql,sheet){
  
  try{
    var startTime = new Date();
    sheet.clear();
    sheet.getRange(1,1).clearNote();
    sheet.getRange(1,1).setValue("Running...");
    var rows = sheet.getLastRow();
    var columns = sheet.getLastColumn();  
    var conn = getConnection();
    var stmt = conn.createStatement();
    var results = stmt.executeQuery(sql); //read the sql statement and load it into var "results" as text
    var numCols = results.getMetaData().getColumnCount();
    var colNameArr=[[]],valArr=[];
    
    sheet.getRange(2, 1, rows, columns).clear();
    
    for(var col = 0; col < numCols; col++){
      colNameArr[0].push(results.getMetaData().getColumnName(col+1));      
    }
    colNameArr[0].push("Status");//adds the status column to be used when you add courses and students later
    sheet.getRange(2, 1, 1, numCols+1).setValues(colNameArr);
    sheet.getRange(2, 1, 1, numCols+1).setBackground("blue");
    sheet.getRange(2, 1, 1, numCols+1).setFontColor("white");
    sheet.getRange(2, 1, 1, numCols+1).setFontSize(14);
    
    while (results.next()){
      var tmpArr = [];
      var rowString = '';
      for (var col = 0; col < numCols; col++) {
        //rowString += results.getString(col + 1) + '\t';
        tmpArr.push(results.getString(col + 1));
      }
      valArr.push(tmpArr);
    }
    results.close();
    stmt.close();
    sheet.getRange(3, 1 , valArr.length, numCols).setValues(valArr);
    var endTime = new Date();
    sheet.getRange(1,1).setValue('Update completed in ' + endTime-startTime/1000 +' seconds')
      
  }catch(e){
    console.log(e)
    sheet.getRange(1,1).setValue("Query Failed");
    sheet.getRange(1,1).setNote(e);
  }
  return false;
}