import axios from "axios";

const addUserToEvent = (eventName, userEmail) => {
    return(
        axios.put('/event', {eventName: eventName, userEmail: userEmail})
        .then((res) => {
            return res
        }).catch((error) => {
              console.log("ERROR", error)
        })
    );
    
}

export default addUserToEvent;