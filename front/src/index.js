import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
/*
route.post('/', (req, res) => {
    var q = req.body.q;
    console.log(q);
  var options = { method: 'POST',
  url: 'https://translation.googleapis.com/language/translate/v2',
  form: 
   { key: process.env.TRANSLATE,
     q: q,
     target: 'en' } };
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    res.send(body);
    });
})*/