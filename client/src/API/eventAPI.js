import axios from "axios";

const createEventAPI = (data) => {
    return(
        axios.post('/event', {
            ...data
          }).then((res) => {
            return res
          }).catch((error) => {
              console.log("ERROR", error)
          })
    );
    
}

export default createEventAPI;