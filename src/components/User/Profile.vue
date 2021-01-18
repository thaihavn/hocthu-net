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
                <div class="information my-3 " v-show="user">
                    <p>
                        <b>Số điện thoại:</b> {{user.phone}}
                    </p>
                    <p>
                        <b>Họ và Tên:</b> {{user.fullName}}
                    </p>
                    <p>
                        <b>Email:</b> {{user.email}}
                    </p>
                    <p>
                        <router-link :to="{name:'change_password'}">Đổi mật khẩu</router-link>
                    <h4 class="text-center mb-4">Nơi làm việc</h4>
                    <hr>
                    <div class="information-form my-3">
                        <form v-on:submit="updateProfile($event)">
                            <div class="form-group">
                                <label  class="font-weight-bold">Thuộc Tỉnh/Thành phố:</label>
                                <select class="form-control" v-model="user.idCity">
                                    <option   v-for="city in listCity" :key="city.id" :value="city.id">{{city.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Quận Huyện:</label>
                                <select class="form-control" v-model="user.idDistrict">
                                    <option   v-for="district in listDistrict" :key="district.id" :value="district.id">{{district.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Phường/Xã:</label>
                                <select class="form-control" v-model="user.idWard">
                                    <option   v-for="ward in listWard" :key="ward.id" :value="ward.id">{{ward.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Tên trường học, công ty…:</label>
                                <input type="text" v-model="user.workPlace"  class="form-control" placeholder="">
                            </div>
                            <div class="form-group ">
                                <div class="btn-group btn-block" role="group" aria-label="Basic example">
                                    <button type="submit" class="btn btn-success">Cập nhật</button>
                                    <router-link :to="{name:'report_chart'}"  class="btn btn-danger" >Bỏ qua</router-link>
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
    export default {
        name: "Profile",
        data:function (){
            return {
                user:this.$store.state.user.user,
                errors: [],
                onSubmit: false,
            }
        },
        computed:{
            listCity (){
                return this.$store.state.user.city;
            },
            listDistrict(){
                return this.$store.state.user.district
            },
            listWard(){
                return this.$store.state.user.ward
            }
        },
        created() {
            var district =this.$store.state.user.district;
            var ward =this.$store.state.user.ward;
            this.$store.dispatch('user/getListCity');
            if(this.user.idDistrict && district == null){
                this.$store.dispatch('user/getListDistrict',this.user.idCity);
            }
            if(this.user.idWard && ward == null){
                this.$store.dispatch('user/getListWard',{idCity:this.user.idCity,idDistrict:this.user.idDistrict});
            }
        },
        watch: {
            "user.idCity": function (val) {
                this.$store.dispatch('user/getListDistrict',val);
                this.user.idDistrict =null;
            },
            "user.idDistrict": function (val) {
                this.$store.dispatch('user/getListWard',{idCity:this.user.idCity,idDistrict:val});
                this.user.idWard =null;
            },
        },
        methods: {
            validationForm(){
                this.errors=[];
                if(!this.user.idCity){
                    this.errors.push('Bạn chưa chọn thành phố!');
                }
                if(!this.user.idDistrict){
                    this.errors.push('Bạn chưa chọn Tỉnh thành!');

                }
                if(!this.user.idWard){
                    this.errors.push('Bạn chưa chọn Quận huyện!');

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
            updateProfile(e) {
                e.preventDefault();
                var me = this;
                if (me.onSubmit) {
                    return false;
                }
                if (!me.validationForm()) {
                    return false;
                }
                me.onSubmit = true;

                window.cmsHattApp.showConfirm({
                    message: "Bạn chắc chắn muốn thay đổi?",
                    callback: function (result) {
                        if (result) {
                            var api = window.appConfig.api.updateWorkVenue;
                            window.axios({
                                method: api.method,
                                url: api.url,
                                data:me.user,
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            }).then((res) => {
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
                me.onSubmit = false;


            }
        },


    }
</script>

<style scoped>

</style>