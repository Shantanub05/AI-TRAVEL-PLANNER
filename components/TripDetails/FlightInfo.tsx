import { StyleSheet, Text, View } from 'react-native'
const FlightInfo = ({ flightData }: any) => {
    console.log(flightData)
  return (
    <View>
          <Text>{flightData[0].airline}</Text>
    </View>
  )
}
export default FlightInfo
const styles = StyleSheet.create({})