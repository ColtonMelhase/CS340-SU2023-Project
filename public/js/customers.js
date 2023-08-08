async function updateForm() {
    //if the default 'select' option is reselected, make all fields blank
    if(document.getElementById("updateCustomerSelect").value == "") {
        document.querySelector("#upName").value = "";
        document.querySelector("#upUsername").value = "";
        document.querySelector("#upEmail").value = "";
        return;
    }
    let customerID = document.getElementById("updateCustomerSelect").value;

    //fetch query
    console.log("updating form for customer "+customerID);
    const response = await fetch("/Customers/"+customerID);
    
    const customer = await response.json();
    console.log(customer);

    // Fill fields with query values
    document.querySelector("#upName").value = customer.name;
    document.querySelector("#upUsername").value = customer.username;
    document.querySelector("#upEmail").value = customer.email;
}