import SideBar from "../../Components/SideBar";
import { ChatInterface } from "./ChatInterface";

export const UserDashBoard = (props) => {
    return(
        <SideBar children={<ChatInterface/>}/>
    );

} 