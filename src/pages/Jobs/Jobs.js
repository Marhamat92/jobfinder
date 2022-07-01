import React, { useEffect } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import JobCard from "../../components/JobCard/JobCard";
import useFetchData from "../../hooks/fetchData";
import tw from "twrnc";
import LottieView from 'lottie-react-native';
 

function Jobs({ navigation, route }) {
  const { data, loading, error } = useFetchData(
    "https://www.themuse.com/api/public/jobs?page=10"
  );

   

  if (loading) {
    //needs to cover lottie animation with safeareaview
    return ( <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <LottieView
          source={require('../../assets/workload.json')}
          autoPlay
          loop
        />
      </SafeAreaView>)
  }
  

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!data) {
    return <Text>No data</Text>;
  }

 

  return (
    <FlatList
      data={data?.results}
      renderItem={({ item }) => (
        <JobCard
          onPress={() => navigation.navigate("JobDetails", { id: item.id })}
          job_name={item.name}
          company_name={item.company.name}
          location={item.locations[0].name}
          job_level={item.levels[0].name}
        />
      )}
    />
  );
}

export default Jobs;
