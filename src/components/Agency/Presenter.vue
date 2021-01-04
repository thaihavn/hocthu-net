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
                        <a class="nav-link btn-outline-success " href="your-agency.html">Đối tác của bạn</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success active" href="presenter.html">Người giới thiệu bạn</a>
                    </li>
                </ul>

            </div>
            <div class="table-responsive my-3">
                <table class="table table-striped table-hover ">
                    <thead class="thead-inverse">
                    <tr>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-success">
                        <td scope="row">1. Nguyễn Thị Kiều Loan</td>
                        <td >090612345</td>
                        <td class="text-right">
                            <div class="btn-group " role="group" aria-label="Basic example">
                                <a  href="#" data-toggle="modal" data-target="#exampleModal" class="btn btn-success">Xác nhận</a>
                                <a  href="#" data-toggle="modal" data-target="#exampleModal" class="btn btn-danger">Xem</a>

                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Xác nhận</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis culpa doloribus, eaque est et facilis harum, laborum minima molestias obcaecati placeat quasi quibusdam quisquam recusandae repudiandae, sequi velit vitae?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Presenter"
    }
</script>

<style scoped>

</style>