import SideBar from "../../Components/SidebarC/SideBar";
import { ChatInterface } from "./ChatInterface";

export const UserDashBoard = (props) => {
    return(
        <SideBar children={<ChatInterface/>}/>
    );

} 