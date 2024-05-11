// Is Fav

function isFav(arr, path, id){

    // If we are on the favs page...then no 
    // need to check for favs as all the movies
    // on this page are favourited...
    if (arr === null) {
        return false;
    }
    
    if(path === '/favs'){
        return true;
    }

    // If there are no favourited movies...
    // then no need to check if the movie has
    // been favourited...
    if(arr.length === 0){
      return false;
    }

    // Checks whether the object is favourited
    return arr.some((obj) => obj.id === id);

}

export default isFav;