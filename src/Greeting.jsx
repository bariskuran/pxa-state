import React from "react";
import PropTypes from "prop-types";

export const Greeting = ({ name }) => {
    return <h1>Hi, {name}!</h1>;
};

Greeting.propTypes = {
    name: PropTypes.string,
};
