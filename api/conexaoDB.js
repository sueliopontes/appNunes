
/////////////////////
// Query Functions
/////////////////////

function getDbLocal() {
  var connectionString = 'postgres://postgres:root@localhost:5432/postgres';
  return connectionString;  
}

function getDbRemoto() {
  var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
  return connectionString;  
}

/////////////
// Exports
/////////////

module.exports = {
    getDbLocal: getDbLocal,
    getDbRemoto: getDbRemoto
};
