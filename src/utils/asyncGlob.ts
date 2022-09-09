import glob from "glob";
import type G from "glob";

export default function asyncGlob(pattern: string, options?: G.IOptions): Promise<string[]> {
    return new Promise((resolve, reject) => {
        glob(pattern, options, (error, matches) => {
            if (error !== null) {
                reject(error);
            }

            resolve(matches);
        });
    });
}
