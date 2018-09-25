module.exports = function(context) {
    const name = context.data.root.query.name;
    const suffix = context.data.root.query.suffix;

    return `${name}${suffix}`
}
