import { jwtDecode } from "jwt-decode"

const jwtDecoded = (token:string)=>{
    const information = jwtDecode(token)
    return information
}

export default jwtDecoded