import React from 'react'
import { SafeAreaView,Text,Touchable,TouchableOpacity,View } from 'react-native'
import tw from 'twrnc';


function JobCard({job_name,company_name,location,job_id,job_level,onPress }) {



  return (
    <TouchableOpacity  onPress={onPress}>
   <View style={tw`border   border-gray-400 mx-2 my-2 pl-2 py-1 rounded-md`}>
        <Text style={tw`text-black font-bold text-lg `} >{job_name}</Text>
        <Text style={tw`text-black text-md  mt-1`}>{company_name}</Text>
        <View style={tw`bg-[#rgb(239,83,80)] w-6/12  items-center  py-2 mt-1 rounded-xl`}>
        <Text style={tw`text-white font-bold text-md`}>{location}</Text>
        </View>
        <Text>{job_id}</Text>
        <Text style={tw`text-[#rgb(239,83,80)] font-bold flex text-right mr-2 `}>{job_level}</Text>
   </View>
   </TouchableOpacity>
  )
}

export default JobCard