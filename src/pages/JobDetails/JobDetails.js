import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  Button,
} from "react-native";
import useFetchData from "../../hooks/fetchData";
import tw from "twrnc";
import RenderHtml from "react-native-render-html";
import SmallButton from "../../components/Buttons/SmallButton";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import {useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";


function JobDetails({ route, navigation }) {
  const { id } = route.params;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addedToFavorite, setAddedToFavorite] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const source = {
    html: `${data?.contents}`,
  };

  const tagsStyles = {
    body: {
      paddingLeft: 6,
      paddingRight: 6,
    },
  };


const addFavorite = () => {
  setAddedToFavorite(true);
  setFavorite(true);
  dispatch({
    type: "ADD_FAVORITE",
    payload: {
      id: data.id,
      title: data.name,
      level: data.levels[0].name,
      company: data.company.name,
      location: data.locations[0].name,
    },
  });
};


// const sendEmail = () => {
//   console.log("email sent");
// }

const toggleModal = () => {
  setModalVisible(!modalVisible);
};

const closeFavoriteModal = () => {
  setAddedToFavorite(false);
};



     

  const onGetData = async () => {
    await axios
      .get(`https://www.themuse.com/api/public/jobs/${id}`)
      .then((response) => {
        setData(response.data);
        navigation.setOptions({ title: response.data.name });
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    onGetData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`bg-[#F2F2F2] mx-2`}>
          <Text style={tw`text-[#37474F] font-bold text-lg`}>{data?.name}</Text>
          <Text style={tw`text-black font-bold mt-1`}>
            <Text style={tw`text-[#rgb(239,83,80)]`}>Locations:</Text>{" "}
            {data?.locations[0]?.name}
          </Text>
          <Text style={tw`text-black font-bold mt-1`}>
            <Text style={tw`text-[#rgb(239,83,80)]`}>Job Level: </Text>{" "}
            {data?.levels[0]?.name}
          </Text>
          <Text style={tw`text-center text-[#37474F] font-bold text-lg`}>
            Job Detail
          </Text>
        </View>
        <RenderHtml
          contentWidth={width}
          source={source}
          tagsStyles={tagsStyles}
        />

        <View style={tw`mx-2 flex-row justify-between  my-3`}>
          <SmallButton
           onPress={()=>{
              setModalVisible(true);
            }}
            icon={<Feather name="send" size={24} color="#fff" />}
            textStyle={tw`text-white font-bold text-lg ml-2`}
            title="Submit"
            style={tw`justify-center items-center flex-1 w-45 bg-[#rgb(239,83,80)] py-2 rounded-md flex-row`}
          />
          <SmallButton
            onPress={() => {
              addFavorite();
            }}
            icon={<Fontisto name="heart" size={20} color="#fff" />}
            textStyle={tw`text-white font-bold text-lg ml-2`}
            title="Favorite Job"
            style={tw`justify-center items-center  w-45 bg-[#rgb(239,83,80)] py-2 rounded-md flex-row`}
          />
        </View>
      </ScrollView>
      <Modal coverScreen={true} isVisible={modalVisible}>
        <View style={tw`flex justify-center items-center bg-white h-30 rounded-md`}>
          <Text style={tw`mb-2 text-black font-bold text-lg`} >Thank you for your submission!</Text>
          <Button title="Close" onPress={toggleModal} color="#rgb(239,83,80)"/>
        </View>
      </Modal>
      <Modal coverScreen={true} isVisible={addedToFavorite}>
        <View style={tw`flex justify-center items-center bg-white h-30 rounded-md`}>
          <Text style={tw`mb-2 text-black font-bold text-lg`} >Hey,you added it to favorite!</Text>
          <Button title="Close" onPress={closeFavoriteModal} color="#rgb(239,83,80)"/>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default JobDetails;
