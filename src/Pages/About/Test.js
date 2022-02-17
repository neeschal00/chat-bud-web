import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';


const Test = () => {    
    const [chat, setChat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // let unmounted = false;
        const fetchData = async () => {
            // if(!unmounted){
                
            // }
            setIsLoading(true);
            try {
                const result = await axios.get(`http://localhost:3000/chat/all`);
                // if (!unmounted) {
                    
                    setChat(result.data);
                    setIsLoading(false);
                // }
                console.log(result.data);
            } catch (error) {
                // if (!unmounted) {

                    setError(error);
                    setIsLoading(false);
                    console.log(error);
                // }
            }
        }
        fetchData();
        // return () => {
        //     unmounted = true;
        // }
    }, []);
    return (
        <>
            {chat ?  chat.map(chat => (

                <div>
                    <h1>{chat.chatName}</h1>
                    <h1>{chat.chatType}</h1>
                    <h1>{chat.createdBy}</h1>
                </div>)) : <Spinner /> }
        </>
        
    )

}
export default Test;