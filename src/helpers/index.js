export function parseToHTML(object, nested = null) {
    const space = nested ? '        ' : '    ';
    let parsed = nested ? '\n' : '';

    Object.keys(object).forEach((key) => {
        if (object[key]) {
            switch (typeof object[key]) {
                case 'boolean':
                    parsed += object[key] ? `${space}${key}\n` : '';
                    break;
                case 'number':
                    parsed += object[key] ? `${space}${key}=${object[key]}\n` : '';
                    break;
                case 'string':
                    parsed += object[key] ? `${space}${key}="${object[key]}"\n` : '';
                    break;
                case 'object':
                    parsed += `${space}:${key}="{${parseToHTML(object[key], true)}    }"\n`;
                    break;
                default:
                    break;
            }
        }
    });
    return parsed;
}
