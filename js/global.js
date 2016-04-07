/**
 * Created by Eric on 4/5/2016.
 */

function btnCreateAccount_click()
{
    doValidate_createAccountForm();
    createAccount();
}

function btnUpdateProfile_click()
{
    updateAccount();
}

function btnSignIn_click()
{
    doValidate_signInForm();
    signIn();
}

function profilePage_pageshow()
{
    showProfile();    
}

function editProfilePage_pageshow()
{
    editProfile();
}

function signInPage_pageshow()
{
    clearPassword();
}

function btnPostNewSocialPost_click()
{
    addPost();
}

function socialPage_show()
{
    listSocialPosts();
}

function viewPostPage_pageshow() 
{
    viewPost();
}

function initDB(){
    console.info("Creating Database");
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating tables");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Database not available!");
        }
    }catch(e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed" );
    }

}

function btnClearDB_click()
{
    clearDatabase();
}

function init()
{
    $("#btnCreateAccount").on("click", btnCreateAccount_click);
    $("#btnSignIn").on("click", btnSignIn_click);
    $("#btnUpdateProfile").on("click", btnUpdateProfile_click);
    
    $("#profilePage").on("pageshow", profilePage_pageshow);
    $("#editProfilePage").on("pageshow", editProfilePage_pageshow);
    $("#signInPage").on("pageshow", signInPage_pageshow);    
    $("#socialPage").on("pageshow", socialPage_show);
    
    
    
    $("#viewPostPage").on("pageshow", viewPostPage_pageshow);
    
    
    
    $("#btnPostNewSocialPost").on("click", btnPostNewSocialPost_click);

    $("#btnClearDB").on("click", btnClearDB_click);
}

$(document).ready(function ()
{
    initDB();
    init();
});