//Export Searching State
export let state = {
    isSearching: false,
};

//Export to Controller
export class ContactPerson{
    //Constructor for ContactPerson-Details
    constructor(name, phone, email){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.id = `${name}-${phone}-${Math.random().toFixed(2)}`;
        // console.log(this.id);
    }

    //To Save the CP-Details into LS
    saveContactInLS(){
        const contact = {
            name: this.name,
            phone: this.phone,
            email: this.email,
            id: this.id
        };

        let list = JSON.parse(localStorage.getItem('contacts') || "[]");
        list.push(contact);
        localStorage.setItem("contacts", JSON.stringify(list));
    };
};