// utils will go here
import * as qs from 'query-string';

export const storeAuthData = data => {
    try {
        localStorage.setItem(`Auth_ComeOn`, JSON.stringify(data));
        return true;
    } catch (err) {
        return false;
    }
};

export const deleteAuthData = () => {
    try {
        localStorage.removeItem('Auth_ComeOn');
        return true;
    } catch (err) {
        return false;
    }
};

export const retrieveAuthData = () => {
    try {
        const data = localStorage.getItem('Auth_ComeOn');
        if (data) return JSON.parse(data);
        return null;
    } catch (err) {
        return null;
    }
};

export const scrollElementIntoView = (element, behavior = 'smooth') => {
    // behavios: 'smooth' | 'instant' | 'auto'
    const scrollTop = window.pageYOffset || element.scrollTop;
    const finalOffset = element.getBoundingClientRect().top + scrollTop - window.innerHeight / 2;
    window.parent.scrollTo({
        top: finalOffset,
        behavior: behavior || 'auto',
    });
};

export const debounce = (callback, wait) => {
    let timeout = null;
    return (...args) => {
        const next = () => callback(...args);
        clearTimeout(timeout);
        timeout = setTimeout(next, wait);
    };
};

export const qsStringifier = (query, params) => {
    const tempQuery = query || {};
    const tempParams = params || {};
    return qs.stringify({
        ...tempQuery,
        ...tempParams,
    });
};

export const qsParser = location => {
    return qs.parse(location.search);
};
