export const FavButton = ({ movieObj, remove = false, handleFavClick }) => {

    function handleAddFav(){
        handleFavClick(true, movieObj);
    }

    function handleRemoveFav(){
        handleFavClick(false, movieObj);
    }

    return (
        <>
            {remove === false ?
            <button onClick={handleAddFav}>Add To Favs</button> :
            <button onClick={handleRemoveFav}>Remove From Favs</button>}
        </>
    );
}

// FavButton.defaultProps = {
//     remove: false
// }



