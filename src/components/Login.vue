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
                                <input type="text" v-model="form.phone"  class="form-control" placeholder="Số điện thoại"  autocorrect="off" autocapitalize="none" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Mật khẩu:</label>
                                <input type="password" v-model="form.password"  class="form-control" placeholder="Mật khẩu"  autocorrect="off" autocapitalize="none" autocomplete="off">
                            </div>
                            <div class="form-group" v-if="login_fail>=3">
                                <label  class="font-weight-bold">Mã xác nhận:</label>
                                <div class="input-group">
                                    <input type="text" v-model="reCapchaLogin" class="form-control " placeholder="Mã xác nhận">
                                    <input type="text" class="form-control disabled" disabled readonly :placeholder="capchaLogin">
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
                                <input type="text" v-model="form.phone"  class="form-control" placeholder="Số điện thoại" autocorrect="off" autocapitalize="none" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Họ và tên:</label>
                                <input type="text" v-model="form.fullName"  class="form-control" placeholder="" autocorrect="off" autocapitalize="none" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Email:</label>
                                <input type="email" v-model="form.email"  class="form-control" placeholder="" autocorrect="off" autocapitalize="none" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Mật khẩu:</label>
                                <input type="password" v-model="form.password"  class="form-control" placeholder="Mật khẩu" autocorrect="off" autocapitalize="none" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Mã xác nhận:</label>
                                <div class="input-group">
                                    <input type="text" v-model="reCapchaRegister" class="form-control " placeholder="Mã xác nhận" autocorrect="off" autocapitalize="none" autocomplete="off">
                                    <input type="text" class="form-control disabled" disabled readonly :placeholder="capchaRegister">
                                </div>
                            </div>
                            <div class="form-group ">
                                <div class="btn-group btn-block" role="group" aria-label="Basic example">
                                    <button type="submit" class="btn btn-success">Đăng ký</button>
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
                form:{phone: "",
                    fullName: "",
                    email: "",
                    password: "",},
                form_default:{
                    phone: "",
                    fullName: "",
                    email: "",
                    password: "",
                },
                action:'login',
                errors: [],
                onSubmit: false,
                login_fail :0,
                reCapchaLogin:"",
                capchaLogin:window.cmsHattApp.makeCapCha(5),
                reCapchaRegister:"",
                capchaRegister:window.cmsHattApp.makeCapCha(5)
            }
        },
        methods:{
            validationForm(form){
                this.errors=[];
                if(!this.form.phone){
                    this.errors.push('Bạn chưa nhập số điện thoại!');
                }
                if(!this.form.password){
                    this.errors.push('Bạn chưa nhập password!');

                }

                if(this.login_fail >=3 && form =='login'){
                    if(this.reCapchaLogin.toUpperCase() !== this.capchaLogin.toUpperCase()){
                        this.errors.push('Vui lòng nhập capcha chính xác!');
                    }
                }


                if(form =='register'){
                    if(this.reCapchaRegister.toUpperCase() !== this.capchaRegister.toUpperCase()){
                        this.errors.push('Vui lòng nhập capcha chính xác!');
                    }

                    if(!this.form.email){
                        this.errors.push('Bạn chưa nhập email!');
                    }
                    if(!this.form.fullName){
                        this.errors.push('Bạn chưa nhập họ và tên!');

                    }
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
                this.$store.dispatch('user/login',this.form).then(()=>{
                    this.$store.dispatch('user/getNotifyUnread');
                    this.$router.push({name:"report_chart"})
                }).catch((err)=>{
                    this.login_fail++;
                    window.cmsHattApp.showError({message: err.message});
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
                        window.cmsHattApp.showError({message: res.message});
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError({message: err.message});
                });
                this.onSubmit = false;

            }
        }

    }
</script>

<style scoped>

</style>