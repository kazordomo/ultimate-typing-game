import moment from 'moment';

export function shuffleWords(arr) {
    const words = arr.words
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
    return { name: arr.name, words };
};

export function arrayToObj(arr) {
    return arr.reduce((acc, curr) => {
        acc[curr._id] = curr;
        return acc;
    }, {});
}

export function formatDate(date) {
    return moment(date).format('MMM Do YY');
} 