import { getCityData, StateMan } from "./model";
import SearchView from "./Views/searchView";
import InfoView from "./Views/infoView";
import "regenerator-runtime";

const handleSearch = async function(e){ 
    e.preventDefault();
    console.log("Handle search triggered");
    // state.isLoading = true,
    const { query } = SearchView;
    StateMan.setState({
        ...StateMan.state, isLoading: true,
    });
    const data = await getCityData(query);
    console.log(data);
    StateMan.setState({
        ...StateMan.state, isLoading: false, info: data,
    });
    SearchView.clearForm();
    console.log(data);
};

window.addEventListener("stateUpdate", () => {
    if(StateMan.state.isLoading){
        InfoView.renderSpinner();
    }else InfoView.render(StateMan.state.info);
});

const init = function(){
    SearchView.addSubmitController(handleSearch);
};
init();
