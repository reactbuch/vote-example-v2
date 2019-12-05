export function apiRequestStart(description) {
  return {
    type: "API_REQUEST_START",
    description
  };
}

export function apiRequestSuccess() {
  return {
    type: "API_REQUEST_SUCCESS"
  };
}

export function apiRequestFailure(error) {
  return {
    type: "API_REQUEST_FAILURE",
    error
  };
}
