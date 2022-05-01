import React from 'react';
import './App.css';
import FirstPage from "./pages/FirstPage";
import {Navbar} from "./components/Navbar";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AndAnotherOnePage from "./pages/AndAnotherOnePage";
import {Context} from "./context/Context";
import {useTags} from "./hooks/tags.hooks";
import github from "./images/github.png"
import vk from "./images/vk.png"


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
                    <footer className="footer">
                    <ul className="footerList">
                        <li>
                            <span>
                            <img src={vk} alt="vk"/>
                            </span>
                            <a href="https://vk.com/nikitaaver" target="_blank">Vk</a>
                        </li>
                        <li>
                            <span>
                            <img src={github} alt="github" />
                            </span>
                            <a href="https://github.com/Vulon/NER_roberta" target="_blank">Backend</a>
                        </li>
                        <li>
                            <span>
                            <img src={github} alt="github"/>
                            </span>
                            <a href="https://github.com/Averchenkov/pos-tagger-front" target="_blank">Frontend</a>
                        </li>
                    </ul>
                    </footer>
                </div>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
