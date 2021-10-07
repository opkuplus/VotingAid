import React from "react";


const SingleInputField = ({type, name, placeholder, value, action, mandatory, defaultValue, id}) => {
   return <input id={id} type={type} name={name} placeholder={placeholder} defaultValue={defaultValue} value={value} onChange={action} required={mandatory}/>
}
export default SingleInputField;
