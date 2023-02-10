/**
* takes an sql statement as a parameter and connects to PS DB to get 
* saves the data to a sheet also provided as parameter
* this can take several minutes if you are executing many rows of data from PS
* 
* @param {String}    sql    SQL to execute
* @return {Object}    returns results of query as JSON with JSON.statuscode of 200 if sucessful and JSON.psData with the data from Powerschool
* 
**/
function returnDataAsJson(sql) {
  //var jdbc = tjdbc
  Logger.log('Started running at ' + new Date() +'...')
  var conn = getConnection();
  var stmt = conn.createStatement();
  var results;
  var jsonArray = [];
  var returnResults = {};
  try{
    results = stmt.executeQuery(sql); //read the sql statement and load it into var "results" as text
  }
  catch(e){
    return e;
  }
  var numCols = results.getMetaData().getColumnCount()
  var colNameArr=[],valArr=[];
  for(var col = 0; col < numCols; col++){
      colNameArr.push(results.getMetaData().getColumnName(col+1));      
  }

  while (results.next()){
    var json = {}
    for(var i=0;i<numCols;i++){
      json[colNameArr[i]] = results.getString(i + 1)
    }
  jsonArray.push(json)

  }
  results.close();
  stmt.close();
  Logger.log('Returning data at ' + new Date())
  returnResults.statusCode = (jsonArray.length >0) ? 200 : 500
  returnResults.psData = jsonArray
  return returnResults;
}
