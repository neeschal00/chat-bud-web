import { Box, Container, HStack,Image,Avatar} from "@chakra-ui/react";
import ProfileCard from "../../Components/ProfileCard";
import { useLocation,useParams } from "react-router-dom";


const UserProfile = () => {
    // const location = useLocation();
    // const { id } = useParams();
    // const {from} = location.state;
    // console.log("id",id);
    // console.log("ownProfile",from);
    return(
        <>
            <Box>
                <ProfileCard  />
            </Box>
        </>
    );
}


export default UserProfile;
