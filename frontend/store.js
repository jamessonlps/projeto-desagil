import { useSelector, useDispatch } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

import * as globals from './globals';


const useGlobal = (name) => {
    if (!(name in keys && name in slices)) {
        throw new Error(`Global '${name}' does not exist.`);
    }

    const global = {};

    for (const key of keys[name]) {
        const callback = (state) => state[name][key];
        const value = useSelector(callback);
        global[key] = value;
    }

    for (const key in slices[name].actions) {
        const dispatch = useDispatch();
        const callback = slices[name].actions[key];
        global[key] = (...payload) => dispatch(callback(payload));
    }

    return global;
};


const keys = {};

const entries = [];

for (const [k, global] of Object.entries(globals)) {
    if (typeof global  !== 'object') {
        throw new Error(`${k}.js must export an object.`);
    }
    const name = global.name;
    if (!name || typeof name !== 'string') {
        throw new Error(`Object exported by ${k}.js must have a property called 'name' with a string value.`);
    }
    const state = global.state;
    if (!state || typeof state  !== 'object') {
        throw new Error(`Global '${name}' must have a property called 'state' with an object value.`);
    }
    const events = global.events;
    if (!events || typeof events  !== 'object') {
        throw new Error(`Global '${name}' must have a property called 'events' with an object value.`);
    }
    for (const [key, event] of Object.entries(global.events)) {
        if (typeof event  !== 'function') {
            throw new Error(`Event '${key}' of global '${name}' must be a function.`);
        }
        if (key in global.state) {
            throw new Error(`Global '${name}' cannot use '${key}' for both a state and an event.`);
        }
    }

    keys[global.name] = Object.keys(global.state);

    const reducers = {};

    for (const [key, event] of Object.entries(global.events)) {
        reducers[key] = (state, action) => {
            event(state, ...action.payload);
        };
    }

    const slice = createSlice({
        name: global.name,
        initialState: global.state,
        reducers: reducers,
    });

    entries.push([global.name, slice]);
}

const slices = Object.fromEntries(entries);

const store = entries.length === 0 ? null : configureStore({
    reducer: Object.fromEntries(entries.map(([k, v]) => [k, v.reducer])),
});


export { useGlobal, store };
