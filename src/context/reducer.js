export default function (state,action){
    switch(action.type){
        case 'ADD_FAVORITE':
            let index = state.favoriteJobs.findIndex(job => job.id == action.payload.id);
            if(index == -1){
                return {
                    ...state,favoriteJobs: [...state.favoriteJobs, action.payload]                
            }
        } else{
            return state;
        }
   

        case 'REMOVE_FAVORITE':
            return {    ...state,   favoriteJobs: state.favoriteJobs.filter(job => job.id !== action.payload.id)};
            default: 
            return state;    
    }
}