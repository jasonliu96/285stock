import { render } from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:5000';
const rootElement = document.getElementById("root");
render(
    <App/>, rootElement);

