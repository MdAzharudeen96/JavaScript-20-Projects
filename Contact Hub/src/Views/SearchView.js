class SearchView {
    container = document.querySelector(".search_form");
    inputQuery = document.querySelector(".search_input");
  
    addHandleClear(handler) {
      this.container
        .querySelector(".clear_search")
        .addEventListener("click", handler.bind(this));
    }
  
    addHandleClear(handler) {
      this.container
        .querySelector(".clear_search")
        .addEventListener("click", handler.bind(this));
    }
  
   
    addSubmitEvent(handler) {
      this.container.addEventListener("submit", (ev) => {
        handler(ev);
        this.toggleButtons();
      });
    }
  
    toggleButtons() {
      this.container.querySelector(".clear_search").classList.toggle("remove");
      this.container.querySelector(".search_btn").classList.toggle("remove");
    }
  
    get query() {
      return this.inputQuery.value;
    }
    clearForm() {
      this.inputQuery.value = "";
    }
}
  
export default new SearchView();
  