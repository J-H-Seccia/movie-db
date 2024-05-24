export const FavButton = ({ movieObj, remove = false, handleFavClick, style }) => {

    function handleAddFav(){
        handleFavClick(true, movieObj);
    }

    function handleRemoveFav(){
        handleFavClick(false, movieObj);
    }

    return (
        <>
            {remove === false ?
            <button 
                className="w-16 h-16 bg-primary rounded-md absolute hover:transform hover:scale-125 transition duration-300 ease-in-out"
                style={style} 
                onClick={handleAddFav}>

                <i className="fa-solid fa-heart active:opacity-50" 
                    style={{ fontSize: '2rem', color: '#ffffff' }}>
                </i>

            </button> :

            <button 
                className="w-16 h-16 bg-primary rounded-md absolute hover:transform hover:scale-125 transition duration-300 ease-in-out"
                style={style} 
                onClick={handleRemoveFav}>
                    
                <i className="fa-solid fa-heart" 
                   style={{ fontSize: '2rem', color: '#D30000' }}>
                </i>
            </button>}
        </>
    );
}
