/**
 * Created by Eric on 4/5/2016.
 */

var db;
function errorHandler(tx, error) {
    console.error("SQL error: " + tx + "(" + error.code + ")--" + error.message);
}
function successTransaction() {
    console.info("Success: Transaction successful");
}


var DB = {
    createDatabase: function(){
        var shortName = "RevusicDB";
        var version = "1.0";
        var displayName ="DB for Revusic";
        var dbsize = 2*1024*1024;
        console.info("Creating Database...");
        db = openDatabase(shortName, version, displayName, dbsize,dbCreateSuccess);
        function dbCreateSuccess(){
            console.info("Success: Database creation successful.");
        }
    },
    createTables: function(){
        function successDrop(){
            console.info("Success: Dropping Table successful");
        }
        function successCreateTables(){
            console.info("Success: Table creation successful");
        }
        function successInsertIntoTable(){
            console.info("Success: Table insertion successful");
        }
        function txFunction(tx){

            var option = [];
            console.info("Creating Table: user ");
            var sql = "CREATE TABLE IF NOT EXISTS user( " +
                "userID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "userName VARCHAR(20) NOT NULL," +
                "authLevel INTEGER NOT NULL," +
                "password VARCHAR(20)," +
                "country VARCHAR(30)," +
                "bio TEXT(500)," +
                "UNIQUE (userName)," +
                "UNIQUE (userID));";
            tx.executeSql(sql, option,successCreateTables,errorHandler);

            console.info("Inserting row to table: user ");
            var sql = "INSERT INTO user (userName, authLevel, password, country, bio) VALUES ('admin', 3, 'admin', 'Canada', 'Administrator');";
            tx.executeSql(sql, successInsertIntoTable,errorHandler);

            var option2 = [];
            console.info("Creating Table: post ");
            var sql = "CREATE TABLE IF NOT EXISTS post( " +
                "postID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "postTitle VARCHAR(25) NOT NULL," +
                "postContent TEXT(2500)," +
                "postUserID INTEGER NOT NULL," +
                "FOREIGN KEY(postUserID) REFERENCES user(userID));";
            tx.executeSql(sql, option2,successCreateTables,errorHandler);

            // console.info("Inserting row to table: post ");
            // var sql = "INSERT INTO post (postTitle, postContent) VALUES ('dummy post', 'blah blah blah');";
            // tx.executeSql(sql, successInsertIntoTable,errorHandler);

        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },
    dropTables:function(){
        function successDrop(){
            console.info("Success: Dropping Table successful");
        }
        function txFunction(tx){
            //var options = [];
            console.info("Dropping table: user");
            var sql = "DROP TABLE IF EXISTS user;";
            tx.executeSql(sql, successDrop, errorHandler);

            console.info("Dropping table: post");
            var sql = "DROP TABLE IF EXISTS post;";
            tx.executeSql(sql, successDrop, errorHandler);
            //
            // console.info("Dropping table: review");
            // var sql2 = "DROP TABLE IF EXISTS review;";
            // tx.executeSql(sql2, successDrop, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};