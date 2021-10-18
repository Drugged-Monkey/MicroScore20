import dotenv from "dotenv";

const dotenvOptions: dotenv.DotenvConfigOptions = {
    path: "config.env",
    encoding: "latin1"
}

const c = dotenv.config(dotenvOptions);
export const dotenvConfig : dotenv.DotenvConfigOutput = c;