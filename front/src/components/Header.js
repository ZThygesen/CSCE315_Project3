import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import "./Header.css";
import GoogleTranslate from "./GoogleTranslate";

/**
 * Header
 * @returns header
 */
export default function Header() {

    return (
        <header>
            <Link to="/" id="site-title">
                <h1><FaLeaf id="leaf-icon" />Pom & Honey</h1>
            </Link>
            <GoogleTranslate/>
            
        </header>
    );
}
