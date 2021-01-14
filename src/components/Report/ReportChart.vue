<template>
    <div class="container ">

        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Thống kê</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <router-link :to="{name:'report_chart'}" class="nav-link btn-outline-success active">Biểu đồ <i class="fas fa-chart-pie"></i></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'report_list'}" class="nav-link btn-outline-success ">Danh sách <i class="fas fa-list"></i></router-link>
                    </li>
                </ul>
                <hr>
            </div>
            <div class="col-12 col-lg-8">
                <div v-if="rows_total.length>0">
                    <h4 class="text-center">Tổng sản lượng</h4>
                    <ht-pie-chart :chartdata="chartsTotalData" :options="options" class="mb-5"></ht-pie-chart>
                </div>
                <div v-if="rows.length>0">
                    <div v-for="(chart,index) in chartsData" :key="index" class="mb-5">
                        <h4 class="text-center">{{chart.title}}</h4>
                        <ht-pie-chart :chartdata="chart" :options="options"></ht-pie-chart>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ReportChart",
        data() {
            return {
                rows_total: [],
                rows_total_default: [
                    {
                        "totalQuantity": 100,
                        "state": "TRIAL"
                    },
                    {
                        "totalQuantity": 20,
                        "state": "ACTIVATE"
                    },
                    {
                        "totalQuantity": 10,
                        "state": "PARTNERTS"
                    }
                ],
                rows: [],
                rows_default: [
                    [
                        {
                            "trialCode": "HOA02",
                            "totalQuantity": 1,
                            "tocalCommission": 0,
                            "state": "TRIAL"
                        }
                    ],
                    [
                        {
                            "trialCode": "HOA01",
                            "totalQuantity": 2,
                            "tocalCommission": 537000,
                            "state": "ACTIVATE"
                        },
                        {
                            "trialCode": "HOA01",
                            "totalQuantity": 5,
                            "tocalCommission": 0,
                            "state": "TRIAL"
                        }
                    ]
                ],
                charts: [],
                errors: [],
                backgroundColor: {
                    TRIAL: "rgba(75, 192, 192, 0.2)",
                    ACTIVATE: 'rgba(153, 102, 255, 0.2)',
                    PARTNERTS: 'rgba(255, 159, 64, 0.2)'
                },
                borderColor: {
                    TRIAL: "rgba(75, 192, 192, 1)",
                    ACTIVATE: 'rgba(153, 102, 255, 1)',
                    PARTNERTS: 'rgba(255, 159, 64, 1)'
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                onSubmit: false,
            }
        },
        computed: {
            chartsTotalData() {
                var me = this;
                var data = {
                    labels: [],
                    datasets: [],
                    title: ""
                };
                var dataItem = {
                    label: 'Data One',
                    backgroundColor: [],
                    borderColor: [],
                    data: [],
                    borderWidth: '1px'
                }
                this.rows_total.forEach(function (item) {
                    data.labels.push(me.typeText(item.state));
                    dataItem.backgroundColor.push(window._.get(me.backgroundColor, item.state));
                    dataItem.borderColor.push(window._.get(me.borderColor, item.state));
                    dataItem.label = me.typeText(item.state);
                    dataItem.data.push(item.totalQuantity);
                    dataItem.label = me.typeText(item.state);
                });
                data.datasets.push(dataItem);

                return data;
            },
            chartsData() {
                var chartData = [];
                var me = this;
                this.rows.forEach(function (item) {
                    var data = {
                        labels: [],
                        datasets: [],
                        title: ""
                    };
                    var dataItem = {
                        label: 'Data One',
                        backgroundColor: [],
                        borderColor: [],
                        data: [],
                        borderWidth: '1px'
                    }
                    item.forEach(function (child) {
                        data.title = "Mã " + child.trialCode;
                        data.labels.push(me.typeText(child.state));
                        dataItem.backgroundColor.push(window._.get(me.backgroundColor, child.state));
                        dataItem.borderColor.push(window._.get(me.borderColor, child.state));
                        dataItem.label = child.trialCode;
                        dataItem.data.push(child.totalQuantity)
                    })
                    data.datasets.push(dataItem);
                    chartData.push(data);
                });
                return chartData;
            }
        },
        created() {
            // this.rows = this.rows_default;
            // this.rows_total = this.rows_total_default;
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
                if (type == "PARTNERTS") {
                    return 'Đối tác'
                }
                if (type == "PARTNER") {
                    return 'Đối tác'
                }
                return "";
            },
            fetchData() {
                var me = this;
                if (this.onSubmit) {
                    return false;
                }
                // if (!this.validationForm()) {
                //     return false;
                // }
                this.onSubmit = true;
                var apiTotal = window.appConfig.api.reportChartTotal;
                window.axios({
                    method: apiTotal.method,
                    url: apiTotal.url,
                    data: {},
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        me.rows_total = res.data.response;
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });


                var api = window.appConfig.api.reportChart;
                window.axios({
                    method: api.method,
                    url: api.url,
                    data: {},
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