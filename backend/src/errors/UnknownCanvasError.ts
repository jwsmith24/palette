import util from "util";

/**
 * An error that is thrown when an unrecognized Canvas error response is encountered.
 */
export class CanvasAPIUnexpectedError extends Error {
  public responseData: unknown;

  constructor(message: string, responseData: unknown) {
    super(message);
    this.name = "CanvasAPIUnexpectedError";
    this.responseData = responseData;
    // looks like:
    // CanvasAPIUnexpectedError: Unexpected Canvas API response
    // Error Data:
    // {
    //   noErrorField: [
    //     {
    //       orNoMessageField: 'The specified resource does not exist.'
    //     }
    //   ]
    // }
  }

  // method that logs the formatted responseData to the console
  logCause(): void {
    console.error(
      `${this.name}:\n ${this.message}\nError Data:\n ${util.inspect(
        this.responseData,
        {
          depth: 50,
          colors: true,
        },
      )}`,
    );
  }
}
