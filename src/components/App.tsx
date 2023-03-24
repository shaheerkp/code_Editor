import { Provider } from "react-redux";
import { store } from "../state"; 
import EsBuild from "./EsBuild";
import Preview from "./preview";
import RepositoriesList from "./RepositoriesList";


const App = () => {

  
  // props for the BarGraph component

  

  return <div>
    <Provider store={store}>
     <EsBuild/>
     {/* <EsBuild/> */}
    
    </Provider>

  </div>




}

export default App;
