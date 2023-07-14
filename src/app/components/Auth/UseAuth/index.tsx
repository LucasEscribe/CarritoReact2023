import React from "react";
import { AuthContext } from "../../../contexts/AuthContext";

function UseAuth(){
    return React.useContext(AuthContext);
}

export default UseAuth;