<template>
    <div class="container">
        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12 col-lg-6">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success active" href="#loginTab" data-toggle="tab">Đăng nhập</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success" href="#registerTab" data-toggle="tab">Đăng ký</a>
                    </li>
                </ul>
                <div class="tab-content py-3 clearfix">
                    <div class="tab-pane  active" id="loginTab">
                        <form action="#" id="form-login" v-on:submit="login($event)">
                            <div class="form-group">
                                <label  class="font-weight-bold">Số điện thoại:</label>
                                <input type="text" v-model="form.phone"  class="form-control" placeholder="Số điện thoại">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Mật khẩu:</label>
                                <input type="password" v-model="form.password"  class="form-control" placeholder="Mật khẩu">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Mã xác nhận:</label>
                                <div class="input-group">
                                    <input type="text" v-model="code" class="form-control " placeholder="Mã xác nhận">
                                    <input type="text" class="form-control disabled" disabled readonly placeholder="XZGR3">
                                </div>
                            </div>
                            <div class="form-group ">
                                <button type="submit" class="btn btn-block btn-success">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane" id="registerTab">
                        <form action="#" v-on:submit="register($event)">
                            <div class="form-group">
                                <label  class="font-weight-bold">Số điện thoại:</label>
                                <input type="text" v-model="form.phone"  class="form-control" placeholder="Số điện thoại">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Họ và tên:</label>
                                <input type="text" v-model="form.fullName"  class="form-control" placeholder="">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Email:</label>
                                <input type="email" v-model="form.email"  class="form-control" placeholder="">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Mật khẩu:</label>
                                <input type="password" v-model="form.password"  class="form-control" placeholder="Mật khẩu">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Mã xác nhận:</label>
                                <div class="input-group">
                                    <input type="text" v-model="code" class="form-control " placeholder="Mã xác nhận">
                                    <input type="text" class="form-control disabled" disabled readonly placeholder="XZGR3">
                                </div>
                            </div>
                            <div class="form-group ">
                                <div class="btn-group btn-block" role="group" aria-label="Basic example">
                                    <button type="submit" class="btn btn-success">Đăng nhập</button>
                                    <button @click="resetForm($event)" class="btn btn-danger">Bỏ qua</button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import router from './../route';
    export default {
        data:function (){
            return {
                form:{phone: "0987654321",
                    fullName: "",
                    email: "",
                    password: "0987654321",},
                form_default:{
                    phone: "0987654321",
                    fullName: "",
                    email: "",
                    password: "0987654321",
                },
                code:"",
                action:'login',
                errors: [],
                onSubmit: false,
            }
        },
        methods:{
            validationForm(){
                this.errors=[];
                if(!this.form.phone){
                    this.errors.push('Bạn chưa nhập số điện thoại!');
                }
                if(!this.form.password){
                    this.errors.push('Bạn chưa nhập password!');

                }
                if(this.errors.length > 0){
                    window.cmsHattApp.showError({
                        message: this.errors.join('\n'),
                    });
                    return false;
                }else{
                    return true;
                }
            },
            resetForm(e){
                e.preventDefault();
                this.form = this.form_default;
            },
            login(e){
                e.preventDefault();
                if (this.onSubmit) {
                    return false;
                }
                if (!this.validationForm('login')) {
                    return false;
                }
                this.onSubmit = true;
                var api = window.appConfig.api.token;
                var data = {
                    'grant_type' : 'client_credentials',
                    'scope' : 'dpa',
                };
                window.axios({
                    method: api.method,
                    url: api.url,
                    data: data,
                    headers:{
                        'Authorization' : "Basic " + btoa(this.form.phone + ":" + this.form.password),
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "SUCCESS"){
                        var token = JSON.parse(res.response);
                        this.$store.dispatch('user/login',token)
                    } else {
                        var message = window.cmsHattApp.getMessage(res.status)??"Có lỗi khi đăng nhập. Vui lòng thử lại!";
                        window.cmsHattApp.showError({
                            message: message,
                            callback: function () {
                                // router.push({'name': "content_manager", 'param': {'type': this.content_type}})
                            }
                        });
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError({
                        message: err.message,
                        callback: function () {
                            // router.push({'name': "content_manager", 'param': {'type': this.content_type}})
                        }
                    });
                });
                this.onSubmit = false;
            },
            register(e){
                e.preventDefault();
                if (this.onSubmit) {
                    return false;
                }
                if (!this.validationForm('register')) {
                    return false;
                }
                this.onSubmit = true;
                var api = window.appConfig.api.register;
                this.form.password = btoa(this.form.password);
                window.axios({
                    method: api.method,
                    url: api.url,
                    data: this.form
                }).then((response) => {
                    var res = response.data;
                    if (res.status == 1) {
                        this.form = res.data;
                    } else {
                        window.cmsHattApp.showError({
                            message: res.message,
                            callback: function () {
                                // router.push({'name': "content_manager", 'param': {'type': this.content_type}})
                            }
                        });
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError({
                        message: err.message,
                        callback: function () {
                            // router.push({'name': "content_manager", 'param': {'type': this.content_type}})
                        }
                    });

                });
                this.onSubmit = false;

            }
        }

    }
</script>

<style scoped>

</style>