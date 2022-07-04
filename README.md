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
(GET) /moviesSeries/movies/upcoming- to get upcoming movies

(GET) https://image.tmdb.org/t/p/original/{filepath} - to get any image