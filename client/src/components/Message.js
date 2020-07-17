import React from 'react';

const getStyle = (props) => {
    let baseClass = "alert";
    if(props.message.msgBody)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + "text-centre"
}

const Message = props => {
    return(
        <div className={getStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
}

export default Message;