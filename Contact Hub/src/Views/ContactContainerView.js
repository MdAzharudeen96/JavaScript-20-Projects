class ContactContainerView{
    container = document.querySelector(".contacts_container");

    //Rendering all the cards in container
    render(data){
        this.data = data;
        const html = this.generateHTMLString();
        this.container.innerHTML = html;
        this.applyDeleteEvent();
    }

    //Add into html each contact
    generateHTMLString(){
        const data = this.data;
        let html = "";
        if(Array.isArray(data)) {
            data.forEach((contact) => {
                html += this.generateCardContactHTML(contact);
            });
            return html;
        }
    }

    //innerHTML for contacts_container
    generateCardContactHTML(contact){
        return ` 
            <div class="contact_card">
                <div class="contact_info">
                    <div style="font-size:x-large">${contact.name}</div>
                    <div>${contact.phone}</div>
                    <div>${contact.email}</div>
                </div>
                <button class="delete_contact" id="${contact.id}">delete</button>
            </div>
        `;
    }

    //Push the contact
    pushContactIntoContainer(contact){
        const html = this.generateCardContactHTML(contact);
        this.container.insertAdjacentHTML("afterbegin", html);
        this.applyDeleteEvent();
    }

    //HANDLER for delete button
    addDeleteListner(handler){
        this.onDelete = handler;
    }

    //Apply Delete event to all delete buttons
    applyDeleteEvent(){
        const deleteBtn = document.querySelectorAll(".delete_contact");
        deleteBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.onDelete(btn.id);
            });
        });
    }

};

export default new ContactContainerView();