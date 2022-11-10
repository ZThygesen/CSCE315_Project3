import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { Helmet } from "react-helmet"
import "./Header.css";

export default function Header() {
    const google = window.google

    return (
        <header>
            <Link to="/" id="site-title">
                <h1><FaLeaf id="leaf-icon" />Pom & Honey</h1>
            </Link>

            {/*<Helmet>
                <div id="google_translate_element"></div>

                <script type="text/javascript">
                function googleTranslateElementInit() {
                new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element')
                }
                </script>

                <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
            </Helmet>*/}
        </header>
    );
}
