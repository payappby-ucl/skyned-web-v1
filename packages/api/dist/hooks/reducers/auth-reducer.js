"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthReducer = void 0;
const react_1 = require("react");
function authReducer(state, action) {
    switch (action.type) {
        case "loaded":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
const useAuthReducer = (initialState) => {
    return (0, react_1.useReducer)((authReducer), initialState);
};
exports.useAuthReducer = useAuthReducer;
