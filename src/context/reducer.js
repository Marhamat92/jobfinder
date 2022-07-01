import AsyncStorage from "@react-native-async-storage/async-storage";



export default function (state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      //use below line to make sure that the data is not duplicated
      let index = state.favoriteJobs?.findIndex(
        (job) => job.id == action.payload.id
      );
      //use above line to make sure that the data is not duplicated
      if (index == -1) {
        //use below line to store data to mobile storage
        AsyncStorage.setItem('favoriteJobs', JSON.stringify({
          ...state,
          favoriteJobs: [...state.favoriteJobs, action.payload]
        }));
         //use above line to store data to mobile storage
        return {
          ...state,
          favoriteJobs: [...state.favoriteJobs, action.payload],
        };
      } else {
        return state;
      }



    case "REMOVE_FAVORITE":
      //use below line to remove data from mobile storage
      AsyncStorage.setItem('favoriteJobs', JSON.stringify({
        ...state,
        favoriteJobs: state.favoriteJobs.filter(
          (job) => job.id !== action.payload.id
        ),
      }));
      //use above line to remove data from mobile storage
      return {
        ...state,
        favoriteJobs: state.favoriteJobs.filter(
          (job) => job.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
