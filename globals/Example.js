export default {
    name: 'example',

    state: {
        a: 0,
        b: 1,
    },

    events: {
        // Example of event with no parameters.
        swap: (state) => {
            let temp = state.a;
            state.a = state.b;
            state.b = temp;
        },

        // Examples of events with one parameter.
        setA: (state, value) => {
            state.a = value;
        },
        setB: (state, value) => {
            state.b = value;
        },

        // Example of event with multiple parameters.
        setAandB: (state, valueA, valueB) => {
            state.a = valueA;
            state.b = valueB;
        },
    },
};
