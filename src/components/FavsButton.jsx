import { useDispatch, useSelector } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';

function FavButton({ movieObj }) {
    const dispatch = useDispatch();
    const favs = useSelector(state => state.favs.items);
    const isFav = favs.some(fav => fav.id === movieObj.id);

    const handleFavClick = () => {
        if (isFav) {
            dispatch(deleteFav(movieObj));
        } else {
            dispatch(addFav(movieObj));
        }
    };

    return (
        <button onClick={handleFavClick}>
            {isFav ? 'Remove from Favs' : 'Add to Favs'}
        </button>
    );
}

export default FavButton;
