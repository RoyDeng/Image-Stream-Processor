import { parse } from "ts-command-line-args";
import { IStreamArgs } from './args'

export const args = parse<IStreamArgs>({
    link: String
});