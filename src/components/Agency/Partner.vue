<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Đại Lý</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success " href="agency.html">Bạn</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success active" href="your-agency.html">Đối tác của bạn</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success " href="presenter.html">Người giới thiệu bạn</a>
                    </li>
                </ul>
                <div class=" my-3">
                    <form>
                        <div class="form-row d-flex align-items-end">
                            <div class="col">
                                <label class="font-weight-bold">Họ và tên:</label>
                                <input type="text" class="form-control has-datepicker" placeholder="First name">
                            </div>
                            <div class="col">
                                <label class="font-weight-bold">Số điện thoại:</label>
                                <input type="text" class="form-control has-datepicker" placeholder="Last name">
                            </div>
                            <div class="col">
                                <button type="submit" class="btn btn-success">Thêm đối tác</button>
                            </div>
                        </div>
                    </form>
                </div>
                <hr>
            </div>
            <h3 class="text-center">Danh sách các đối tác của bạn</h3>
            <div class="table-responsive">
                <table class="table table-striped table-hover ">
                    <thead class="thead-inverse">
                    <tr>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-success">
                        <td scope="row">1. Nguyễn Thị Kiều Loan</td>
                        <td >090612345</td>
                        <td >Đã xác nhận</td>
                    </tr>
                    <tr class="text-warning">
                        <td scope="row">1. Nguyễn Thị Kiều Loan</td>
                        <td >090612345</td>
                        <td >Chờ xác nhận</td>
                    </tr>
                    <tr class="text-danger">
                        <td scope="row">1. Nguyễn Thị Kiều Loan</td>
                        <td >090612345</td>
                        <td >Không xác nhận</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Partner"
    }
</script>

<style scoped>

</style>