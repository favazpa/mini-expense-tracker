import React,{useEffect, useRef,useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pie from 'react-native-pie';
import { VictoryPie } from 'victory-native';
import {Svg} from 'react-native-svg';
import { COLORS, FONTS, SIZES, icons, images } from '../constants/theme';

const PieChart = ({categories, total}) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null)

  const rupeesSymbol = '\u20B9';
  const gaugeText = `${total} ${rupeesSymbol}`;

  function processCategoryDataToDisplay() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
        let confirmExpenses = item.transactions.filter(a => a.remind == false)
        var total = item.totalExpense
        return {
            name: item.title,
            y: total,
            expenseCount: confirmExpenses.length,
            color: item.color,
            id: item.id,
            percentage: item.percentage
        }
    })

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0)

    let finalChartData = filterChartData.map((item) => {
        let percentage = item.percentage
        return {
            label: `${percentage}%`,
            y: Number(item.y),
            expenseCount: item.expenseCount,
            color: item.color,
            name: item.name,
            id: item.id
        }
    })

    return finalChartData
}


function setSelectCategoryByName(name) {
  let category = categories.filter(a => a.name == name)
  setSelectedCategory(name)
}


  function RenderChart() {

    let chartData = processCategoryDataToDisplay()
    let colorScales = chartData.map((item) => item.color)
    let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)

        // Android workaround by wrapping VictoryPie with SVG
        return (
            <View  style={{ alignItems: 'center', justifyContent: 'center',height:245,width:245 }}>
                <Svg width={245} height={245} style={{width: "100%", height: "auto"}}>

                    <VictoryPie
                        standalone={false} // Android workaround
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) =>  SIZES.width * 0.33 - 10}
                        innerRadius={50}
                        labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: "white", ...FONTS.body3 },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={245}
                        height={245}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName)
                                        }
                                    }]
                                }
                            }
                        }]}
    
                    />
                </Svg>
                <View style={{ position: 'absolute', top: '42%', left: "37%" }}>
                    <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                    <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Expenses</Text>
                </View>
            </View>
        )
    }
    
      return (
        <RenderChart />
  );
}

const styles = StyleSheet.create({
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 2,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
  }
})



export default PieChart;

