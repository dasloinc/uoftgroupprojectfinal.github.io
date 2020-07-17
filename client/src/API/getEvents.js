import axios from "axios";

const getEvents = (data) => {
  // console.log(data)
    return(
        axios.get("/api/events", {
            ...data
          }).then((res) => {
            // console.log(res);
            return res
          }).catch((error) => {
              console.log("ERROR", error)
          })
    );    
}

export default getEvents;