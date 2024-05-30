// Function to shuffle an array
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const truncateOverview = (overview) => {
    if (!overview) {
        return "Details Not Provided";
    } else if (overview.length > 100) {
        return overview.substring(0, 100) + '...';
    }
    return overview;
}