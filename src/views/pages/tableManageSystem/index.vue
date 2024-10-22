<template>
    <div class="Container">
        <div class="ContainerNavigation">
            <el-menu class="menuNavigation" :default-openeds="['1','1-1']">
                <el-submenu class="submenuMainNavigation" index="1">
                    <template slot="title"><i class="el-icon-menu"></i>导航</template>
                    <el-submenu class="submenuNavigation" index="1-1">
                        <template slot="title">投掷项目</template>
                        <el-menu-item class="menuitemNavigation" @click="openInformationTable('touzhi')"
                            index="1-1-1">人员信息</el-menu-item>
                    </el-submenu>
                    <el-submenu class="submenuNavigation" index="1-2">
                        <template slot="title">射击项目</template>
                        <el-menu-item class="menuitemNavigation" @click="openInformationTable('sheji')"
                            index="1-2-1">人员信息</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </div>
        <div class="ContainerMain">
            <div class="ContainerMainHeader">
                <div class="ContainerMainHeaderLeft">
                    <div class="ContainerMainHeaderLeftPlus">
                        <el-button type="primary" @click="showPlusModal()">
                            <i class="el-icon-plus"></i>
                            新 建
                        </el-button>
                    </div>
                    <div class="ContainerMainHeaderLeftDelete">
                        <el-button type="primary" @click="showDeleteModal()">
                            <i class="el-icon-delete"></i>
                            删除
                        </el-button>
                    </div>
                </div>
                <div class="ContainerMainHeaderSearch">
                    <el-select class="ContainerMainHeaderSearchType" v-model="selectType" placeholder="选择类型">
                        <el-option label="所有人员" value="0"></el-option>
                        <el-option label="人员编号" value="person_id"></el-option>
                        <el-option label="人员姓名" value="person_name"></el-option>
                        <el-option label="设备编号" value="device_id"></el-option>
                        <el-option label="设备批次" value="device_batch"></el-option>
                        <el-option label="训练批次" value="group_id"></el-option>
                    </el-select>
                    <el-input class="ContainerMainHeaderSearchInput" placeholder="请输入内容" prefix-icon="el-icon-search"
                        v-model="selectContext">
                    </el-input>
                    <el-button class="ContainerMainHeaderSearchButton" type="primary" @click="showSelect()">搜索</el-button>
                </div>
            </div>
            <el-table class="ContainerMainTable" :data="tableData" height="calc(100% - 60px)"
                @select="handleSelectionChange" @select-all="handleSelectionAll">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column fixed prop="person_id" label="人员编号" width="140">
                </el-table-column>
                <el-table-column fixed prop="person_name" label="人员姓名" width="120">
                </el-table-column>
                <el-table-column prop="device_id" label="设备编号" width="140">
                    <template slot-scope="scope">
                        <p >{{ parseInt(scope.row.device_id).toString(16) }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="device_batch" label="设备批次" width="120">
                </el-table-column>
                <el-table-column prop="group_id" label="训练批次" width="120">
                </el-table-column>
                <el-table-column prop="project_type" label="项目类型" width="120">
                    <template slot-scope="scope">
                        <p v-if="scope.row.project_type === 0">投掷</p>
                        <p v-else>射击</p>
                    </template>
                </el-table-column>
                <el-table-column prop="update_time" label="时间">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button @click="handleDeleteOne(scope.row.person_id)" type="text" size="small">删除</el-button>
                        <el-button @click="handleUpdataOne(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <div class="tableManageCover" v-if="showtableManageCover"></div>


        <el-form v-if="showPlusForm" :model="personInfPlus" ref="personInfPlus" :rules="rules" class="formPlus">
            <p class="formPlusTitle">新建</p>
            <el-form-item class="formItemPlus" prop="person_id">
                <div class="formItemPlusTitle">
                    <p class="requiredSign">*</p>人员编号:
                </div>
                <el-input v-model="personInfPlus.person_id" placeholder="人员编号"></el-input>
            </el-form-item>
            <el-form-item class="formItemPlus" prop="person_name">
                <div class="formItemPlusTitle">
                    <p class="requiredSign">*</p>人员姓名:
                </div>
                <el-input v-model="personInfPlus.person_name" placeholder="人员姓名"></el-input>
            </el-form-item>
            <el-form-item class="formItemPlus" prop="device_batch">
                <div class="formItemPlusTitle">
                    <p class="requiredSign">*</p>设备批次:
                </div>
                <el-input v-model="personInfPlus.device_batch" placeholder="设备批次"></el-input>
            </el-form-item>
            <el-form-item class="formItemPlus" prop="group_id">
                <div class="formItemPlusTitle">
                    <p class="requiredSign">*</p>训练批次:
                </div>
                <el-input v-model="personInfPlus.group_id" placeholder="训练批次"></el-input>
            </el-form-item>
            <el-form-item class="formItemPlus" prop="device_id">
                <div class="formItemPlusTitle">
                    <p class="requiredSign">*</p>设备编号:
                </div>
                <el-select v-model="personInfPlus.device_id" style="width: 430px;" placeholder="请选择设备编号">
                    <el-option label="11000001号设备" value="11000001"></el-option>
                    <el-option label="11000005号设备" value="11000005"></el-option>
                    <el-option label="11000009号设备" value="11000009"></el-option>
                    <el-option label="11000854号设备" value="11000854"></el-option>
                    <el-option label="11000855号设备" value="11000855"></el-option>
                    <el-option label="11000856号设备" value="11000856"></el-option>
                    <el-option label="11000844号设备" value="11000844"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="formItemPlusButton">
                <el-button type="primary" @click="onClearPlus()">清空</el-button>
                <el-button type="primary" @click="onClosePlus()">关闭</el-button>
                <el-button type="primary" @click="onSubmitPlus()">确定</el-button>
            </el-form-item>
        </el-form>


        <el-form v-if="showEditForm" :model="personInfEdit" ref="personInfEdit" :rules="rules" class="formEdit">
            <p class="formEditTitle">编辑</p>
            <el-form-item class="formItemEdit" prop="person_id">
                <div class="formItemEditTitle">
                    <p class="requiredSign">*</p>人员编号:
                </div>
                <el-input :disabled="true" v-model="personInfEdit.person_id" placeholder="人员编号"></el-input>
            </el-form-item>
            <el-form-item class="formItemEdit" prop="person_name">
                <div class="formItemEditTitle">
                    <p class="requiredSign">*</p>人员姓名:
                </div>
                <el-input v-model="personInfEdit.person_name" placeholder="人员姓名"></el-input>
            </el-form-item>
            <el-form-item class="formItemEdit" prop="device_batch">
                <div class="formItemEditTitle">
                    <p class="requiredSign">*</p>设备批次:
                </div>
                <el-input v-model="personInfEdit.device_batch" placeholder="设备批次"></el-input>
            </el-form-item>
            <el-form-item class="formItemEdit" prop="group_id">
                <div class="formItemEditTitle">
                    <p class="requiredSign">*</p>训练批次:
                </div>
                <el-input v-model="personInfEdit.group_id" placeholder="训练批次"></el-input>
            </el-form-item>
            <el-form-item class="formItemEdit" prop="device_id">
                <div class="formItemEditTitle">
                    <p class="requiredSign">*</p>设备编号:
                </div>
                <el-select v-model="personInfEdit.device_id" style="width: 430px;" placeholder="请选择设备编号">
                    <el-option label="11000001号设备" value="11000001"></el-option>
                    <el-option label="11000005号设备" value="11000005"></el-option>
                    <el-option label="11000009号设备" value="11000009"></el-option>
                    <el-option label="11000854号设备" value="11000854"></el-option>
                    <el-option label="11000855号设备" value="11000855"></el-option>
                    <el-option label="11000856号设备" value="11000856"></el-option>
                    <el-option label="11000844号设备" value="11000844"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="formItemEditButton">
                <el-button type="primary" @click="onClearEdit()">清空</el-button>
                <el-button type="primary" @click="onCloseEdit()">关闭</el-button>
                <el-button type="primary" @click="onSubmitEdit()">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
  
  
<script lang="js">

import request from '@/utils/request.js'

export default {
    name: 'tableManageSystem',
    components: {
    },
    data() {
        return {
            rules: {
                person_id: [
                    { required: true, message: '请输入人员ID', trigger: 'change' },
                    { pattern: /^\d{2,5}$/, message: '请输入一个2到5位数字', trigger: 'change' },
                ],
                person_name: [
                    { required: true, message: '请输入人员姓名', trigger: 'change' },
                    { min: 2, max: 10, message: '请输入长度为 2 到 10 个字符', trigger: 'change' },
                ],
                device_batch: [
                    { required: true, message: '请输入设备批次', trigger: 'change' },
                    { type: 'number', message: '请输入一个数字', trigger: 'change' },
                    { pattern: /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/, message: '范围在0-255', trigger: 'blur' }
                    // { validator: validDeviceBatch, trigger: 'change' }
                ],
                group_id: [
                    { required: true, message: '请输入训练批次', trigger: 'change' },
                    { type: 'number', message: '请输入一个数字', trigger: 'change' },
                    { pattern: /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/, message: '范围在0-255', trigger: 'blur' }
                    // { validator: validDeviceBatch, trigger: 'change' }
                ],
                device_id: [
                    { required: true, message: '请选择设备Id', trigger: 'change' }
                ],
            },

            showMainContet: false,
            showEditForm: false,
            showtableManageCover: false,
            showPlusForm: false,
            selectType: "",
            selectContext: "",
            tableData: [],
            nowPageIndex: 1,
            nowPageSize: 100,
            personDeleteList: [],
            // tableData: Array(20).fill(item),
            personInfPlus: {
                person_id: '',
                person_name: '',
                device_id: '',
                device_batch: '',
                group_id: '',
                project_type: 0,
            },
            personInfEdit: {
                person_id: '',
                person_name: '',
                device_id: '',
                device_batch: '',
                group_id: '',
                project_type: 0,
            }
        }
    },
    mounted() {
        this.showMainContet = false;
        this.showSelect()
        // let testNumber = "1000";
        // console.log("测试：",parseInt(testNumber,16));
    },
    methods: {
        openInformationTable(project) {
            console.log(project)
            this.showMainContet = true;
            // if (project === 'sheji') {
            //     for (let i = 0; i < this.tableData.length; i++) {
            // this.selectType = 'project_type';
            // this.selectContext = '1';
            // this.showSelect()
            // this.tableData[i].project_type = 1;
            //     }
            // }
            // else if (project === 'touzhi') {
            //     for (let i = 0; i < this.tableData.length; i++) {
            // this.selectType = 'project_type';
            // this.selectContext = '0';
            // this.showSelect()
            // this.tableData[i].project_type = 0;
            // }
            // }
        },
        handleSelectionAll(selection) {
            console.log("toggleSelection(rows)", selection);
            this.personDeleteList.splice(0, this.personDeleteList.length)
            for (let i = 0; i < selection.length; i++) {
                this.personDeleteList.push(selection[i].person_id);
            }
            console.log(this.personDeleteList)
        },
        handleSelectionChange(selection, row) {
            console.log("handleSelectionChange(val):", selection, row)
            this.personDeleteList.splice(0, this.personDeleteList.length)
            for (let i = 0; i < selection.length; i++) {
                this.personDeleteList.push(selection[i].person_id);
            }
            console.log(this.personDeleteList)
        },
        onClosePlus() {
            console.log("调用取消！")
            this.personInfPlus.person_id = '';
            this.personInfPlus.person_name = '';
            this.personInfPlus.device_id = '';
            this.personInfPlus.group_id = '';
            this.personInfPlus.device_batch = "";
            this.showPlusForm = false;
            this.showtableManageCover = false;
        },
        onClearPlus() {
            console.log("调用清空！");
            this.personInfPlus.person_id = '';
            this.personInfPlus.person_name = '';
            this.personInfPlus.group_id = '';
            this.personInfPlus.device_id = '';
            this.personInfPlus.device_batch = "";
        },
        onCloseEdit() {
            console.log("调用取消！")
            this.personInfEdit.person_id = '';
            this.personInfEdit.person_name = '';
            this.personInfEdit.device_id = '';
            this.personInfEdit.group_id = '';
            this.personInfEdit.device_batch = "";
            this.showEditForm = false;
            this.showtableManageCover = false;
        },
        onClearEdit() {
            console.log("调用清空！");
            this.personInfEdit.person_id = '';
            this.personInfEdit.person_name = '';
            this.personInfEdit.device_id = '';
            this.personInfEdit.group_id = '';
            this.personInfEdit.device_batch = "";
        },
        async onSubmitEdit() {
            console.log("调用确定！", this.personInfEdit, parseInt(this.personInfEdit.device_id,16).toString());
            if (parseInt(this.personInfEdit.person_id).toString() !== (this.personInfEdit.person_id).toString() || (this.personInfEdit.person_id.trim().length > 5 || this.personInfEdit.person_id.trim().length < 2)) { console.log(1); return }
            if (this.personInfEdit.device_id === '') {console.log(2); return }
            if (this.personInfEdit.person_name.trim().length > 10 || this.personInfEdit.person_name.trim().length < 2) {console.log(3); return }
            if (parseInt(this.personInfEdit.device_batch).toString() !== (this.personInfEdit.device_batch).toString() || (parseInt(this.personInfEdit.device_batch) > 255 || parseInt(this.personInfEdit.device_batch) < 1)) {console.log(4); return }
            if (parseInt(this.personInfEdit.group_id).toString() !== (this.personInfEdit.group_id).toString() || (parseInt(this.personInfEdit.group_id) > 255 || parseInt(this.personInfEdit.group_id) < 1)) {console.log(5); return }
            console.log("提交！！！");
            try {
                const res = await request.post('/person/update', {
                    data: {
                        person_id: this.personInfEdit.person_id,
                        person_name: this.personInfEdit.person_name,
                        device_id: parseInt(this.personInfEdit.device_id,16).toString(),
                        device_batch: this.personInfEdit.device_batch.toString(),
                        group_id: this.personInfEdit.group_id.toString(),
                        project_type: this.personInfEdit.project_type.toString(),
                    }
                })
                await request.delete('/delete_bind_relation?group_id' + this.personInfEdit.group_id + '&person_id=' + this.personInfEdit.person_id)
                await request.post('/bind_person_device', {
                    data: [{
                        person_id: this.personInfEdit.person_id.toString(),
                        person_name: this.personInfEdit.person_name.toString(),
                        device_id: parseInt(this.personInfEdit.device_id, 16).toString(),
                        group_id: this.personInfEdit.group_id.toString(),
                    }]
                })
                console.log(res);
                this.showSelect();
            }
            catch (error) {
                console.log(error);
            }
            this.onCloseEdit()
        },
        showPlusModal() {
            this.showtableManageCover = true;
            this.showPlusForm = true;
            console.log("点击新建按钮！")
        },
        async onSubmitPlus() {
            if (parseInt(this.personInfPlus.person_id).toString() !== this.personInfPlus.person_id || (this.personInfPlus.person_id.trim().length > 5 || this.personInfPlus.person_id.trim().length < 2)) { return }
            if (this.personInfPlus.device_id === '') { return }
            if (this.personInfPlus.person_name.trim().length > 10 || this.personInfPlus.person_name.trim().length < 2) { return }
            if (parseInt(this.personInfPlus.device_batch).toString() !== this.personInfPlus.device_batch || (parseInt(this.personInfPlus.device_batch) > 255 || parseInt(this.personInfPlus.device_batch) < 1)) { return }
            if (parseInt(this.personInfPlus.group_id).toString() !== this.personInfPlus.group_id || (parseInt(this.personInfPlus.group_id) > 255 || parseInt(this.personInfPlus.group_id) < 1)) { return }
            console.log("点击确定！", this.personInfPlus, parseInt(this.personInfPlus.device_id, 16).toString());
            try {
                await request.post('/person/create', {
                    data: {
                        person_id: this.personInfPlus.person_id,
                        person_name: this.personInfPlus.person_name,
                        device_id: parseInt(this.personInfPlus.device_id, 16).toString(),
                        device_batch: this.personInfPlus.device_batch.toString(),
                        group_id: this.personInfPlus.group_id.toString(),
                        project_type: this.personInfPlus.project_type.toString(),
                    }
                })
                await request.delete('/delete_bind_relation?group_id' + this.personInfPlus.group_id + '&person_id=' + this.personInfPlus.person_id)
                await request.post('/bind_person_device', {
                    data: [{
                        person_id: this.personInfPlus.person_id.toString(),
                        person_name: this.personInfPlus.person_name.toString(),
                        device_id: parseInt(this.personInfPlus.device_id, 16).toString(),
                        group_id: this.personInfPlus.group_id.toString(),
                    }]
                })
                this.showSelect();
            }
            catch (error) {
                console.log(error);
            }
            this.onClosePlus();
        },
        showDeleteModal() {
            console.log("点击删除按钮！")
            this.handleDeleteOne(this.personDeleteList.join("@"))
        },
        async showSelect() {
            if (this.selectType === '0') {
                this.selectType = '';
            }
            try {
                const res = await request.get('/person/get', {
                    params: {
                        page_num: this.nowPageIndex,
                        page_size: this.nowPageSize,
                        search_type: this.selectType === 'person_id' ? 'person_id' : this.selectType,
                        search_value: this.selectContext,
                    }
                })
                this.$nextTick(() => {
                    this.tableData = res.data.data;
                });
            }
            catch (error) {
                console.log(error);
            }
            // this.selectType = '';
            console.log("点击搜索按钮！", this.selectType, "----", this.selectContext)
        },
        async handleDeleteOne(val) {
            console.log("点击删除按钮！", val)
            try {
                const res = await request.delete('/person/delete?person_id=' + val + '&project_type=0')
                console.log("handleDeleteOne", res);
                this.showSelect();
            }
            catch (error) {
                console.log(error);
            }
        },
        async handleUpdataOne(rowValue) {
            this.personInfEdit.person_id = rowValue.person_id;
            this.personInfEdit.person_name = rowValue.person_name;
            this.personInfEdit.device_id = parseInt(rowValue.device_id).toString(16);
            this.personInfEdit.device_batch = rowValue.device_batch;
            this.personInfEdit.group_id = rowValue.group_id;
            this.showEditForm = true;
            this.showtableManageCover = true;
            console.log("点击修改按钮！", rowValue);
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import './index.scss';
</style>