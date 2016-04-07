/**
 * Created by Eric on 4/5/2016.
 */

var User ={
    insert: function(options){
        function txFunction(tx){
            var sql = "INSERT INTO user(userName, authLevel, password, country, bio) values(?,?,?,?,?);";

            function successInsert() {
                console.info("Success: Insert successful");
                alert("User Added, Sign In to Revusic!");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(callback){
        var options = [];

        function txFunction(tx) {
            console.info("Selecting all users");
            var sql = "SELECT * FROM user;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){

        function txFunction(tx) {
            console.info("Selecting a user..");
            var sql = "SELECT * FROM user WHERE userID=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options){


        function txFunction(tx) {
            console.info("Updating ...");
            var sql = "UPDATE user " +
                "SET country=?, bio=? " +
                "WHERE userID=?;";

            function successUpdate() {
                console.info("Success; Update successful");
                alert("User updated successfully");
            }
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options){

        function successDelete() {
            console.info("Success: Delete successful");
            alert("User deleted successfully");
        }
        function txFunction(tx) {
            console.info("Deleting ..");
            var sql = "DELETE FROM user " +
                "WHERE userID=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Post ={
    insert: function(options){
        function txFunction(tx){
            var sql = "INSERT INTO post(postTitle, postContent, postUserID) values(?,?,?);";

            function successInsert() {
                console.info("Success: Insert successful");
                alert("Post Added!");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(callback){
        var options = [];

        function txFunction(tx) {
            console.info("Selecting all posts");
            var sql = "SELECT * FROM post;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){

        function txFunction(tx) {
            console.info("Selecting a post..");
            var sql = "SELECT * FROM post WHERE postID=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options){


        function txFunction(tx) {
            console.info("Updating ...");
            var sql = "UPDATE post " +
                "SET postTitle=?, postContent=? " +
                "WHERE postID=?;";

            function successUpdate() {
                console.info("Success; Update successful");
                alert("Post updated successfully");
            }
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options){

        function successDelete() {
            console.info("Success: Delete successful");
            alert("Post deleted successfully");
        }
        function txFunction(tx) {
            console.info("Deleting ..");
            var sql = "DELETE FROM post " +
                "WHERE postID=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};