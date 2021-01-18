<template>
    <div class="container ">

        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Thông Tin</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <router-link :to="{name:'profile'}" class="nav-link btn-outline-success active" >Cá nhân <i class="fas fa-pencil-alt"></i></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'user_bank'}">Tài khoản <i class="fas fa-pencil-alt"></i></router-link>
                    </li>
                </ul>
                <div class="bank-information-form my-3">
                    <form v-on:submit="changePassword($event)">
                        <div class="form-group">
                            <label  class="font-weight-bold">Mật khẩu cũ:</label>
                            <input type="password"  v-model="form.currentPassword" class="form-control" autocorrect="off" autocapitalize="none" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label  class="font-weight-bold">Mật khẩu mới:</label>
                            <input type="password" v-model="form.newPassword" class="form-control" autocorrect="off" autocapitalize="none" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label  class="font-weight-bold">Xác nhận mật khẩu mới:</label>
                            <input type="password" v-model="form.confirmPassword"  class="form-control" autocorrect="off" autocapitalize="none" autocomplete="off">
                        </div>
                        <div class="form-group ">
                            <div class="btn-group btn-block" role="group" aria-label="Basic example">
                                <button type="submit" class="btn btn-success">Cập nhật</button>
                                <router-link :to="{name:'profile'}"  class="btn btn-danger" >Bỏ qua</router-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Password",
        data:function (){
            return {
                form:{
                    currentPassword:"",
                    newPassword: "",
                    confirmPassword: ""
                },
                errors: [],
                onSubmit: false,
            }
        },
        methods: {
            validationForm(){
                this.errors=[];
                if(!this.form.currentPassword){
                    this.errors.push('Bạn chưa nhập password cũ!');
                }
                if(!this.form.newPassword){
                    this.errors.push('Bạn chưa nhập password mới!');
                }
                if(!this.form.confirmPassword){
                    this.errors.push('Bạn chưa nhập lại password mới!');
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
            changePassword(e) {
                e.preventDefault();
                var me = this;
                if (this.onSubmit) {
                    return false;
                }
                if (!this.validationForm()) {
                    return false;
                }
                this.onSubmit = true;
                window.cmsHattApp.showConfirm({
                    message: "Bạn chắc chắn muốn thay đổi?",
                    callback: function (result) {
                        if (result) {
                            me.$store.dispatch('user/changePassword',me.form).then((res) => {
                                var message = '';
                                if (res.data.status == "SUCCESS") {
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Cập nhật thông tin thành công!";
                                    window.cmsHattApp.showSuccess({message:message});
                                    me.$router.push({name:'profile'})
                                }else{
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                                    window.cmsHattApp.showError({message:message});
                                }
                            }).catch((err) => {
                                window.cmsHattApp.showError(err);
                            });
                        }
                    }
                });
                this.onSubmit = false;
            }
        },

    }
</script>

<style scoped>

</style>