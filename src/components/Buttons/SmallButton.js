import React from 'react'
import { TouchableOpacity,View,Text } from 'react-native'

function SmallButton({ onPress, title, style, textStyle,icon}) {

  return (
    <TouchableOpacity onPress={onPress}>
     <View style={style}>
        {icon}
        <Text style={textStyle}>{title}</Text>
     </View>
    </TouchableOpacity>
   
  )
}

export default SmallButton