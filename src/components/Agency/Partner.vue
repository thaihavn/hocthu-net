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
                        <router-link :to="{name:'partner'}" class="nav-link btn-outline-success active">Đối tác</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'source'}" class="nav-link btn-outline-success">Nguồn</router-link>
                    </li>
                </ul>
                <hr>
                <div class=" my-3">
                    <form v-on:submit="addPartner($event)">
                        <div class="form-row d-flex align-items-end">
                            <div class="col">
                                <label class="font-weight-bold">Họ tên:</label>
                                <input type="text" v-model="form.fullName" class="form-control" placeholder="Họ tên">
                            </div>
                            <div class="col">
                                <label class="font-weight-bold">Điện thoại:</label>
                                <input type="text" v-model="form.phone" class="form-control" placeholder="Điện thoại">
                            </div>
                            <div class="col">
                                <button type="submit" class="btn btn-success">Thêm</button>
                            </div>
                        </div>
                    </form>
                </div>
                <hr>
            </div>
            <div class="table-responsive">
                <h4 class="text-center">Danh sách các đối tác</h4>
                <br>
                <table class="table table-striped table-hover ">
                    <thead class="thead-inverse">
                    <tr>
                        <th>#</th>
                        <th class="text-left">Họ tên</th>
                        <th class="text-left">SĐT</th>
                        <th class="text-center"><span class="text-nowrap">Xác nhận</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr  v-for="(partner,index) in partners" :key="partner.id" v-bind:class="{'text-success':partner.confirm>0 ,'text-warning':partner.confirm==0,'text-danger':partner.confirm=='-1' }">
                        <td scope="row" class="align-middle">{{index+1}}</td>
                        <td class="align-middle"><span class="text-nowrap">{{partner.fullName}}</span></td>
                        <td class="align-middle">{{partner.phone}}</td>
                        <td class="text-center align-middle" v-if="partner.confirm>0"><i class="fa fa-check" title="Đã xác nhận" style="font-size:32px;color:#28a745"></i></td>
                        <td class="text-center align-middle"  v-if="partner.confirm==0"><i class="fa fa-check-circle" title="Chờ xác nhận" style="font-size:32px;color:#ffc107"></i></td>
                        <td class="text-center align-middle"  v-if="partner.confirm<0"><i class="fa fa-close" title="Không xác nhận" style="font-size:32px;color:#dc3545"></i></td>

                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Partner",
        data() {
            return {
                partners:[],
                form:{
                    fullName: "",
                    phone: ""
                },
                form_default:{
                    fullName: "",
                    phone: ""
                },
                errors: [],
                onSubmit: false,
            }
        },
        created() {
            this.getPartners();

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
            getPartners() {
                var me = this;
                var api = window.appConfig.api.getPartners;
                window.axios({
                    method: api.method,
                    url: api.url,
                    data:{},
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        me.partners = res.data.response;
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });
            },
            addPartner(e){
                e.preventDefault();
                if (this.onSubmit) {
                    return false;
                }
                if (!this.validationForm('login')) {
                    return false;
                }
                this.onSubmit = true;
                var api = window.appConfig.api.addPartner;
                window.axios({
                    method: api.method,
                    url: api.url,
                    data:this.form,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        this.form = this.form_default;
                        this.getPartners();
                        window.cmsHattApp.showSuccess({message:res.data.message??"Thêm đối tác thành công!"});
                    }else{
                        var message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                        window.cmsHattApp.showError({message:res.data.message??message});
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });
                this.onSubmit = false;
            },
        },
    }

</script>

<style scoped>

</style>