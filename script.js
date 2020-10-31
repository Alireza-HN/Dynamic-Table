///////////////////////////////////////////// dependant to AJAX request /////////////////////////////////////////

$(document).ready(function () 
{
    ///////////////////////////////////////////// AJAX request ///////////////////////////////

    //an array for recieving JSON data
    let arr = [];

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () 
    {
        if (this.readyState === 4 & this.status === 200) 
        {
            //assign recieved data to 'arr'
            arr = JSON.parse(this.responseText).personInfo;
        }


        //add data to table
        for (let i = 0; i < arr.length; i++) 
        {
            //add a row to the table
            $("#mainTable").append("<tr onmouseenter='showButtons(this)' onmouseleave='hideButtons(this)'></tr>");

            //add 'Delete' button as a 'td' to the last row
            $("tr:last").append("<td class='btn deleteBtn' onclick='del(this)'>Delete</td>");

            //add data to 'td's of the row
            for (let key in arr[i]) 
            {
                //add a 'td' to the last row
                $("tr:last").append("<td onclick='showToPanel($(this).parent())'></td>");

                //append data to the 'td'
                $("td:last").append(arr[i][key]);
            }

            //add 'Edit' button as a 'td' to the last row
            $("tr:last").append("<td class='btn editBtn' onclick='edit($(this).parent())'>Edit</td>");
        }
    }      

    //send AJAX request by 'GET' method and 'Asynchronous'
    xhttp.open("GET", "https://extendsclass.com/api/json-storage/bin/fffcdef", true);
    xhttp.send();



    ///////////////////////////////////////////////// buttons ///////////////////////////////////////////


    //'Add to Table' button
    $("#addToTable").on("click", function () 
    {   
        //add a row to the table
        $("#mainTable").append("<tr onmouseenter='showButtons(this)' onmouseleave='hideButtons(this)'></tr>");

        //add 'Delete' button as a 'td' to the last row
        $("tr:last").append("<td class='btn deleteBtn' onclick='del(this)'>Delete</td>");
        

        //add a 'td' to the last row
        $("tr:last").append("<td onclick='showToPanel($(this).parent())'></td>");

        //append the value of 'UID' field to the 'td'
        $("td:last").append($("#uid").val());


        //add a 'td' to the last row
        $("tr:last").append("<td onclick='showToPanel($(this).parent())'></td>");
        //append the value of 'City' field to the 'td'
        $("td:last").append($("#city").val());


        //add a 'td' to the last row
        $("tr:last").append("<td onclick='showToPanel($(this).parent())'></td>");

        //append the value of 'LastName' field to the 'td'
        $("td:last").append($("#lname").val());


        //add a 'td' to the last row
        $("tr:last").append("<td onclick='showToPanel($(this).parent())'></td>");

        //append the value of 'FirstName' field to the 'td'
        $("td:last").append($("#fname").val());



        //add 'Edit' button as a 'td' to the last row
        $("tr:last").append("<td class='btn editBtn' onclick='edit($(this).parent())'>Edit</td>");


        clearFields();
    });


    //'Add' button
    $("#addBtn").on("click", function () {
        showPanel();
    });

    
    //'Cancel' button
    $("#cancelAdd").on("click", function () {        
        clearFields();
    });
});



///////////////////////////////////////////// undependant to AJAX request ////////////////////////////////////////


//make the 'panel' and its buttons visible
function showPanel () 
{
    //show 'panel' and its buttons
    $("#panel").css("visibility", "visible");
    $("#addToTable").css("visibility", "visible");
    $("#cancelAdd").css("visibility", "visible");

    //add an 'input' to each field of 'panel'
    $("#uidContainer").html("<input type='text' id='uid'>");
    $("#cityContainer").html("<input type='text' id='city'>");
    $("#lnameContainer").html("<input type='text' id='lname'>");
    $("#fnameContainer").html("<input type='text' id='fname'>");
}


//clear the fields of 'panel' and hide it
function clearFields() 
{
    //remove 'input's from 'panel' fields to be cleared
    $("#uid").remove();
    $("#city").remove();
    $("#lname").remove();
    $("#fname").remove();

    //hide 'panel' and its buttons
    $("#panel").css("visibility", "hidden");
    $("#addToTable").css("visibility", "hidden");
    $("#cancelAdd").css("visibility", "hidden");
}


//show the information of a clicked row to the 'panel'
function showToPanel (tr) 
{
    showPanel();
    
    //access to each field of the clicked row
    let uidField = $(tr).children("td:nth-child(2)");
    let cityField = $(tr).children("td:nth-child(3)");
    let lnameField = $(tr).children("td:nth-child(4)");
    let fnameField = $(tr).children("td:nth-child(5)");

 
    //show the onformation of the clicked row to the 'panel'
    $("#uid").attr("value", uidField.text());
    $("#city").attr("value", cityField.text());
    $("#lname").attr("value", lnameField.text());
    $("#fname").attr("value", fnameField.text());
}


//delete the clicked row
function del (deleteBtn) {
    $(deleteBtn).parent().remove();

    //change back the 'background-color' of the row except the row being edited
    $("tr").not("#beingEdited").css("background-color", "inherit");
    //change back the 'background-color' of the odd rows except the row being edited
    $("tr:nth-of-type(odd)").not("#beingEdited").css("background-color", "rgba(128, 128, 128, 0.267)");    
}


//container of the information of the fields before being changed
let prevUID;
let prevCity;
let prevLname;
let prevFname;

//edit the content of the fields
function edit (row) 
{
    editDelete_to_applyCancel(row);


    //change the 'background-color' of the row being edited
    $(row).css("background-color", "rgb(255, 81, 0)");

    //add an beingEdited' id to the row being edited
    $(row).attr("id", "beingEdited");

     //remove 'onmouseleave' event for the row being edited (when bieng edited,
    // no need to change its 'background-color' when mouse left)
    $(row).parent().attr("onmouseleave", "");


    //access to each field of the clicked row.
     //remove 'onclick' event for the row being edited (when bieng edited,
    // no need to show its information in the 'panel' when clicked)
    let uidField = $(row).children("td:nth-child(2)").attr("onclick", "");
    let cityField = $(row).children("td:nth-child(3)").attr("onclick", "");
    let lnameField = $(row).children("td:nth-child(4)").attr("onclick", "");
    let fnameField = $(row).children("td:nth-child(5)").attr("onclick", "");

    
    //get the text of each field and save it in 'prev...' for the time to cancel the editing.
     //put an 'input' in the 'td' to be able to change its content and put the 'td's value into it
    //(its preveious content shouldn't be cleared)

    let uidFieldText = prevUID = $(uidField).text();
    $(uidField).html("<input type='text'>").children("input").attr("value", uidFieldText);

    let cityFieldText = prevCity = $(cityField).text();
    $(cityField).html("<input type='text'>").children("input").attr("value", cityFieldText);

    let lnameFieldText = prevLname = $(lnameField).text();
    $(lnameField).html("<input type='text'>").children("input").attr("value", lnameFieldText);

    let fnameFieldText = prevFname = $(fnameField).text();
    $(fnameField).html("<input type='text'>").children("input").attr("value", fnameFieldText);
}


//give 'onmouseleave' and 'onclick' events back to the row and remove the id 'beingEdited'
function giveBack (row) 
{ 
     //give back 'onmouseleave' event to the row (when was editing, it was set to "")
    //(hide 'Edit' and 'Delete' button and change the 'background-color' when mouse left)
    $(row).attr("onmouseleave", "hideButtons(this)");

    //remove 'beingEdited' id of the row (editing is finished)
    $(row).attr("id", "");


     //give back 'onclick' event to the rows being edited (when was editing, it was set to "")
    //(enable the rows to show their information to the 'panel' whn clicked)
    let uidField = $(row).children("td:nth-child(2)").attr("onclick", "showToPanel($(this).parent())");
    let cityField = $(row).children("td:nth-child(3)").attr("onclick", "showToPanel($(this).parent())");
    let lnameField = $(row).children("td:nth-child(4)").attr("onclick", "showToPanel($(this).parent())");
    let fnameField = $(row).children("td:nth-child(5)").attr("onclick", "showToPanel($(this).parent())");
}


//apply the changes
function apply (row) 
{
    giveBack(row);

    applyCancel_to_editDelete(row);


    //access to each field of the clicked row
    let uidField = $(row).children("td:nth-child(2)");
    let cityField = $(row).children("td:nth-child(3)");
    let lnameField = $(row).children("td:nth-child(4)");
    let fnameField = $(row).children("td:nth-child(5)");

    
    //get the new value in the 'input's and put it in the flields
    
    let uidFieldText = $(uidField).children("input").val();
    $(uidField).html(uidFieldText);

    let cityFieldText = $(cityField).children("input").val();
    $(cityField).html(cityFieldText);

    let lnameFieldText = $(lnameField).children("input").val();
    $(lnameField).html(lnameFieldText);

    let fnameFieldText = $(fnameField).children("input").val();
    $(fnameField).html(fnameFieldText);
}


//change 'Edit' button to 'Apply' and 'Delete' button to 'Cancel'
function editDelete_to_applyCancel (row) 
{ 
    //change 'Edit' button to 'Apply' button in the row being edited
    let editBtn = $(row).children("td:nth-child(6)");
    $(editBtn).html("Apply");
    $(editBtn).attr("class", "btn applyBtn");
    $(editBtn).attr("onclick", "apply($(this).parent())");

    //change 'Delete' button to 'Cancel' button in the row being edited
    let deleteBtn = $(row).children("td:nth-child(1)");
    $(deleteBtn).html("Cancel");
    $(deleteBtn).attr("class", "btn cancelBtn");
    $(deleteBtn).attr("onclick", "cancel($(this).parent())");
}


//change 'Apply' button to 'Edit' and 'Cancel' button to 'Delete'
function applyCancel_to_editDelete (row) 
{ 
    //change 'Apply' button to 'Edit' button in the row being edited
    let applyBtn = $(row).children("td:nth-child(6)");
    $(applyBtn).html("Edit");
    $(applyBtn).attr("class", "btn editBtn");
    $(applyBtn).attr("onclick", "edit($(this).parent())");

    //change 'Cancel' button to 'Delete' button in the row being edited
    let cancelBtn = $(row).children("td:nth-child(1)");
    $(cancelBtn).html("Delete");
    $(cancelBtn).attr("class", "btn deleteBtn");
    $(cancelBtn).attr("onclick", "del(this)");
}


//cancel editing or adding new information
function cancel (row) 
{
    giveBack(row);

    //access to each field of the clicked row
    let uidField = $(row).children("td:nth-child(2)");
    let cityField = $(row).children("td:nth-child(3)");
    let lnameField = $(row).children("td:nth-child(4)");
    let fnameField = $(row).children("td:nth-child(5)");

    
    //put previous data before being edited to the fields
    $(uidField).html(prevUID);
    $(cityField).html(prevCity);
    $(lnameField).html(prevLname);
    $(fnameField).html(prevFname);


    //change 'Cancel' button to 'Delete' button in the row being edited
    let cancelBtn = $(row).children("td:nth-child(1)");
    $(cancelBtn).html("Delete");
    $(cancelBtn).attr("class", "btn deleteBtn");
    $(cancelBtn).attr("onclick", "del(this)");


    //change 'Apply' button to 'Edit' button in the row being edited
    let applyBtn = $(row).children("td:nth-child(6)");
    $(applyBtn).html("Edit");
    $(applyBtn).attr("class", "btn editBtn");
    $(applyBtn).attr("onclick", "edit($(this).parent())");
}


//show 'Delete' and 'Edit' buttons for the row being hoverd and change its 'background-color'
function showButtons (tr) 
{
    //show 'Delete' and 'Edit' buttons
    $(tr).children("td:nth-child(1)").css("visibility", "visible");
    $(tr).children("td:nth-child(6)").css("visibility", "visible");

    
    //change the 'background-color' of the row if its not being edited
    if ($(tr).css("background-color") != 'rgb(255, 81, 0)')
    {
        $(tr).css("background-color", "black");
    }
    
    $(tr).css("color", "white");
}


//hide 'Delete' and 'Edit' buttons for the row being hoverd and change its 'background-color'
function hideButtons (tr) 
{
    //hide 'Delete' and 'Edit' buttons
    $(tr).children("td:nth-child(1)").css("visibility", "hidden");
    $(tr).children("td:nth-child(6)").css("visibility", "hidden");


    //change back the 'background-color' of the row except the row being edited
    $(tr).not("#beingEdited").css("background-color", "inherit");

    //change back the 'background-color' of the odd rows except the row being edited
    $("tr:nth-of-type(odd)").not("#beingEdited").css("background-color", "rgba(128, 128, 128, 0.267)");

    $(tr).css("color", "black");    
}