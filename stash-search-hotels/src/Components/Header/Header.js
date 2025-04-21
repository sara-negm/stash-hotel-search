import { ReactComponent as Logo } from "../../stash-logo.svg";
import NavButtons from "../NavButtons/NavButtons";
import "./Header.scss";

export default function Header() {
    return <div className="headerDesign"><Logo /><NavButtons /></div>
}