<template>
    <el-dialog
        title="物流进度"
        :visible.sync="progressVisible"
        width="50%"
        :before-close="handleClose">
        <!-- 时间线 -->
        <el-timeline>
            <el-timeline-item
            v-for="(activity, index) in progressList"
            :key="index"
            :timestamp="activity.time">
            {{activity.context}}
            </el-timeline-item>
        </el-timeline>
    </el-dialog>
</template>

<script>
export default {
    name:'progressDialog',
    props:{
        progressVisible:{
            type:Boolean
        },
        progressList:{
            type:Array,
            default:[]
        },
    },
    methods:{
        handleClose(){
            this.$emit('update:progressVisible',false)
        },
    },
}
</script>

<style>

</style>