async function updateForm() {
    let customerID = document.getElementById("updateCustomerSelect").value;

    console.log("updating form for customer "+customerID);
    const response = await fetch("/"+customerID);

    
    const customer = await response.json();
    document.querySelector("#upName").value = customer.name;
    document.querySelector("#upUsername").value = customer.username;
    document.querySelector("#upEmail").value = customer.email;
}