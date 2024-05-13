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
            <button className="w-32 h-16 bg-primary text-lg rounded-md absolute bottom-0 left-0 mx-4 my-2" onClick={handleAddFav}>Favourite</button> :
            <button className="w-32 h-16 bg-primary text-lg rounded-md absolute bottom-0 left-0 mx-4 my-2" onClick={handleRemoveFav}>Unfavourite</button>}
        </>
    );
}