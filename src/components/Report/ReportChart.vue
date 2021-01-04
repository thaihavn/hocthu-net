<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Thống kê</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success " href="report.html">Danh sách <i class="fa fa-list" aria-hidden="true"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success active" href="report-chart.html">Biểu đồ <i class="fa fa-pie-chart" aria-hidden="true"></i></a>
                    </li>
                </ul>
                <div class="report-search my-3">
                    <form>
                        <div class="form-row">
                            <div class="col">
                                <label class="font-weight-bold">Ngày bắt đầu</label>
                                <input type="text" class="form-control has-datepicker" placeholder="First name">
                            </div>
                            <div class="col">
                                <label class="font-weight-bold">Ngày kết thúc</label>
                                <input type="text" class="form-control has-datepicker" placeholder="Last name">
                            </div>
                        </div>
                        <div class="form-row  my-3">
                            <div class="col">
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="daMua">
                                        <label class="form-check-label font-weight-bold" for="daMua">
                                            Đã mua
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="daDungThu">
                                        <label class="form-check-label font-weight-bold" for="daDungThu">
                                            Đã dùng thử
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <hr>
            </div>
            <div class="col-12">
                <h3 class="text-center">Thống kê</h3>
            </div>
            <div class="col-12 col-lg-8">
                <div>
                    <h3 class="text-center">Tổng sản lượng</h3>
                    <canvas id="tongSanLuong" width="100%" height="50"></canvas>
                </div>
                <div>
                    <h3 class="text-center">Theo Mã</h3>
                    <canvas id="theoMa" width="100%" height="50"></canvas>
                </div>
                <div>
                    <h3 class="text-center">Doanh số</h3>
                    <canvas id="doanhSo" width="100%" height="50"></canvas>
                </div>
            </div>
        </div>
        <ul id="menu-bottom" class="nav nav-fill fixed-bottom">
            <li class="nav-item">
                <a class="nav-link active" href="#"> Thống kê</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Đại lý</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Thông tin</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Thông báo</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Phản hồi</a>
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: "ReportChart"
    }
</script>

<style scoped>

</style>