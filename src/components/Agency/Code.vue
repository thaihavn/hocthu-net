<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-3">
            <div class="col-12">
                <h3 class="text-center">Đại Lý</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <router-link :to="{name:'code'}" class="nav-link btn-outline-success active">Bạn</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'partner'}" class="nav-link btn-outline-success ">Đối tác</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'source'}" class="nav-link btn-outline-success">Nguồn</router-link>
                    </li>
                </ul>
                <div class=" my-3">
                    <hr>
                    <form v-on:submit="addCode($event)">
                        <div class="form-row d-flex align-items-end">
                            <div class="col">
                                <label class="font-weight-bold">Tài khoản:</label>
                                <input type="text" v-model="form.trialCode" class="form-control" placeholder="Tài khoản">
                            </div>
                            <div class="col">
                                <label class="font-weight-bold">Mật khẩu:</label>
                                <input type="text" v-model="form.password" class="form-control" placeholder="123456" readonly>
                            </div>
                            <div class="col">
                                <button type="submit" class="btn btn-success">Thêm</button>
                            </div>
                        </div>
                    </form>
                    <hr>
                </div>
            </div>
            <div class="table-responsive">
                <h4 class="text-center">Danh sách mã truy cập</h4><br>
                <table class="table table-striped table-hover table-sm ">
                    <thead class="thead-inverse">
                    <tr>
                        <th>Mã truy cập</th>
                        <th>Mật khẩu</th>
                        <th class="text-center">Hành động</th>
                    </tr>
                    </thead>
                    <tbody >
                    <tr v-for="code in codes" :key="code.id">
                        <td scope="row">{{code.trialCode}}</td>
                        <td >{{code.password}}</td>
                        <td class="text-right">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a type="button" @click="removeCode(code)" class="btn btn-danger">Xóa</a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Code",
        data() {
            return {
                codes: {},
                form:{
                    trialCode: "",
                    password: "123456"
                },
                form_default:{
                    trialCode: "",
                    password: "123456"
                },
                code:"",
                errors: [],
                onSubmit: false,
            }
        },
        created() {
            this.getCodes();

        },
        methods: {
            validationForm(){
                this.errors=[];
                if(!this.form.trialCode){
                    this.errors.push('Bạn chưa nhập code!');
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

            getCodes() {
                var me = this;
                var api = window.appConfig.api.getCodes;
                window.axios({
                    method: api.method,
                    url: api.url,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        me.codes = res.data.response;
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });
            },
            addCode(e){
                e.preventDefault();
                if (this.onSubmit) {
                    return false;
                }
                if (!this.validationForm()) {
                    return false;
                }
                this.onSubmit = true;
                var api = window.appConfig.api.addCode;
                window.axios({
                    method: api.method,
                    url: api.url,
                    data:this.form,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    var message = '';
                    if (res.data.status == "SUCCESS") {
                        this.form = this.form_default;
                        this.getCodes();
                        message = window.cmsHattApp.getMessage(res.data) ?? "Thêm mã truy cập thành công!";
                        window.cmsHattApp.showSuccess({message:message});
                    }else{
                        message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                        window.cmsHattApp.showError({message:message});
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });
                this.onSubmit = false;
            },
            removeCode(code){
                var me = this;
                if (me.onSubmit) {
                    return false;
                }
                window.cmsHattApp.showConfirm({
                    message: "Bạn chắc chắn muốn Xóa?",
                    callback: function (result) {
                        if (result) {
                            me.onSubmit = true;
                            var api = window.appConfig.api.deleteCode;
                            window.axios({
                                method: api.method,
                                url: api.url+'/'+code.id,
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            }).then((res) => {
                                var message ='';
                                if (res.data.status == "SUCCESS") {
                                    me.getCodes();
                                    message = window.cmsHattApp.getMessage(res.data)??"Xóa mã truy cập thành công!";
                                    window.cmsHattApp.showSuccess({message:message});
                                }else if(res.data.status =='TRIAL_CODE_NOT_FOUND'){
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