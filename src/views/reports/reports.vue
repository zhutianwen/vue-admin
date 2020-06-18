<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb>
        <el-breadcrumb-item slot="one">数据统计</el-breadcrumb-item>
        <el-breadcrumb-item slot="two">数据列表</el-breadcrumb-item>
    </bread-crumb>
    <!-- 卡片 -->
    <el-card>
        <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import {getReports} from 'api/api.js'
import breadCrumb from 'components/breadCrumb/breadCrumb'
import echarts from 'echarts'
import _ from 'lodash'

export default {
    name:"reports",
    data(){
        return{
            options: {//需要合并的对象
                title: {
                text: '用户来源'
                },
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                    backgroundColor: '#E9EEF3'
                    }
                }
                },
                grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
                },
                xAxis: [
                {
                    boundaryGap: false
                }
                ],
                yAxis: [
                {
                    type: 'value'
                }
                ]
            }
        }
    },
    mounted(){
        var myChart = echarts.init(document.getElementById('main'));
        getReports().then(res=>{
            console.log(res)
            if(res.meta.status !==200){
                return this.$message.error('请求数据失败')
            }else{
               const result = _.merge(res.data,this.options)
                myChart.setOption(result);
            }
        })
     
    },
 
    components:{
        breadCrumb,
    }
}
</script>

<style>

</style>