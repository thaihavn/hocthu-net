<template>
    <div class="container">
        <div class="row align-items-center justify-content-center my-3">
            <div class="col-12">
                <h3 class="text-center">Đại lý</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <router-link :to="{name:'code'}" class="nav-link btn-outline-success ">Bạn <i class="far fa-smile"></i></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'partner'}" class="nav-link btn-outline-success active">Đối tác <i class="fas fa-hand-holding-usd"></i></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'source'}" class="nav-link btn-outline-success">Kênh <i class="far fa-handshake"></i></router-link>
                    </li>
                </ul>
                <hr>
                <div class=" my-3">
                    <form v-on:submit="addPartner($event)">
                        <div class="form-row d-flex align-items-end">
                            <div class="col">
                                <label class="font-weight-bold text-success">Họ tên:</label>
                                <input type="text" v-model="form.fullName" class="form-control" placeholder="Họ tên">
                            </div>
                            <div class="col">
                                <label class="font-weight-bold text-success">Điện thoại:</label>
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
                <div class="col-12">
                    <h4 class="text-center">Danh sách đối tác</h4>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover text-white">
                            <thead class="thead-inverse">
                            <tr class="text-success">
                                <th>#</th>
                                <th class="text-left">Họ tên</th>
                                <th nowrap class="text-left">Điện thoại</th>
                                <th class="text-center"><span class="text-nowrap">Xác nhận</span></th>
                                <th class="text-center"><span class="text-nowrap">Xóa</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr  v-for="(partner,index) in partners" :key="partner.id" class="text-white align-middle">
                                <td scope="row" class="align-middle">{{index+1}}</td>
                                <td><span class="text-nowrap">{{partner.fullName}}</span></td>
                                <td nowrap class="">{{partner.phone}}</td>
                                <td class="text-center" v-if="partner.confirm>0"><i class="fa fa-check" title="Đã xác nhận" style="font-size:24px;color:#28a745"></i></td>
                                <td class="text-center"  v-if="partner.confirm==0"><i class="fa fa-check-circle" title="Chờ xác nhận" style="font-size:24px;color:#ffc107"></i></td>
                                <td class="text-center"  v-if="partner.confirm<0"><i class="fas fa-minus-circle" title="Không xác nhận" style="font-size:24px;color:#dc3545"></i></td>
                                <td class="text-center">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" @click="removePartner(partner)" class=" text-danger"><i class="fas fa-times" style="font-size:24px"></i></a>
                                    </div>
                                </td>

                            </tr>

                            </tbody>
                        </table>
                    </div>
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
                    var message = '';
                    if (res.data.status == "SUCCESS") {
                        this.form = this.form_default;
                        this.getPartners();
                         message = window.cmsHattApp.getMessage(res.data) ?? "Thêm đối tác thành công!";
                        window.cmsHattApp.showSuccess({message:message});
                    }else{
                         message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                        window.cmsHattApp.showError({message:res.data.message??message});
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });
                this.onSubmit = false;
            },
            removePartner(partner){
                var me = this;
                if (me.onSubmit) {
                    return false;
                }
                window.cmsHattApp.showConfirm({
                    message: "Bạn chắc chắn muốn Xóa?",
                    callback: function (result) {
                        if (result) {
                            me.onSubmit = true;
                            var api = window.appConfig.api.removePartner;
                            window.axios({
                                method: api.method,
                                url: api.url+'/'+partner.id,
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            }).then((res) => {
                                var message ='';
                                if (res.data.status == "SUCCESS") {
                                    me.getPartners();
                                    message = window.cmsHattApp.getMessage(res.data)??"Xóa đối tác thành công!";
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