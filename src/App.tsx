import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import './styles/App.css';
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error";
import AppRouter from "./components/AppRouter";

const App = () => {
console.log('Welcome to page App')

  return (
    
    <BrowserRouter>
    <Navbar></Navbar>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;