/**
 * Created by Eric on 4/5/2016.
 */

function createAccount()
{
    var userName = $("#newUsername").val();
    var password = $("#newPassword").val();

    if (userName == "" || password == "")
    {
        alert("Error creating account. Provide all information.")
    }
    else
    {
        var options = [userName, 1, password, '', ''];
        User.insert(options);
        $.mobile.changePage("#signInPage", {transition: 'none'});
    }
}

function signIn()
{
    var username = $("#username").val();
    var password = $("#password").val();


    function successSelectAll(tx, results)
    {
        for (var i = 0; i < results.rows.length; i++)
        {
            var row = results.rows[i];
            var existingUsername = row['userName'];
            var userID = row['userID'];

            if (existingUsername == username)
            {

                var existingPassword = row['password'];
                if (existingPassword == password)
                {
                    alert("Welcome back to Revusic, " + existingUsername + "!");

                    localStorage.setItem('id', userID);
                    
                    $.mobile.changePage("#musicPage", {transition: 'none'});
                    break;
                }
                else
                {
                    alert("incorrect password, try again");
                }                
            }
        }
    }

    User.selectAll(successSelectAll);
}

function clearPassword()
{
    $("#password").val("");
}

function updateAccount()
{
    var id = localStorage.getItem("id");
    var country = $("#editCountry").val();
    var bio = $("#editBio").val();

    // NEED TO GET ID
    var options = [country, bio, id];
    User.update(options);
    $.mobile.changePage("#profilePage", {transition: 'none'});
}

function showProfile()
{
    var id = localStorage.getItem("id");
    var options = [id];
    var htmlCode = "";
    
    function successShowProfile(tx, results)
    {
        var row =  results.rows[0];
        
        htmlCode += "<h4>username: " + row['userName'] + "</h4>" + "<h4>country: " + row['country'] + "</h4>" + "<h4>bio: " + row['bio'] + "</h4>";
        
        var div = $("#profileShow");
        div = div.html(htmlCode);
    }
    
    User.select(options, successShowProfile);
}

function editProfile()
{
    var id = localStorage.getItem("id");
    var options = [id];
    
    function successEditProfile(tx, results)
    {
        var row = results.rows[0];
        
        $("#editCountry").val(row['country']);
        $("#editBio").val(row['bio']);
    }
    
    User.select(options, successEditProfile);
}

function addPost()
{
    var id = localStorage.getItem("id");
    var postTitle = $("#postTitle").val();
    var postContent = $("#postContent").val();

    if (postTitle == "" || postContent == "")
    {
        alert("Error posting. Do not leave info blank.")
    }
    else
    {
        var options = [postTitle, postContent, id];
        Post.insert(options);
        $.mobile.changePage("#socialPage", {transition: 'none'});

    }
}

function listSocialPosts()
{
    function successSelectAllPosts(tx, results)
    {
        console.info(results.rows.length);
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++)
        {
            var row = results.rows[i];

            htmlCode += "<li><a data-row-id=" + row['postID'] +
                " href='#'>" +
                "<h4>" + row['postTitle'] + "</h4>" +
                "<p>" + row['postContent'] + "</p>" +
                "</a></li>";
        }
        var list = $("#listOfPosts");
        list = list.html(htmlCode);
        list.listview("refresh");



        $("#listOfPosts a").on("click", postClickHandler);
        
        function postClickHandler()
        {
            localStorage.setItem("postID", $(this).attr("data-row-id"));
            var userID = localStorage.getItem("id");

            //NOT WORKING---------------------------
            var options = [userID];

            function successSelectAllPosts2()
            {
                
                var row = results.rows[0];
                var postUserID = row['postUserID'];
                var userID = localStorage.getItem("id");

                $(location).prop('href', '#viewPostPage');
                // if (postUserID == userID)
                // {
                //     $(location).prop('href', '#editPostPage');
                // }
                // else
                // {
                //    $(location).prop('href', '#viewPostPage');
                // }

                
            }

            Post.select(options, successSelectAllPosts2);

            //--------------------------------------

        }
    }

    Post.selectAll(successSelectAllPosts);
}

function viewPost()
{
    var postID = localStorage.getItem("postID");
    var options = [postID];
    var htmlCode = "";

    function successViewPost(tx, results)
    {
        var row = results.rows[0];

        htmlCode += "<h4>" + row['postTitle'] +
            "</h4><p>" + row['postContent'] + "</p>";

        var div = $("#viewPostDiv");
        div = div.html(htmlCode);
    }

    Post.select(options, successViewPost);
}

function clearDatabase() {
    var result = confirm("Really want to clear database?");
    try {
        if (result) {
            DB.dropTables();
            alert("Database cleared!");
        }

    } catch (e) {
        alert (e);
    }
}