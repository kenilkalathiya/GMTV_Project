# summer-project
Movie/Series tracking WebApp

# APIs
URL: http://165.232.181.83:8000

(POST) /loginSignup/login - to login user (body: email, password)
(POST) /loginSignup/signup - to signup user (body: email, password, name)

(GET) /moviesSeries/movies/top-rated - to get top-rated movies
(GET) /moviesSeries/series/top-rated - to get top-rated series
(GET) /moviesSeries/movies/trending - to get trending movies
(GET) /moviesSeries/series/trending - to get trending series
(GET) /moviesSeries/movies/upcoming - to get upcoming movies
(GET) /moviesSeries/movies/getmovie/{movieID} - to get movie details from ID
(GET) /moviesSeries/series/getseries/{tvID}- to get series details from ID

(GET) /moviesSeries/search/{query} - to get search result

# bearer token required in below APIs
(GET) /user/userInfo/{userID} - to get user info
(GET) /user/tracking/{userID} - to get tracking info of user
(POST) /user/updatePhoto/{userID} - to update profile photo (body: profileImg)
(POST) /user/tracking/{userID} - to upload tracking info (body: userID(string), msID(string), media_type(string), addedDate(string), backdrop_path(string), seasons(num), last_seasons_episodes(num))

(GET) https://image.tmdb.org/t/p/original/{filepath} - to get any image