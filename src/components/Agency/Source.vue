<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-3">
            <div class="col-12">
                <h3 class="text-center">Đại Lý</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <router-link :to="{name:'code'}" class="nav-link btn-outline-success ">Bạn</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'partner'}" class="nav-link btn-outline-success ">Đối tác</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'source'}" class="nav-link btn-outline-success active">Nguồn</router-link>
                    </li>
                </ul>
                <hr>
                <div class="report-search my-3">

                    <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <div class="form-check text-center">
                                        <label class="form-check-label" for="sourceTrucTiep">
                                            <input type="radio" class="form-check-input" id="sourceTrucTiep" v-model="source" value="0" >Trực tiếp
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group text-center">
                                    <div class="form-check">
                                        <label class="form-check-label" for="sourceGioiThieu">
                                            <input type="radio" class="form-check-input" id="sourceGioiThieu" v-model="source" value="1" >Qua giới thiệu
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col text-center">
                                <button type="submit" @click="updateSource()" class="btn btn-success">Cập nhật</button>
                            </div>
                        </div>
                </div>


                <hr>
            </div>
            <div class="table-responsive">
                <h4 class="text-center">Người giới thiệu</h4>
                <table class="table table-striped table-hover ">
                    <thead class="thead-inverse">
                    <tr >
                        <th class="col-5">Họ tên</th>
                        <th class="col-2">SĐT</th>
                        <th class="col-2">Xác nhận</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in rows" :key="row.id" v-bind:class="{'text-success':row.confirm>0 ,'text-warning':row.confirm==0,'text-danger':row.confirm=='-1' }">
                        <td class="align-middle" scope="row"><span class="text-nowrap">{{row.fullName}}</span></td>
                        <td class="align-middle">{{row.phone}}</td>
                        <td class="align-middle text-right" >
                            <div class="btn-group " role="group" aria-label="Basic example" >
                                <span class="text-nowrap">
								<div class="btn btn-success" v-if="row.confirm==0" @click="confirmIntroducer(row)">Xác nhận</div>
								<div class="btn btn-danger" @click="deleteIntroducer(row)">Hủy</div>
								</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- Modal -->
</template>

<script>
    export default {
        name: "Source",
        data() {
            return {
                rows:[],
                rows_default: [

                    {
                        "id": 1,
                        "fullName": "Hoàng Thy Hoa",
                        "phone": "0987223344",
                        "parent": 1
                    },
                    {
                        "id": 2,
                        "fullName": "Hoàng Thy Hoa",
                        "phone": "0987223344",
                        "parent": 0
                    }

                ],
                source:this.$store.state.user.user.source??0,
                errors: [],
                onSubmit: false,
            }
        },
        created() {
            this.getIntroducers();
        },
        methods: {
            validationForm(){
                this.errors=[];
                if(!this.form.fullName){
                    this.errors.push('Bạn chưa nhập Họ tên!');
                }
                if(!this.form.phone){
                    this.errors.push('Bạn chưa nhập số điện thoại!');
                }
                if(this.errors.length > 0){
                    window.cmsHattApp.showError({
                        message: this.errors.join('<br>'),
                    });
                    return false;
                }else{
                    return true;
                }
            },
            getIntroducers() {
                if (this.onSubmit) {
                    return false;
                }
                this.onSubmit = true;
                var me = this;
                var api = window.appConfig.api.getIntroducers;
                window.axios({
                    method: api.method,
                    url: api.url,
                    data:{},
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        me.rows = res.data.response;
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });
                this.onSubmit = false;

            },
            updateSource() {
                if (this.onSubmit) {
                    return false;
                }
                this.onSubmit = true;
                var me = this;
                var api = window.appConfig.api.updateSource;
                window.axios({
                    method: api.method,
                    url: api.url+'/'+me.source,
                    data:{source:me.source},
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    var message ='';
                    if (res.data.status == "SUCCESS") {
                        me.$store.dispatch('user/updateSource',me.source);
                        me.rows = res.data.response;
                        window.cmsHattApp.showSuccess({message: "Cập nhật nguồn thành công!"});
                    }else{
                        message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                        window.cmsHattApp.showError({message:message});
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError({message: err.message});
                });
                this.onSubmit = false;

            },
            getMessageConfirm(){
                return new Promise((resolve, reject) => {
                    var api = window.appConfig.api.getConfirmMessage;
                        window.axios({
                            method: api.method,
                            url: api.url,
                            headers: {
                                'Accept': 'application/json',
                            }
                        }).then((res) => {
                            if (res.data.status == "SUCCESS") {
                                resolve(res.data);
                            } else {
                                var message = window.cmsHattApp.getMessage(res.data);
                                reject({message: message})
                            }
                        }).catch((err) => {
                            reject(err)
                        });
                })
            },
            confirmIntroducer(row){
                var me = this;
                if (me.onSubmit) {
                    return false;
                }
                me.onSubmit = true;
                me.getMessageConfirm().then((getMessage)=>
                {
                    window.cmsHattApp.showConfirm({
                        message: getMessage.response,
                        callback: function (result) {
                            if (result) {
                                var message = '';
                                var api = window.appConfig.api.confirmIntroducer;
                                window.axios({
                                    method: api.method,
                                    url: api.url+'/'+row.id,
                                    data:{idParent:row.id},
                                    headers: {
                                        'Content-type': 'application/json',
                                    }
                                }).then((res) => {
                                    if (res.data.status == "SUCCESS") {
                                        message = window.cmsHattApp.getMessage(res.data);
                                        window.cmsHattApp.showSuccess({message:message});
                                        me.getIntroducers();
                                    }else{
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                                        window.cmsHattApp.showError({message: message});
                                    }
                                }).catch((err) => {
                                    window.cmsHattApp.showError({message: err.message});
                                });
                            }
                        }
                    });

                })

                me.onSubmit = false;
            },
            deleteIntroducer(row){
                var me = this;
                if (me.onSubmit) {
                    return false;
                }
                window.cmsHattApp.showConfirm({
                    message: "Bạn chắc chắn muốn Xóa?",
                    callback: function (result) {
                        if (result) {
                            me.onSubmit = true;
                            var api = window.appConfig.api.deleteIntroducer;
                            window.axios({
                                method: api.method,
                                url: api.url+'/'+row.id,
                                data:{idParent:row.id},
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            }).then((res) => {
                                var message = '';
                                if (res.data.status == "SUCCESS") {
                                    me.getIntroducers();
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Xóa người giới thiệu thành công!";
                                    window.cmsHattApp.showSuccess({message: message});
                                }else{
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                                    window.cmsHattApp.showError({message:message});
                                }
                            }).catch((err) => {
                                window.cmsHattApp.showError(err);
                            });
                            me.onSubmit = false;
                        }
                    }
                })
            }


        },
    }
</script>

<style scoped>

</style>