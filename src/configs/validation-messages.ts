"use strict";

export const MUST_BE_NUMBER: (resource: string) => string = resource => `${resource} must be valid number greater 0!`;

export const REQUIRED: (resource: string) => string = resource => `${resource} is required!`;

export const LENGTH_REQUIRED: (resource: string, options: { min: number; max: number } | { min: number; max?: undefined } | { min?: undefined; max: number }) => string =
    (resource, options) => {
        const {min, max} = options;
        if (min && max) {
            return `${resource} must be at least ${min} and maximum ${max} characters!`;
        } else if (min) {
            return `${resource} must be at least ${min} characters!`;
        } else {
            return `${resource} must be maximum ${max} characters!`;
        }
    };

export const INVALID_EMAIL: string = "Email is invalid";

export const ONLY_ALPHA_NUMERIC: (resource: string) => string = resource => `${resource} must contain only alphabetic and numeric characters!`;

export const MISSING: (resource: string, place: string) => string = (resource, place) => `Missing ${resource} in ${place}!`;

export const INVALID_PASSWORD: string = "Password must contain at least one character and one number!";
