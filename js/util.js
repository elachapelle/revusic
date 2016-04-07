/**
 * Created by Eric on 4/5/2016.
 */

function doValidate_createAccountForm()
{
    var form = $("#createAccountForm");

    //validation rules
    form.validate({
        rules:{
            newEmail:{
                required: true,
                email: true
            },
            newUsername:{
                required: true,
                rangelength: [2,20]
            },
            newPassword:{
                required: true,
                rangelength: [2,20]
            }
            // ,
            // confirmNewPassword:{
            //     passwordCheck: true
            // }
        },
        messages:{
            newEmail:{
                required: "email address is required",
                email: "Enter a valid email address"
            },
            newUsername:{
                required: "username is required",
                rangelength: "Length must be 2-20 characters long"
            },
            newPassword:{
                required: "password is required",
                rangelength: "Length must be 2-20 characters long"
            }
            // ,
            // confirmNewPassword:{
            //     passwordCheck: "passwords must match"
            // }
        }
    });
    //---------------------
    return form.valid();
}

function doValidate_signInForm()
{
    var form = $("#signInForm");

    //validation rules
    form.validate({
        rules:{
            username:{
                required: true
            },
            password:{
                required: true
            }
        },
        messages:{
            username:{
                required: "username is required"
            },
            password:{
                required: "password is required"
            }
        }
    });
    //---------------------
    return form.valid();
}

// jQuery.validator.addMethod("passwordCheck", function()
// {
//     var password = $("#newPassword").val();
//     var password2 = $("#confirmNewPassword").val();
//
//     if (password == password2)
//     {
//        return true;
//     }
//     else
//     {
//         return false;
//     }
// });