class AddContactView{
    formContainer = document.querySelector(".add_contact_form");
    inputName = this.formContainer.querySelector(".name_input");
    inputPhone = this.formContainer.querySelector(".phone_input");
    inputEmail = this.formContainer.querySelector(".email_input");
    modal = document.querySelector(".add_contact_modal");
    addContactBtn = document.querySelector(".add_contact_btn");

    //HANDLER
    addContactSubmitListner(handler){
        if(typeof handler !== "function"){
            throw new TypeError("Handler must be a function");
        }
        this.formContainer.addEventListener("submit", handler.bind(this));
    }

    //EVENT
    constructor(){
        this.addContactBtn.addEventListener("click", this.toggleModal.bind(this));
        this.formContainer.querySelector(".close").addEventListener("click",this.toggleModal.bind(this));
    }

    //Return Input Values to LS
    get Name(){
        return this.inputName.value;
    }
    get Phone(){
        return this.inputPhone.value;
    }
    get Email(){
        return this.inputEmail.value;
    }

    //Clear the Form
    clearForm(){
        this.inputName.value = "";
        this.inputPhone.value = "";
        this.inputEmail.value = "";
    }

    //Toggle Model for EVENT - remove hidden class
    toggleModal(e){
        e.preventDefault();
        console.log(this.modal);
        this.modal.classList.toggle("hidden");
    }

};

export default new AddContactView();