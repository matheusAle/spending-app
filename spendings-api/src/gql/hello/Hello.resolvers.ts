
export default {
    Query: {
        hello: (_, { name }) => {
            return `Hello ${name || 'World'}`;
        },
    },
};
