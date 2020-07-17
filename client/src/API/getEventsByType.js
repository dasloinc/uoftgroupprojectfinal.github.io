import axios from "axios";

const getEventsByType = (eventCategory) => {
  // console.log(data)
    return(
        axios.get("/eventsByType?eventCategory=" + eventCategory).then((res) => {
            // console.log(res);
            return res
          }).catch((error) => {
              console.log("ERROR", error)
          })
    );    
}

export default getEventsByType;