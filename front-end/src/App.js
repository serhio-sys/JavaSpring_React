import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomRouter from "./Components/CustomRouter";
import StartPage from "./Pages/StartPage";
import "./App.css";
import CreatePersonPage from "./Pages/CreatePersonPage";
import CreatePositionPage from "./Pages/CreatePositionPage";
import PersonDetailView from "./Pages/PersonDetailView";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
        <CustomRouter>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route path="/create-person/" element={<CreatePersonPage/>}/>
                <Route path="/create-position/" element={<CreatePositionPage/>}/>
                <Route path="/persons/:pk/" element={<PersonDetailView/>}/>
                <Route path="/search/" element={<SearchPage/>}/>
            </Routes>
        </CustomRouter>
    </BrowserRouter>
  );
}

export default App;
