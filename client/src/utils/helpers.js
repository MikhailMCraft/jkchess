export const getShuffledArr = arr => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

export const generateSetupFen = () => {
    let home = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    const validSetup = () => {
        if (home.indexOf('r') < home.indexOf('k') && home.indexOf('k') < home.indexOf('r', home.indexOf('k'))) {
            if (home.indexOf('b') % 2 === 0 && home.indexOf('b', home.indexOf('b') + 1) % 2 === 1) {
                return true;
            }
        }
        return false;
    };
    do {
        home = getShuffledArr(home);
    } while (!validSetup());
    const board = [
        home.join(''),
        Array(8).fill('p').join(''),
        ...Array(4).fill('8'),
        Array(8).fill('P').join(''),
        home.map(p => p.toUpperCase()).join('')
    ];
    const color = Math.random() < 0.5 ? 'w' : 'b';
    return `${board.join('/')} ${color} - - 0 1`;
};