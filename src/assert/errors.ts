

export class NewDashBaseError extends Error {

}

export class InValidParameterError extends NewDashBaseError {

}

/**
 * TimeoutError
 *
 * raised when the function is not processed finished in a limit period
 */
export class TimeoutError extends NewDashBaseError { }
