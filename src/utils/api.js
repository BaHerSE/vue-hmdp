import request from "./request";
export function yzmApi(value) {
    return request.get("/user/yzm?phone=" + value)
}
//登录
export function loginUserApi(value) {
    return request.post('/user/loginUser', value)
}
export function loginAdminApi(value) {
    return request.post('/user/loginAdmin', value)
}
//校验验证码
export function yzApi(phone, code) {
    return request.get("/user/verifyCode?phone=" + phone + "&code=" + code)
}
//重复注册
export function userAgainApi(phone) {
    return request.get("/user/yz?phone=" + phone)
}
//注册
export function createUserApi(user) {
    return request.post("/user/createUser", user)
}
//修改手机号
export function changePhoneApi(phone, code) {
    return request.get("/user/changePhone?phone=" + phone + "&code=" + code)
}
export function getUserByIdApi(id) {
    return request.get('/user/getUserById?id=' + id)
}

export function isUserApi(id) {
    return request.get('/user/isUser?id=' + id)
}
export function isUser() {
    return request.get('/user/isUser?id=' + id)
}
export function isFollowApi(id) {
    return request.get('/Follow/isFollow/' + id)
}
//获取用户基本信息
export function getUserApi() {
    return request.get('/user/getUser')
}
//获取用户详细信息
export function getUserDetailedInfByIdApi(id) {
    return request.get('/user/getUserDetailedInfById?id=' + id)
}
// export function getChangeInfApi(id){
//     return request.get('/user/getChangeInf?id='+id)
// }
export function getChangeInfApi() {
    return request.get('/user/getChangeInf')
}
export function selectQuestionApi(type, value) {
    return request.get('/', {
        params: {
            type, value
        }
    })
}
export function updateUser(value) {
    return request.post('/user/updateUser', value)
}

export function getUserPhoneApi() {
    return request.get('/user/getUserPhone')
}
//获取导演电影推荐
export function getDirectorMovie5Api() {
    return request.get('/Movie/getDirectorMovie5')
}
//根据id获取电影信息
export function getMovieIdApi(value) {
    return request.get('/Movie/MovieId?id=' + value)
}
//根据电影id获取评分信息
export function getScoreByIdApi(value) {
    return request.get('/Score/getScore?movieId=' + value)
}
export function saveBlogApi(blog) {
    return request.post('/Blog/saveBlog', blog)
}
export function getHotMovieListApi() {
    return request.get('/Movie/getHotMovieList')
}
export function getTop10Api() {
    return request.get('/Movie/getTop10')
}
export function getTop5CinecismApi() {
    return request.get('/Blog/getTop5Cinecism')
}
export function upImgTest(file) {
    return request.post('/user/upLoadUserImg', file)
}
export function getBlogListApi(id) {
    return request.get('/Blog/getBlog5ByMid?movieId=' + id)
}
export function getCinecismListApi(id) {
    return request.get('/Blog/getCinecims5ByMid?movieId=' + id)
}
export function getCinecismByUserApi(id) {
    return request.get('/Blog/getCinecismByUser?id=' + id)
}
export function getCinecismByIdApi(id) {
    return request.get('/Blog/getCinecismById?id=' + id)
}
export function getBlogByUserApi(id) {
    return request.get('/Blog/getBlogByUser?id=' + id)
}

export function isWriteBlogApi(id) {
    return request.get('/Blog/isWriteBlog?movieId=' + id)
}
export function isWriteCinecismApi(id) {
    return request.get('/Blog/isWriteCinecism?movieId=' + id)
}
export function searchMovieApi(value) {
    return request.get('/Movie/searchMovie?keyWord=' + value)
}
export function searchMovieMoreApi(value, page, size) {
    return request.get('/Movie/searchMovie?keyWord=' + value + '&page=' + page + '&size=' + size)
}
export function searchCinecismApi(value, page) {
    return request.get('/Blog/searchCinecism?keyWord=' + value + '&page=' + page)
}
export function followUserApi(id) {
    return request.get('/Follow/followUser/' + id)
}
export function getFollowByIdApi(id) {
    return request.get('/Follow/getFollowById?id=' + id)
}
export function getFansByIdApi(id) {
    return request.get('/Follow/getFansById?id=' + id)
}
export function getFriends3Api() {
    return request.get("/Follow/getFriends3")
}
export function delBlogApi(id) {
    return request.get("/Blog/delBlog?id=" + id)
}
export function delCinApi(id) {
    return request.get("/Blog/delCin?id=" + id)
}
export function updateCinecismApi(value) {
    return request.post("/Blog/updateCinecism", value)
}
export function getDiscussByIdApi(id) {
    return request.get("/Discuss/getDiscussById?id=" + id)
}
export function getDiscussMoreByIdApi(id, page, size) {
    return request.get("/Discuss/getDiscussById?id=" + id + '&page=' + page + '&size=' + size)
}
export function sendDiscussApi(value) {
    return request.post("/Discuss/sendDiscuss", value)
}
export function getAllMovieApi() {
    return request.get("/Movie/getAllMovie")
}
export function getAllMovieMoreApi(page) {
    return request.get("/Movie/getAllMovie?page=" + page)
}
export function addMovieApi(movie) {
    return request.post("/Movie/addMovie", movie)
}
export function uploadMovieImageApi(form) {
    return request.post("/Movie/uploadMovieImage", form)
}
export function deleteMovieByIdApi(id) {
    return request.get("/Movie/deleteMovieById?id=" + id)
}

export function getAllUserApi() {
    return request.get("/user/getAllUser")
}
export function getAllUserMoreApi(page) {
    return request.get("/user/getAllUser?page=" + page)
}
export function getAllAdminApi() {
    return request.get("/user/getAllAdmin")
}
export function getAllAdminMoreApi(page) {
    return request.get("/user/getAllAdmin?page=" + page)
}
export function UpdateMovieApi(id, movie) {
    return request.post("/Movie/UpdateMovie?id=" + id, movie)
}
export function uploadAdminApi(id) {
    return request.get("/user/uploadAdmin?id=" + id)
}
export function downloadAdminApi(id) {
    return request.get("/user/downloadAdmin?id=" + id)
}
export function getAllDiscussApi() {
    return request.get("/Discuss/getAllDiscuss")
}
export function getAllDiscussMoreApi(page) {
    return request.get("/Discuss/getAllDiscuss?page=" + page)
}
export function deleteDiscussByIdApi(id) {
    return request.get("/Discuss/deleteDiscussById?id=" + id)
}

export function getAllCinecismApi() {
    return request.get("/Blog/getAllCinecism")
}
export function getAllCinecismMoreApi(page) {
    return request.get("/Blog/getAllCinecism?page=" + page)
}
export function getAllCinecismByMidApi(id, page) {
    return request.get("/Blog/getAllCinecismByMid?id=" + id + "&page=" + page)
}
export function getAllCinecismByMidMoreApi(id, page) {
    return request.get("/Blog/getAllCinecismByMid?id=" + id + "&page=" + page)
}
export function getGenreMovieApi() {
    return request.get("/Movie/getGenreMovie")
}
export function logOutApi() {
    return request.get("/user/logOut")
}
export function getMovieByGenreApi(genre) {
    return request.get("/Movie/getMovieByGenre?genre=" + genre)
}

export function getMovieDiscussById(id) {
    return request.get("/MovieDiscuss/getDiscussById?id=" + id)
}
export function getMovieDiscussByIdMore(id, page) {
    return request.get("/MovieDiscuss/getDiscussById?id=" + id + "&page=" + page)
}
export function sendMovieDiscuss(value) {
    return request.post("/MovieDiscuss/sendMovieDiscuss", value)
}
export function replyApi(value) {
    return request.post("/Reply/sendReply", value)
}
export function getRecommendApi() {
    return request.get("/Movie/getRecommend")
}
export function getUserSearchApi(value) {
    return request.get("/Follow/searchUser?keyWord=" + value)
}
export function getCinecismSearchApi(value) {
    return request.get("/Blog/searchCinecism?keyWord=" + value)
}
export function getMovieVideoPart(id) {
    return request.get("/Movie/getMovieVideoPart?id=" + id)
}
export function getAllMovieVideo(id) {
    return request.get("/Movie/getAllMovieVideo?id=" + id)
}
export function getAllBlog(id, page) {
    return request.get("/Blog/getAllBlog?id=" + id + "&page=" + page)
}
export function getAllBlogByStar(id, page, star) {
    return request.get("/Blog/getAllBlogByStar?id=" + id + "&page=" + page + "&star=" + star)
}
export function getAllCinecismByMidStar(id, page, star) {
    return request.get("/Blog/getAllCinecismByMidStar?id=" + id + "&page=" + page + "&star=" + star)
}
export function getAllCinecismByMidFriend(id, page, friend) {
    return request.get("/Blog/getAllCinecismByMidFriend?id=" + id + "&page=" + page + "&friend=" + friend)
}
export function searchUserByKeyWord(keyWord, page) {
    return request.get("/user/searchUserByKeyWord?keyWord=" + keyWord + "&page=" + page)
}