import React from 'react';

const Alert = (props) => {
  function capitalizeFirstLetter(string) {
    if(string ==='danger'){
      string = 'Error'
    }
    // Add a check to ensure 'string' is defined
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return ''; // Return an empty string if 'string' is undefined
  }
  
  if (!props.alert) {
    return null;
  }

  return (
    <div className={`alert alert-${props.alert.typ} alert-dismissible fade show`} role="alert">
      <strong>{capitalizeFirstLetter(props.alert.typ)}:</strong> {props.alert.msg}
    </div>
  );
}

export default Alert;
