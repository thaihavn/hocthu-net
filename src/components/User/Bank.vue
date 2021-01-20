<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-3">
            <div class="col-12">
                <h3 class="text-center">Hồ sơ</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <router-link :to="{name:'profile'}" class="nav-link btn-outline-success " >Cá nhân <i class="fas fa-user"></i></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'user_bank'}" class="nav-link btn-outline-success active">Tài khoản <i class="far fa-credit-card"></i></router-link>
                    </li>
                </ul>
                <hr>
                <div class="information-form my-3">
                    <h5 class="text-center" >Thông tin tài khoản  <span style="cursor: pointer" v-bind:class="{'canEdit':canEdit}" @click="toggleEdit()"><i class="fas fa-pencil-alt"  style="font-size: 24px"></i></span></h5>
                    <form v-on:submit="updateBankAccount($event)">
                        <div class="form-group">
                            <label  class="font-weight-bold text-success">Số tài khoản:</label>
                            <input type="text" v-model="form.accountNumber"  class="form-control" placeholder="0011000xxxxxxx"  :readonly="!canEdit">
                        </div>
                        <div class="form-group">
                            <label  class="font-weight-bold text-success">Tên chủ tài khoản:</label>
                            <input type="text" v-model="form.owner"  class="form-control" placeholder="Nguyễn Văn A"  :readonly="!canEdit">
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold text-success">Ngân hàng:</label>
                            <select v-model="form.idBank" class="form-control" id="bank"  :disabled="!canEdit">
                                <option v-for="bank in banks" :key="bank.id" :value="bank.id">{{bank.name}}</option>
                            </select>
                        </div>
                        <div class="form-group " v-show="canEdit">
                            <div class="btn-group btn-block" role="group" aria-label="Basic example">
                                <button type="submit" class="btn btn-success">Cập nhật</button>
                                <div @click="toggleEdit()"  class="btn btn-danger" >Bỏ qua</div>

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
        name: "Bank",
        data:function (){
            return {
                form:{
                    accountNumber: null,
                    owner: null,
                    idBank:null
                },
                errors: [],
                canEdit: false,
                onSubmit: false,
            }
        },
        created() {
            if(this.form.accountNumber  == null && this.form.owner == null && this.form.idBank == null ){
                this.canEdit = true
            }
            this.getBankAccount();
            var banks =this.$store.state.user.banks;
            if(banks == null){
                this.$store.dispatch('user/getListBank');
            }
        },
        computed: {
            banks() {
                return this.$store.state.user.banks;
            }
        },
        methods: {
            toggleEdit(){
                var me = this;
                me.canEdit = !me.canEdit;
            },

            validationForm(){
                this.errors=[];
                if(!this.form.accountNumber){
                    this.errors.push('Bạn chưa nhập Số tài khoản!');
                }
                if(!this.form.owner){
                    this.errors.push('Bạn chưa nhập Tên tài khoản!');
                }
                if(!this.form.idBank){
                    this.errors.push('Bạn chưa nhập Ngân hàng!');
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
            updateBankAccount(e) {
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
                            me.$store.dispatch('user/updateBankAccount',me.form).then((res) => {
                                var message = '';
                                if (res.data.status == "SUCCESS") {
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Cập nhật thông tin thành công!";
                                    window.cmsHattApp.showSuccess({message:message});
                                }else{
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                                    window.cmsHattApp.showError({message:message});
                                }
                            }).catch((err) => {
                                window.cmsHattApp.showError(err);
                            });
                        }
                    }
                })
                this.onSubmit = false;
            },
            getBankAccount(){
                var me = this;
                var api = window.appConfig.api.getBankAccount;
                window.axios({
                    method: api.method,
                    url: api.url,
                }).then((response) => {
                    var res = response.data;
                    if(res.response==null){
                      me.canEdit = true
                    }else{
                        me.canEdit = false
                    }
                    if (res.status == "SUCCESS" && res.response!=null) {
                       me.form = res.response;
                    }
                });
            }
        },
    }
</script>

<style scoped>

</style>