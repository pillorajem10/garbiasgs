import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));

function readOption(optionName, fallback) {
  const optionIndex = process.argv.indexOf(`--${optionName}`);
  const value = optionIndex === -1 ? undefined : process.argv[optionIndex + 1];
  return value ? path.resolve(value) : fallback;
}

export const SOURCE_DIRECTORY = readOption("source", path.join(toolsDirectory, "image-source"));
export const OUTPUT_DIRECTORY = readOption("output", path.join(toolsDirectory, "image-output"));
export const REPOSITORY_ROOT = path.resolve(toolsDirectory, "..", "..");
