import { ContactPerson, state } from "./model";
import AddContactView from "./Views/AddContactView";
import ContactContainerView from "./Views/ContactContainerView";
import SearchView from "./Views/SearchView";

//Get contacts from LS
const getContactsFromLS = function(){
    return JSON.parse(localStorage.getItem("contacts") || "[]");
};

//Add Contacts
const controlAddContact = function(e){
    e.preventDefault();

    const {Name, Email, Phone} = AddContactView;
    console.log("ControlAddContact",{Name,Email,Phone});
    const newContact = new ContactPerson(Name, Phone, Email);
    console.log("Saving", newContact);
    newContact.saveContactInLS();
    AddContactView.clearForm();
    ContactContainerView.pushContactIntoContainer(newContact)

};

//Delet Contact
const controlContactDelete = function(id){
    let list = getContactsFromLS();
    if(Array.isArray(list)){
        list = list.filter((contact) => {
            if(contact.id === id) return false;
            else return true;
        });
        ContactContainerView.render(list);
        if(state.isSearching) handleSearchClear();
        list = JSON.stringify(list);
        localStorage.setItem("contacts", list);
    }
};

//Search Handler
const handleSearch = (e) => {
    state.isSearching = true;
    e.preventDefault();
    const { query } = SearchView;
    location.hash = `#q=${query}`;
  };

//HashChange Controlled Here
const controlHashChange = function(){
    const query = location.hash.split("=")[1];
    console.log("Query is", query);
    const results = search(query);
    console.log(results)
    if(typeof query !== "undefined" && query.length>0){
        ContactContainerView.render(results)
    }else{
        ContactContainerView.render(getContactsFromLS());
    }
};

//HANDLER Clear the search
const handleSearchClear = (e) => {
    state.isSearching = false;
    if(e)e.preventDefault();
    SearchView.toggleButtons();
    SearchView.clearForm();
    location.hash = "";
  };

//Search from query
const search = (query) => {
    const list = getContactsFromLS();
    let results = [];
    if (Array.isArray(list)) {
      list.forEach((contact) => {
        if (
          contact.name.includes(query) ||
          contact.phone.toString().includes(query) ||
          contact.email.includes(query)
        ) {
          results.push(contact);
        }
      });
    }
    return results;
};

//Init for all functions
const init = function() {
    AddContactView.addContactSubmitListner(controlAddContact);
    ContactContainerView.addDeleteListner(controlContactDelete);
    ContactContainerView.render(getContactsFromLS());
    SearchView.addSubmitEvent(handleSearch);
    SearchView.addHandleClear(handleSearchClear);
    window.onhashchange = controlHashChange;
};
init();


/*//Sample Input
const newContact = new ContactPerson("Mohamed",123456789,"mohamd@gmail.com");
console.log(newContact);
newContact.saveContactInLS();*/