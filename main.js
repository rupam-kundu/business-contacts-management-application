/// <reference path="C:\Users\Administrator\BusinessContactsManagementApplication\typings\index.d.ts"/> 

$(document).ready(function() {
  listContacts();
  $("#updateButton").hide();
  $("#successAlert").hide();
});

function listContacts() {
    $.ajax({
      url: 'https://t9dgx0hzth.execute-api.eu-west-1.amazonaws.com/Production/',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var contacts = JSON.parse(data.body);
        $.each(contacts, function (index, contact) {
            if ($("#contactsList tbody").length == 0) {
                $("#contactsList").append("<tbody></tbody>");
               }
               $("#contactsList tbody").append(
                "<tr>" +
                "<td>" + contact.EmailAddress + "</td>" +
                "<td>" + contact.Address + "</td>" +
                "<td>" + contact.Company + "</td>" +
                "<td>" + contact.JobTitle + "</td>" +
                "<td>" + contact.Name + "</td>" +
                "<td>" + contact.PhoneNumber + "</td>" +
                "<td>" +
                  "<button type='button' " +
                  "onclick='getContact(this);' " +
                  "class='btn btn-default' " +
                  "data-id='" + contact.EmailAddress + "'" +
                  "style='background-color: #BABEBF; color: #000000;'" +
                  ">" +
                  "<span class='glyphicon glyphicon-edit' />" + 
                  "Edit" +
                  "</button>" +
                "</td >" +
                "<td>" +
                  "<button type='button' " +
                  "onclick='deleteContact(this);' " +
                  "class='btn btn-default' " +
                  "data-id='" + contact.EmailAddress + "'" +
                  "style='background-color: #BABEBF; color: #000000;'" +
                  ">" +
                  "<span class='glyphicon glyphicon-edit' />" + 
                  "Delete" +
                  "</button>" +
                "</td >" +
                "</tr>");
      });
    },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
}
  
function handleException(request, message, error) {
  var msg = "";
  msg += "Code: " + request.status + "\n";
  msg += "Text: " + request.statusText + "\n";
  if (request.responseJSON != null) {
    msg += "Message" + request.responseJSON.Message + "\n";
  }
  $("#message").html(msg);
}

function getContact(ctl) {
  var id = $(ctl).data("id");
  $.ajax({
    url: "https://t9dgx0hzth.execute-api.eu-west-1.amazonaws.com/Production/singlecontact?EmailAddress=" + id,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var contact = JSON.parse(data.body);
      $("#emailAddress").val(contact.EmailAddress);
      $("#address").val(contact.Address);
      $("#company").val(contact.Company);
      $("#jobTitle").val(contact.JobTitle);
      $("#name").val(contact.Name);
      $("#phoneNumber").val(contact.PhoneNumber);
      $("#addButton").hide();
      $("#updateButton").show();
      $('#businessContact').focus();
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    }
  });
}

function formClear() {
  $("#emailAddress").val("");
  $("#address").val("");
  $("#company").val("");
  $("#jobTitle").val("");
  $("#name").val("");
  $("#phoneNumber").val("");
}

var Contact = {
  EmailAddress: "",
  Address: "",
  Company: "",
  JobTitle: "",
  Name: "",
  PhoneNumber: ""
}

function addContact() {
  Contact = new Object();
  Contact.EmailAddress = $("#emailAddress").val();
  Contact.Address = $("#address").val();
  Contact.Company = $("#company").val();
  Contact.JobTitle = $("#jobTitle").val();
  Contact.Name = $("#name").val();
  Contact.PhoneNumber = $("#phoneNumber").val();
  $.ajax({
    url: "https://t9dgx0hzth.execute-api.eu-west-1.amazonaws.com/Production/",
    type: 'POST',
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(Contact),
    success: function() {
      formClear();
      $("#successAlert").show();
      $("#successAlert").focus();
      $("#message").html("Business contact has been successfully added.");
      $("#contactsList tbody").remove();
      listContacts();
      setTimeout(function() {
        $('#successAlert').fadeOut('slow');
    }, 10000);
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    }
  });
}

function updateContact() {
  Contact = new Object();
  Contact.EmailAddress = $("#emailAddress").val();
  Contact.Address = $("#address").val();
  Contact.Company = $("#company").val();
  Contact.JobTitle = $("#jobTitle").val();
  Contact.Name = $("#name").val();
  Contact.PhoneNumber = $("#phoneNumber").val();
  $.ajax({
    url: "https://t9dgx0hzth.execute-api.eu-west-1.amazonaws.com/Production/",
    type: 'PUT',
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(Contact),
    success: function() {
      formClear();
      $("#successAlert").show();
      $("#successAlert").focus();
      $("#message").html("Business contact has been successfully updated.");
      $("#contactsList tbody").remove();
      listContacts();
      $("#addButton").show();
      $("#updateButton").hide();
      setTimeout(function() {
        $('#successAlert').fadeOut('slow');
    }, 10000);
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    }
  });
}

function reset() {
  formClear();
  $("#addButton").show();
  $("#updateButton").hide();
}

function deleteContact(ctl) {
  var id = $(ctl).data("id");
  if (confirm("Are you sure you want to delete this business contact?")) {
    $.ajax({
      url: "https://t9dgx0hzth.execute-api.eu-west-1.amazonaws.com/Production?EmailAddress=" + id,
      type: 'DELETE',
      dataType: 'json',
      success: function() {
        $("#successAlert").show();
        $("#successAlert").focus();
        $("#message").html("Business contact has been successfully deleted.");
        $("#contactsList tbody").remove();
        listContacts();
        setTimeout(function() {
          $('#successAlert').fadeOut('slow');
      }, 10000);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }
  return false;
}