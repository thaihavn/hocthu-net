<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Đại Lý</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success active" href="agency.html">Bạn</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success " href="your-agency.html">Đối tác của bạn</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success " href="presenter.html">Người giới thiệu bạn</a>
                    </li>
                </ul>
                <div class=" my-3">
                    <form>
                        <div class="form-row d-flex align-items-end">
                            <div class="col">
                                <label class="font-weight-bold">Mã truy cập:</label>
                                <input type="text" class="form-control has-datepicker" placeholder="First name">
                            </div>
                            <div class="col">
                                <label class="font-weight-bold">Mật khẩu:</label>
                                <input type="text" class="form-control has-datepicker" placeholder="Last name">
                            </div>
                            <div class="col">
                                <button type="submit" class="btn btn-success">Thêm mã</button>
                            </div>
                        </div>
                    </form>
                </div>
                <hr>
            </div>
            <h3 class="text-center">Danh sách mã học thử của bạn</h3>
            <div class="table-responsive">
                <table class="table table-striped table-hover table-sm ">
                    <thead class="thead-inverse">
                    <tr>
                        <th>Mã truy cập</th>
                        <th>Mật khẩu</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td scope="row">HOA01</td>
                        <td >123456</td>
                        <td class="text-right">
                            <div class="btn-group " role="group" aria-label="Basic example">
                                <a type="button" href="#" class="btn btn-danger">Xóa</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">HOA01</td>
                        <td >123456</td>
                        <td class="text-right">
                            <div class="btn-group " role="group" aria-label="Basic example">
                                <a type="button" href="#" class="btn btn-danger">Xóa</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">HOA01</td>
                        <td >123456</td>
                        <td class="text-right">
                            <div class="btn-group " role="group" aria-label="Basic example">
                                <a type="button" href="#" class="btn btn-danger">Xóa</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">HOA01</td>
                        <td >123456</td>
                        <td class="text-right">
                            <div class="btn-group " role="group" aria-label="Basic example">
                                <a type="button" href="#" class="btn btn-danger">Xóa</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">HOA01</td>
                        <td >123456</td>
                        <td class="text-right">
                            <div class="btn-group " role="group" aria-label="Basic example">
                                <a type="button" href="#" class="btn btn-danger">Xóa</a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Agency"
    }
</script>

<style scoped>

</style>