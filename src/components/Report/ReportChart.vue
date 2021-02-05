<template>
    <div class="container">

        <div class="row align-items-center justify-content-center my-3">
            <div class="col-12">
                <h3 class="text-center">Báo cáo</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <router-link :to="{name:'report_chart'}" class="nav-link btn-outline-success active">Tổng hợp <i class="fas fa-chart-pie"></i></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'report_list'}" class="nav-link btn-outline-success ">Chi tiết <i class="fas fa-list"></i></router-link>
                    </li>
                </ul>
                <hr>
            </div>

        </div>
        <div class="row justify-content-center" v-if="rows_total.length>0">
            <h4 class="text-center col-12">Tổng sản lượng</h4>
            <ht-pie-chart :chartdata="chartsTotalData" :options="options" class="col-lg-6 col-12" :styles="{height: '250px'}"></ht-pie-chart>
            <div class="col-12">
                <hr>
            </div>
        </div>
        <div class="row justify-content-center" v-if="rows_revenue.length>0">
            <h4 class="text-center col-12">Tổng Doanh thu</h4>
            <ht-pie-chart :chartdata="chartsRevenueData" :options="options" class="col-lg-6 col-12" :styles="{height: '250px'}"></ht-pie-chart>
            <div class="col-12">
                <hr>
            </div>
        </div>
        <div v-show="rows.length>0" v-for="(chart,index) in chartsData" :key="index" class="row justify-content-center">
            <h4 class="text-center col-12">{{chart.title}}</h4>
            <ht-pie-chart :chartdata="chart" :options="options" class="col-lg-6 col-12" :styles="{height: '250px'}"></ht-pie-chart>
            <div class="col-12">
                <hr>
            </div>
        </div>
    </div>
</template>

<script>

    // import {Pie} from "vue-chartjs";

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
                rows_default: [[{"reportCode": "HOA02", "total": "1", "type": "Học thử"}], [{"reportCode": "HOA01", "total": "1", "type": "Đã mua"}, {"reportCode": "HOA01", "total": "1", "type": "Học thử"}]],
                rows_revenue: [],
                rows_revenue_default: [{"reportCode": null, "total": "2403000", "type": "Bạn"}, {"reportCode": null, "total": "614100", "type": "Đối tác"}],
                charts: [],
                errors: [],
                backgroundColor: {
                    TRIAL: "rgba(75, 192, 192, 0.2)",
                    ACTIVATE: 'rgba(153, 102, 255, 0.2)',
                    PARTNERTS: 'rgba(255, 159, 64, 0.2)',
                    hocThu: "rgba(75, 192, 192, 0.2)",
                    daMua: 'rgba(153, 102, 255, 0.2)',
                    cuaBan: 'rgba(153, 102, 255, 0.2)',
                    doiTac: 'rgba(255, 159, 64, 0.2)'
                },
                borderColor: {
                    TRIAL: "rgba(75, 192, 192, 1)",
                    ACTIVATE: 'rgba(153, 102, 255, 1)',
                    PARTNERTS: 'rgba(255, 159, 64, 1)',
                    hocThu: "rgba(75, 192, 192, 1)",
                    daMua: 'rgba(153, 102, 255, 1)',
                    cuaBan: 'rgba(153, 102, 255, 1)',
                    doiTac: 'rgba(255, 159, 64, 1)',
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontColor: "white",
                            // fontSize: 18
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var index = tooltipItem.index;
                                var number = data.datasets[0].dataFormat[index];
                                var label = data.labels[index] || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += number || '';
                                return label;
                            }
                        }
                    }
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
                    dataFormat: [],
                    borderWidth: '1'
                }
                this.rows_total.forEach(function (item) {
                    var string = item.type.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    var background =  window._.get(me.backgroundColor, window._.camelCase(string));
                    var border = window._.get(me.borderColor, window._.camelCase(string))
                    if (typeof item.bgColor != 'undefined' && typeof item.bgRatio != 'undefined') {
                        var ratio = item.bgRatio * 100;
                        background = item.bgColor + (ratio!=100?ratio:'');
                    }
                    if (typeof item.borderColor != 'undefined' && typeof item.borderRatio != 'undefined') {
                        ratio = item.borderRatio * 100;
                        border = item.borderColor + (ratio!=100?ratio:'');
                    }
                    data.labels.push(item.type);
                    dataItem.backgroundColor.push(background);
                    dataItem.borderColor.push(border);
                    dataItem.label = item.type;
                    dataItem.data.push(item.totalNumber);
                    dataItem.dataFormat.push(item.total);
                    dataItem.label = item.type;
                });
                data.datasets.push(dataItem);

                return data;
            },
            chartsRevenueData() {
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
                    dataFormat: [],
                    borderWidth: '1'
                }
                this.rows_revenue.forEach(function (item) {
                    var string = item.type.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    var background =  window._.get(me.backgroundColor, window._.camelCase(string));
                    var border = window._.get(me.borderColor, window._.camelCase(string))
                    if (typeof item.bgColor != 'undefined' && typeof item.bgRatio != 'undefined') {
                        var ratio = item.bgRatio * 100;
                        background = item.bgColor + (ratio!=100?ratio:'');
                    }
                    if (typeof item.borderColor != 'undefined' && typeof item.borderRatio != 'undefined') {
                        ratio = item.borderRatio * 100;
                        border = item.borderColor + (ratio!=100?ratio:'');
                    }
                    data.labels.push(item.type);
                    dataItem.backgroundColor.push(background);
                    dataItem.borderColor.push(border);
                    dataItem.label = item.type;
                    dataItem.data.push(item.totalNumber);
                    dataItem.dataFormat.push(item.total);
                    dataItem.label = item.type;
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
                        dataFormat: [],
                        borderWidth: '1'
                    }
                    item.forEach(function (child) {
                        var string = child.type.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        var background =  window._.get(me.backgroundColor, window._.camelCase(string));
                        var border = window._.get(me.borderColor, window._.camelCase(string))
                        if (typeof child.bgColor != 'undefined' && typeof child.bgRatio != 'undefined') {
                            var ratio = child.bgRatio * 100;
                            background = child.bgColor + (ratio!=100?ratio:'');
                        }
                        if (typeof child.borderColor != 'undefined' && typeof child.borderRatio != 'undefined') {
                             ratio = child.borderRatio * 100;
                            border = child.borderColor + (ratio!=100?ratio:'');
                        }
                        data.title = "Mã " + child.reportCode;
                        data.labels.push(child.type);
                        dataItem.backgroundColor.push(background);
                        dataItem.borderColor.push(border);
                        dataItem.label = child.reportCode;
                        dataItem.data.push(child.totalNumber)
                        dataItem.dataFormat.push(child.total);
                    })
                    data.datasets.push(dataItem);
                    chartData.push(data);
                });
                return chartData;
            }
        },
        created() {

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
                var apiRevenue = window.appConfig.api.reportChartRevenue;
                window.axios({
                    method: apiRevenue.method,
                    url: apiRevenue.url,
                    data: {},
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        me.rows_revenue = res.data.response;
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });


                var api = window.appConfig.api.reportChartCode;
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
    /*.chart-container{*/
    /*    max-width: 70vw;*/
    /*}*/
</style>