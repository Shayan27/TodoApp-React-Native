function capitalize(value) {
    let firstChar = value.charAt(0);
    let otherChars = value.slice(1);
    return firstChar.toUpperCase() + otherChars.toLowerCase();
}

export {
    capitalize
}