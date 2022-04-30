import React from 'react';
import './App.css';
import FirstPage from "./pages/FirstPage";
import {Navbar} from "./components/Navbar";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AndAnotherOnePage from "./pages/AndAnotherOnePage";
import {Context} from "./context/Context";
import {useTags} from "./hooks/tags.hooks";


const App: React.FC = () => {
    const {list, set, getTag} = useTags()

    return (
        <Context.Provider value={{list, set, getTag}}>
            <BrowserRouter>
                <div className="App">
                    {/*<header>
                        <Navbar/>
                    </header>*/}
                    <main>
                        <div className="container">
                            <Routes>
                                <Route element={<FirstPage/>} path="ner"/>
                                <Route element={<AndAnotherOnePage/>} path="two"/>
                                <Route element={<AndAnotherOnePage/>} path="three"/>
                                <Route element={<AndAnotherOnePage/>} path="four"/>
                                <Route element={<Navigate to="ner" />} path="*" />
                            </Routes>
                        </div>
                    </main>
                </div>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
