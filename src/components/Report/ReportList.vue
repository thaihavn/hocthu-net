<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Thống kê</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <router-link :to="{name:'report_chart'}" class="nav-link btn-outline-success ">Biểu đồ <i class="fas fa-chart-pie"></i></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'report_list'}" class="nav-link btn-outline-success active">Danh sách <i class="fas fa-list"></i></router-link>
                    </li>
                </ul>
                <div class="report-search my-2">

                    <div class="form-row">
                        <div class="col">
                            <label class="font-weight-bold">Ngày bắt đầu</label>
                            <input type="text" v-model="form.date1" class="form-control has-datepicker" placeholder="dd-mm-yyyy" ref="date1">
                        </div>
                        <div class="col">
                            <label class="font-weight-bold">Ngày kết thúc</label>
                            <input type="text" v-model="form.date2" class="form-control has-datepicker" placeholder="dd-mm-yyyy" ref="date2">
                        </div>
                    </div>
                    <div class="form-row my-2">
                        <div class="col text-center">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="daMua" name="daMua" v-model="form.type" :value="1">
                                <label class="custom-control-label" for="daMua">Đã mua</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="text-center">
                                <button type="submit" class="btn btn-success" @click="fetchData()">Xem báo cáo</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <div class="col-12 col-lg-8">
                <h4 class="text-center">Danh sách</h4>
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead class="thead-inverse">
                        <tr>
                            <th>Điện thoại</th>`
                            <th>Giá</th>
                            <th>Ngày</th>
                            <th>Loại</th>
                            <th>Tên</th>
                            <th>Mã</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="row in rows" :key="row.id">
                            <td>{{row.phone}}</td>
                            <td>{{row.commission}}</td>
                            <td>{{row.date}}</td>
                            <td nowrap>{{typeText(row.type)}}</td>
                            <td nowrap>{{row.fullName}}</td>
                            <td>{{row.trialCode}}</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    // import moment from 'moment'
    export default {
        name: "ReportList",
        data() {
            return {
                rows: [],
                rows_default: [
                    {
                        "id": 4,
                        "fullName": "Nguyen Phuong Dang",
                        "commission": 267000,
                        "date": "31-12-2020",
                        "phone": "0901234567",
                        "type": "ACTIVATE",
                        "trialCode": "HOA01"
                    },
                    {
                        "id": 7,
                        "fullName": "",
                        "commission": 0,
                        "date": "31-12-2020",
                        "phone": "0901234567",
                        "type": "TRIAL",
                        "trialCode": "HOA01"
                    },
                    {
                        "id": 8,
                        "fullName": "",
                        "commission": 0,
                        "date": "31-12-2020",
                        "phone": "0901234567",
                        "type": "TRIAL",
                        "trialCode": "HOA01"
                    },
                    {
                        "id": 5,
                        "fullName": "",
                        "commission": 0,
                        "date": "31-12-2020",
                        "phone": "0901234567",
                        "type": "TRIAL",
                        "trialCode": "HOA01"
                    },
                    {
                        "id": 6,
                        "fullName": "",
                        "commission": 0,
                        "date": "31-12-2020",
                        "phone": "0901234567",
                        "type": "TRIAL",
                        "trialCode": "HOA01"
                    },
                    {
                        "id": 1,
                        "fullName": "Nguyễn Ngọc Hải",
                        "commission": 0,
                        "date": "07-12-2020",
                        "phone": "0945323456",
                        "type": "TRIAL",
                        "trialCode": "HOA01"
                    },
                    {
                        "id": 2,
                        "fullName": "Nguyễn Văn An",
                        "commission": 270000,
                        "date": "07-12-2020",
                        "phone": "9012654867",
                        "type": "ACTIVATE",
                        "trialCode": "HOA01"
                    },
                    {
                        "id": 3,
                        "fullName": "Trần Van Ngọc",
                        "commission": 0,
                        "date": "07-12-2020",
                        "phone": "0967564345",
                        "type": "TRIAL",
                        "trialCode": "HOA02"
                    }
                ],
                form: {
                    date1: null,
                    date2: null,
                    type: "0"
                },
                form_default: {
                    date1: null,
                    date2: null,
                    type: "0"
                },
                errors: [],
                onSubmit: false,
            }
        },
        mounted() {
            var me = this;
            var options = {
                singleDatePicker: true,
                showCalendar: false,
                autoApply: true,
                disabledPast: true,
                enableLoading: true,
                autoUpdateInput:false,
                locale:{
                    format:"DD-MM-YYY"
                }

                // startDate:me.form.date1,
            };
            var options2 = {
                singleDatePicker: true,
                showCalendar: false,
                autoApply: true,
                disabledPast: true,
                enableLoading: true,
                autoUpdateInput:false,
                locale:{
                    format:"DD-MM-YYY"
                }
                // startDate:me.form.date2,
            };

            this.$nextTick(function () {
                window.$(this.$refs.date1).daterangepicker(options).on('apply.daterangepicker',
                    function (ev, picker) {
                        if (!picker.startDate.isValid()) {
                            me.form.date1 = '';
                        }else{
                            me.form.date1 = picker.startDate.format('DD-MM-YYYY');
                        }
                    })
                window.$(this.$refs.date2).daterangepicker(options2).on('apply.daterangepicker',
                    function (ev, picker) {
                        me.form.date2 = picker.startDate.format('DD-MM-YYYY');
                    })
            })
        },
        created() {
            // var currentDate = moment();
            // var start_date = moment().add('-6 ','months');
            // this.form.date1 = start_date.format('DD-MM-YYYY');
            // this.form.date2 = currentDate.format('DD-MM-YYYY');
            // this.rows = this.rows_default;
            this.fetchData();
        },
        methods: {
            typeText(type) {
                if (type == "ACTIVATE") {
                    return 'Đã mua'
                }
                if (type == "TRIAL") {
                    return 'Dùng thử'
                }
                return "";
            },
            validationForm() {
                this.errors = [];
                // if (!this.form.date1) {
                //     this.errors.push('Bạn chưa chọn ngày bắt đầu');
                // }
                // if (!this.form.date2) {
                //     this.errors.push('Bạn chưa chọn ngày kết thúc');
                // }
                // if (this.date2_time < this.date1_time) {
                //     this.errors.push('Ngày kết thúc phải lớn hơn ngày bắt đầu');
                // }
                if (this.errors.length > 0) {
                    window.cmsHattApp.showError({
                        message: this.errors.join('<br>'),
                    });
                    return false;
                } else {
                    return true;
                }
            },

            fetchData() {
                var me = this;
                if (this.onSubmit) {
                    return false;
                }
                if (!this.validationForm()) {
                    return false;
                }
                this.onSubmit = true;
                var api = window.appConfig.api.reportList;
                if (this.form.type) {
                    this.form.type = "1"
                } else {
                    this.form.type = "0"
                }

                window.axios({
                    method: api.method,
                    url: api.url,
                    data: this.form,
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
        },
    }
</script>

<style scoped>

</style>