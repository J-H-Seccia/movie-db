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
            <button className="w-16 h-16 bg-primary rounded-md absolute bottom-0 left-0" onClick={handleAddFav}><i className="fa-solid fa-heart" style={{ fontSize: '2rem', color: '#ffffff' }}></i></button> :
            <button className="w-16 h-16 bg-primary rounded-md absolute bottom-0 left-0" onClick={handleRemoveFav}><i className="fa-solid fa-heart" style={{ fontSize: '2rem', color: '#D30000' }}></i></button>}
        </>
    );
}
