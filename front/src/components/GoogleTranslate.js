import React, { useEffect } from "react";
import "./GoogleTranslate.css";

const GoogleTranslate = () => {

  const googleTranslateElementInit = () => {
     
      new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout: window.google.translate.TranslateElement.FloatPosition.VERTICAL
          },
          'google_translate_element'
      );
  };

  var duplicate_google_translate_counter = 0;//this stops google adding button multiple times

  useEffect(() => {
    const addScript = document.createElement('script');

    if(duplicate_google_translate_counter === 0){
      duplicate_google_translate_counter++;
      addScript.setAttribute(
        'src',
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }

    if (window.document.scrollingElement.hasAttribute("style")) {
      window.document.scrollingElement.setAttribute("style", "");
    }
  }, []);

  return (
      <div id="google_translate_element"></div>
  );
};

export default GoogleTranslate;