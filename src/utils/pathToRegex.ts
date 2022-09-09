export default function pathToRegex(path: string): string {
    let encoded = escapeRegExp(path);

    encoded = replaceAllRegex(encoded, /\\\/:\w+\*/gm, "(?:\\/((?:[^/]+?)(?:\\/(?:[^/]+?))*))?"); // Match :param*
    encoded = replaceAllRegex(encoded, /:\w+\+/gm, "((?:[^/]+?)(?:\\/(?:[^/]+?))*)"); // Match :param+
    encoded = replaceAllRegex(encoded, /\\\/:\w+\?/gm, "(?:\\/([^/]+?))?"); // Match :param?
    encoded = replaceAllRegex(encoded, /:\w+/gm, "([^/]+?)"); // Match :param

    return `/^${encoded}\\/?$/i`
}

function escapeRegExp(text) {
    return text.replace(/[[\]{}().,\\^$|#\s\/]/g, '\\$&');
}

function replaceAllRegex(target: string, regex: RegExp, b: string) {
    let matches = target.match(regex);

    if (matches === null) {
        return target;
    }

    for (let match of matches) {
        target = target.replace(regex, b);
    }

    return target;
}
