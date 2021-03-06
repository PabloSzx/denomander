import { assertThrows, test } from "../deps.ts";
import { Denomander } from "../src/Denomander.ts";
import * as CustomError from "../custom_errors.ts";

test("validation_command_with_required_value", function () {
  const program = new Denomander();
  const args = ["clone"];

  assertThrows(
    () => {
      program.command("clone [repo]", "Clone the repo").parse(args);
    },
    Error,
    CustomError.VALIDATION_REQUIRED_VALUE_NOT_FOUND.message,
  );
});

test("validation_required_option", function () {
  const program = new Denomander();
  const args = ["serve"];

  assertThrows(
    () => {
      program.command("serve").requiredOption("-a --address", "Define address")
        .parse(args);
    },
    Error,
    CustomError.VALIDATION_REQUIRED_OPTIONS_NOT_FOUND.message,
  );
});

test("validation_command_not_defined", function () {
  const program = new Denomander();
  const command_args = ["test"];

  assertThrows(
    () => {
      program
        .command("new [filename]", "Generate a new file")
        .parse(command_args);
    },
    Error,
    CustomError.VALIDATION_COMMAND_NOT_FOUND.message,
  );
});

test("validation_option_not_defined", function () {
  const program = new Denomander();
  const optionArgs = ["serve", "-a", "127.0.0.1"];

  assertThrows(
    () => {
      program
        .command("serve")
        .option("-p --port", "Define port number")
        .parse(optionArgs);
    },
    Error,
    CustomError.VALIDATION_OPTION_NOT_FOUND.message,
  );
});
