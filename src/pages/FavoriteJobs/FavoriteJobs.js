import React from "react";
import { SafeAreaView, Text, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import SmallButton from "../../components/Buttons/SmallButton";
import { useDispatch } from "react-redux";

function FavoriteJobs() {
  const favorite_jobs = useSelector((state) => state.favoriteJobs);

  const dispatch = useDispatch();

  const removeFavorite = (id) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: {
        id: id,
      },
    });
  };

  return (
    <SafeAreaView>
      <FlatList
        data={favorite_jobs}
        renderItem={({ item }) => (
          <View
            style={tw`border   border-gray-400 mx-2 my-2 px-2 py-1 rounded-md`}
          >
            <Text style={tw`text-black font-bold text-lg `}>{item.title}</Text>
            <Text style={tw`text-black text-md  mt-1`}>{item.company}</Text>
            <View style={tw`flex-row justify-between items-center`} >
            <View
              style={tw`bg-[#rgb(239,83,80)] w-4/12 px-2  items-center py-1 mt-1 rounded-xl`}
            >
              <Text style={tw`text-white font-bold text-md`}>
                {item.location}
              </Text>
              
            </View>
            <Text
              style={tw`text-[#rgb(239,83,80)] font-bold flex text-right mr-2 `}
            >
              {item.level}
            </Text>
            </View>
            <SmallButton
              onPress={() => removeFavorite(item.id)}
             textStyle={tw`text-white font-bold text-md`}  
             title="Remove" 
             style={tw`bg-[#rgb(239,83,80)] py-1 items-center mt-2 rounded-md`} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default FavoriteJobs;
