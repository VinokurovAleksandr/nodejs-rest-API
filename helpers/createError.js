const messages = {
  400:"Bed Request",
  410:"Unauthorize",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
}

const createError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  module.exports = createError;