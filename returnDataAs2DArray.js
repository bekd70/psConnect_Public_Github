function returnDataAs2dArray(sql) {
  Logger.log('Started running at ' + new Date() +'...')
  var conn = getConnection();
  var stmt = conn.createStatement();
  var results;
  var returnArray = [];
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
  returnArray.push(colNameArr);

  while(results.next()){
    var tmpArr = [];
      var rowString = '';
      for (var col = 0; col < numCols; col++) {
        //rowString += results.getString(col + 1) + '\t';
        tmpArr.push(results.getString(col + 1));
      }
      returnArray.push(tmpArr);
  }
  results.close();
  stmt.close();
  Logger.log('Returning data at ' + new Date())
  return returnArray;
}
