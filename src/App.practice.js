import {useState} from "react";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  return (
    <div>
      <h1> {counter} </h1>
      <button onClick = {onClick}>click me</button>
    </div>
  );
}

// 버튼이 눌릴 때마다 counter 상태가 변화, state가 변경되니 매번 렌더링
// 그러니까 첫 번째 render에만 코드가 실행되고, 
// 다른 state 변화에는 실행되지 않도록 해보자!

// ex) API를 통해 데이터를 가져올 때,
// 첫번째 component render에서 API를 call하고,
// 이후 state가 변화할 때, 그 API에서 데이터를 또다시 가져오지는 않을 거자나
// 그러니까 특정 코드들이, 첫 번째 component render에서만 실행되게 하고
// 즉 처음 한 번만 실행되게 하고,
// 나중에 state가 변화해도, 그 코드는 다시 실행되지 않도록 해 보자!

// 해결방법 : useEffet 사용

function App() {
    const [counter, setValue] = useState(0);
    const onClick = () => setValue((prev) => prev + 1);
    console.log("I run all the time");
    useEffect(()=> {
      console.log("CALL THE API...");
    }, []);
    return (
      <div>
        <h1> {counter} </h1>
        <button onClick = {onClick}>click me</button>
      </div>
    );
}

// useEffect : 두 개의 인자를 갖는 함수.
// 첫번째 인자 : 우리가 딱 한 번만 실행하고 싶은 코드
// 두번째 인자 : 마법같은 인자......
  
// 위처럼 하면, 결과창에 Call the API는 한 번만 출력되고
// 버튼을 클릭할 때마다 all the time이 출력되는 것을 알 수 있음.
  
// 즉, useEffect는 우리 코드가 딱 한 번만 실행될 수 있도록 보호해줌.

  
// 그럼 이제 검색 API를 위해 useEffect를 사용해 보자

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState(""); //
    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value); //
    console.log("I run all the time");
    useEffect(()=> {
        console.log("CALL THE API...");
    }, []);
    console.log("Search For", keyword) //
    return (
        <div>
        <input                    //
            value = {keyword}
            onChange = {onChange}
            type = "text"
            placeholder="Search here.."
        />
        <h1> {counter} </h1>
        <button onClick = {onClick}>click me</button>
        </div>
    );
}
  
// state를 클릭할 때마다 검색 API를 매번 호출하지는 않아야 함.
// search keyword에 변화가 있을때만 검색할 수 있도록!
// 근데 이 상태로는 counter가 변화할 때에도 계속 검색함.
// click me를 누르고 counter가 1씩 증가할 때, 
// 콘솔 창에서는 계속 search for가 출력된다는 소리
  
// 이제, 내 코드의 특정 부분만이 변화했을 때,
// 원하는 코드만 실행할 수 있도록 하고 싶음.
// 즉, movie state가 변화할 때만 user가 원하는 영화를 검색하고 싶다는 것.

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);
    console.log("I run all the time");
    useEffect(()=> {
      console.log("CALL THE API...");
    }, []);
    useEffect(()=> {                        //
      console.log("Search For", keyword);
    },[]);
    
    return (
      <div>
        <input 
          value = {keyword}
          onChange = {onChange}
          type = "text"
          placeholder="Search here.."
        />
        <h1> {counter} </h1>
        <button onClick = {onClick}>click me</button>
      </div>
    );
}

// 근데 그냥 이렇게만 하면 한번 실행되고 끝나니까

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);
    console.log("I run all the time");
    useEffect(()=> {
      console.log("CALL THE API...");
    }, []);
    useEffect(()=> {
      console.log("Search For", keyword);
    },[keyword]); 
    // keyword가 변화할 때 코드를 실행하고 싶을 때, 이 자리에 keyword를 써줌
    // [] 안의 요소가 변화할 때 코드를 실행할 거라고 react.js에게 알려주는 것.
    // 이것이 바로 위의 빈 array를 써줬을 때 코드가 단 한 번만 실행되는 이유임!
    
    return (
      <div>
        <input 
          value = {keyword}
          onChange = {onChange}
          type = "text"
          placeholder="Search here.."
        />
        <h1> {counter} </h1>
        <button onClick = {onClick}>click me</button>
      </div>
    );
  }


// 그래도 아직, 예를 들어 movie를 검색하고 싶을 때
// m부터 mo,mov,movi,movie 전부 검색하기 때문에,
// 조건 추가

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);
    console.log("I run all the time");
    useEffect(()=> {
      console.log("CALL THE API...");
    }, []);
    useEffect(()=> {
      if(keyword !== "" && keyword.length > 5) { // 단어 길이가 5 이상일 때 검색
        console.log("Search For", keyword);
      }
    },[keyword]); 
    return (
      <div>
        <input 
          value = {keyword}
          onChange = {onChange}
          type = "text"
          placeholder="Search here.."
        />
        <h1> {counter} </h1>
        <button onClick = {onClick}>click me</button>
      </div>
    );
}
  

// 구별!

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);
    useEffect(()=>{
      console.log("I run only once.");
    }, []);
    useEffect(()=>{
      console.log("I run when 'keyword' changes.");
    }, [keyword]); 
    useEffect(()=>{
      console.log("I run when 'counter' changes.");
    }, [counter]);
    useEffect(()=>{
      console.log("I run when keyword & counter change."); // 합집합
    }, [keyword, counter]);
    return (
      <div>
        <input 
          value = {keyword}
          onChange = {onChange}
          type = "text"
          placeholder="Search here.."
        />
        <h1> {counter} </h1>
        <button onClick = {onClick}>click me</button>
      </div>
    );
}


/// CleanUp

function Hello() {
    useEffect(()=> {
      console.log("Im here!");
    },[]);
  
    return <h1>Hello</h1>;
  }
  
  function App() {
    const [showing, setShowing] = useState(false);
    const onClick = () => setShowing((prev) => !prev);
  
    return (
      <div>
        {showing ? <Hello /> : null}
        <button onClick = {onClick}>
          {showing ? "Hide" : "Show"}
        </button>
      </div>
    );
}
  
export default App;
  
// 이렇게 해 주면, component를 hide 해줄 때 아예 destroy 시킴.

// 근데 react.js는 component가 destroy될 때도 코드를 실행할 수 있음.

// create 시에 useEffect 함수를 사용하는 것처럼 
// destroy 시에도 함수를 사용해보자!

function Hello() {
    useEffect(()=> {
      console.log("Created  :)");
      return () => console.log("destroyed :(");
    },[]);
  
    return <h1>Hello</h1>;
}

// 이렇게 하면 생성 시와 삭제 시에 콘솔창에 출력되는 것을 볼 수 있음.
// 즉, 언제 생성되고 언제 삭제됐는지를 알 수 있다는 것.

function Hello() {
    function byFn() {
      console.log("bye :(");
    }
    function hiFn() {
      console.log("hi :)");
      return byFn;
    }
    useEffect(hiFn, []);
  
    return <h1>Hello</h1>;
}

// 이렇게 하면, 컴포넌트 생성 시와 삭제 시에, 함수를 이용해 콘솔창에 출력 가능
// 근데 실전에서는 cleanup function이 많이 사용되지 않음.
// byFn이 많이 사용되지 않는다는 것. 

// 그리고 보통 사람들은 저렇게 function ...() {} 이런 형식보다는
// useEffect 내부에 작성을 많이 함!

function Hello() {
    useEffect(()=>{
      console.log("hi :)");
      return() => console.log("bye :(");
    }, []);
  
    return <h1>Hello</h1>;
}

// 똑같음 걍 이렇게 쓰셈ㅇㅇ




/////// Todo List

function App() {
    const [toDo, setToDo] = useState("");
    const onChange = (event) => setToDo(event.target.value);
    const onSubmit = (event) => {
      event.preventDefault();
      if (toDo === "") {
        return; // toDo가 비어있다면, 그냥 return
      } 
      setToDo("") // submit 하면 input을 다시 비워주기.
      // setToDo는 toDo값을 수정하는 함수이고, toDo 값은 input과 연결되어 있음.
      // 그래서 toDo값을 변경하면 input값도 변경되는 것임.
    };
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input 
            onChange={onChange}
            value={toDo}
            type="text"
            placeholder="Write your to do..."
          />
          <button>Add To do</button>
        </form>
      </div>
    );
}


// Todos array

function App() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]); // 여러 toDo들을 받을 수 있는 array
    const onChange = (event) => setToDo(event.target.value);
    const onSubmit = (event) => {
      event.preventDefault();
      if (toDo === "") {
        return;
      } 
      setToDo("");
      // toDos.push() : 일반적 JS에서라면 이렇게 했을 테지만,
      // 우리는 state를 직접적으로 수정할 수 없다는 걸 기억해야 함!
      // 그래서 toDo = "" 이런 식도 불가능함. 직접 수정 불가.
      // 대신에 함수를 이용해 toDo를 수정하는 역할을 시키는 것임.
      // 그러니까 toDos array를 수정하고 싶다면, 그 역할을 하는 함수를 사용해야 함.
      setToDos(currentArray => [toDo, ...currentArray])
      // state는 언제나 새로운 것이어야 함.
      // 그러니까 state에 있는 새로운 toDo와, 직전까지의 toDos array를 이용해
      // 새로운 toDos array를 만드는 것.
    };
  
    return (
      <div>
        <h1> My To Dos ({toDos.length //{} 없이 쓰면 그냥 html임. JS 사용하려면 {} 쓰기! 
                                      })</h1>
        <form onSubmit={onSubmit}>
          <input 
            onChange={onChange}
            value={toDo}
            type="text"
            placeholder="Write your to do..."
          />
          <button>Add To do</button>
        </form>
      </div>
    );
}


// map

function App() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]); 
    const onChange = (event) => setToDo(event.target.value);
    const onSubmit = (event) => {
      event.preventDefault();
      if (toDo === "") {
        return;
      } 
      setToDo("");
      setToDos(currentArray => [toDo, ...currentArray])
    };
  
    return (
      <div>
        <h1> My To Dos ({toDos.length})</h1>
        <form onSubmit={onSubmit}>
          <input 
            onChange={onChange}
            value={toDo}
            type="text"
            placeholder="Write your to do..."
          />
          <button>Add To do</button>
        </form>
        <hr />
        <ul>
          {toDos.map((item, index) => (   // map 함수 사용
            <li key = {index}> {item} </li> //key에 사용하기 위한 고유 값을 위해 index 사용
          ))}
        </ul>
      </div>
    );
}




//// Coin Tracker


function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]); // 여기에 기본값 []를 지정해주지 않으면
    // error가 뜸! 왜냐하면 component의 시작인 coins가 맨 처음에 undefined이고,
    // undefined는 length를 가지고 있지 않기 때문에,
    // return의 <h1> 안에 있는 coins.length를 수행할 수 없으므로.
  
    useEffect(() => {
      fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => {
          setCoins(json);
          setLoading(false);
        });
    }, []);
  
    return(
      <div>
        <h1> The Coins! {loading ? "" : `(${coins.length})`//로딩 중에는 안 나오도록!
                                                        } </h1>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select>
            {coins.map((coin) => ( // 여기서는 key 나 index가 필요 없음.
            // 데이터 자체에 고유한 id가 있어서 구분 가능하므로!
              <option //JS를 쓰고 싶으면 꼭 {} 쓰기!
              >
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
  

  // Coin Traker Challenge

  import {useState, useEffect} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]); 
  const [amount, setAmount] = useState(0);

  const onChange = (event) => {
    setAmount(event.target.value);
  }

  const reset = () => setAmount(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return(
    <div>
      <h1> The Coins! {loading ? "" : `(${coins.length})` } </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => ( 
            <option>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))
          }
        </select>
        )}
      <div>
        <label htmlFor ="Dollars">Dollars</label>
        <input  
          value = {amount}  
          placeholder="Dollars" 
          type="number" 
          onChange={onChange} 
        /> 
      </div>
      <div>
        <label htmlFor = "BitCoins">BitCoins</label>
        <input  
          value = {amount/40834.91700354039}  
          placeholder="BitCoins" 
          type="number" 
        /> 
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}


//// Movie App part 1


function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    )
    .then((response) => response.json())
    .then((json) => {
      setMovies(json.data.movies)
      setLoading(False) // 로딩을 끝냈기 때문에, setLoading을 false로 놓기!
    });
  }, []);
  return(
    <div>
      {loading ? <h1>Loading...</h1> : null} 
      {//원래 movies를 넣어 주어야 하지만 지금은 불러오지 않았으므로 일단 null
      }
    </div>
  );
}


// 요즘은 .then보다 async-await 을 많이 사용!

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  
  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    );

    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return(
    <div>
      {loading ? <h1>Loading...</h1> : null}
    </div>
  );
}

// 이렇게 하면 보기 더 좋지롱

// 더 나아가면, 
// 이렇게 await안에 await를 넣어서 사용함!

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  
  const getMovies = async () => {
    const json = await(
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return(
    <div>
      {loading ? <h1>Loading...</h1> : null}
    </div>
  );
}

// 화면에 표시

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  
  const getMovies = async () => {
    const json = await(
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies); // 얘랑 
    setLoading(false); // 얘 때문에, consol.log 했을 때 두 번씩 출력됨.
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);

  return(
    <div>
      {loading ? (
        <h1>Loading...</h1> 
      ) : (
        <div>
          {movies.map(movie => (
            <div key = {movie.id}>
               <img src={movie.medium_cover_image} />
              <h2>{movie.title}</h2>
              <p>{movie.summary}</p>
              <ul>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li> // array 속에서 g가 고유한 값인 한, key로 사용 가능
                ))}
              </ul>
            </div>
          ))} 
        </div>
      // array 안의 내용들을 화면에 출력하기 위해 map() 사용!
      // 즉, 화면에 출력되는 component들은,
      // movies array 안에 있는 각 movie에서 변형되어 나온 것!
      // map 사용 시 항상 key가 필요하다는 것 잊지 말자!
      )}
    </div>
  );
}

/// 페이지 이동, 링크 구현


// Movie.js 컴포넌트 생성

function Movie({medium_cover_image, title,summary, genres}) { // props
  return (
      <div>
          <img src={medium_cover_image} alt={title}/> 
          {//img 요소에는 alt 를 작성하는 것이 좋음!
          }
          <h2>{title}</h2>
          <p>{summary}</p>
          <ul>
              {genres.map((g) => (
              <li key={g}>{g}</li> 
              ))}
          </ul>
      </div>
  );
}

// App.js로부터 받아와야 하는 movie, 
// 받아와야 하는 movie의 부속 데이터들이자 정의되지 않은
// medium_cover_image, title, summary, genres는 
// App.js에서처럼 바로 사용할 수 없으므로 

// 따라서 현재 component가 부모 component로부터 받아오도록,
// props를 사용해 부속 데이터들을 정의해주고,
// App.js에서 Movie를 컴포넌트로 렌더링해줌!


<div>
    {movies.map(movie => (
        <Movie
          key = {movie.id} //movie를 컴포넌트로 렌더링할 때도
          // map 함수를 사용하는 한 
          // key 지정을 꼭 해줘야 함!
          coverImg = {movie.medium_cover_image}
          title = {movie.title}
          summary = {movie.summary}
          genres = {movie.genres}
        />
    ))} 
</div>

// App.js 에서 이렇게 바꿔줌!


// Movie.js에

import PropTypes from "prop-types"; // 어떤 props를 가지고 있는지 알기 위해 사용

Movie.propTypes = {
  coverImg : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
  summary : PropTypes.string.isRequired,
  genres : PropTypes.arrayOf(PropTypes.string).isRequired,
};

// 이렇게 추가해줌!


// React Router 리액트 라우터
// 페이지를 전환!

// component 폴더를 만들어 그 안에 Movie.js 를 위치시키고
// routes 폴더를 만들어 Detail.js, Home.js를 만들고
// 현재까지의 App.js의 내용들을 Home.js에 붙여넣고
// App.js는 일단 초기화해둠.
// 이렇게

function App() {
  return null;
}

function Detail() {
  return <h1>Detail</h1>;
}

import {useState, useEffect} from "react";
import Movie from "./component/Movie.js";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  
  const getMovies = async () => {
    const json = await(
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies); 
    setLoading(false); 
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);

  return(
    <div>
      {loading ? (
        <h1>Loading...</h1> 
      ) : (
        <div>
          {movies.map(movie => (
            <Movie
              key = {movie.id} 
              coverImg = {movie.medium_cover_image}
              title = {movie.title}
              summary = {movie.summary}
              genres = {movie.genres}
            />
          ))} 
        </div>
      )}
    </div>
  );
}


//// React Router

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/movie" element = { <Detail />}/>
      </Routes>
    </Router>
  );
}

// Router를 가장 먼저 렌더링. 
// 그 안에 들어가는 것들은, 유저가 있는 url에 따라 유저에게 보여주고 싶은 것들.
// Routes 는, 한 번에 하나의 Route만 렌더링하기 위함.
// React Router에서는, 개발자가 원한다면 두 개의 Route를 한 번에 렌더링 가능하므로.

// 한 Route에서 다른 Route로 이동하기 위해서는,
// HTML 환경이었다면 <a href=... /> 를 이용하면 됐겠지만,
// 이 경우 페이지가 새로고침되므로 별로 좋지 않음.

// 이것을 해결하기 위한 컴포넌트가 <Link />
// 브라우저 새로고침 없이도 유저를 다른 페이지로 이동시켜주는 컴포넌트!

// 그래서 movie.js에 import {Link} from "react-router-dom"; 를 해주고
// <Link to = "/movie"> {title} </Link> 를 추가해줌.



//// 동적 URL, 다이나믹 url. Parameters
// url에 변수를 넣을 수 있다는 의미


// Route path에 /:id를 추가해 주면, id에 따라 url도 바뀌고 화면 내용도 바뀜.
// 단, Movie 컴포넌트에 id가 필요하게 됨. url로 출력해야 하므로.

// 근데 현재 Movie 컴포넌트의 props에는 id가 없으므로,
// Movie 컴포넌트의 부모 요소를 살펴봐야 함. Home 컴포넌트.

// Home.js 안에서, <Movie /> 안에 id = {movie.id} 를 추가해주면,
// Movie.js에서 id를 props로 받을 수 있게 됨!

// 그리고 Movie.propTypes에 id : PropTypes.number.isRequired, 도 추가
// 또 <Link to = {`/movie/${id}`}> {title} </Link> 로 변경!

// 이후에 Detail.js 에서 useParams를 이용, React Router로부터 변수의 값을 받음. (id)

import { useParams } from "react-router-dom";

function Detail() {
    const id = useParams();
    console.log(id);
    return <h1>Detail</h1>;
}

// 이렇게!

// 이렇게 해서 id를 받아오면, 그걸로 API에 요청을 보내기만 하면 됨. fetch 사용.

// await는 async 함수 내부가 아니면 사용할 수 없다는 것 기억하기!
// 그래서 Detail() 함수 내부에 getMovie라는 async 함수를 또 만들어줌.

function Detail() {
  const id = useParams();
  const getMovie = async() => {
      const json = await(
          await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      console.log(json);
  };
  useEffect(() => {
      getMovie();
  },[]);
  return <h1>Detail</h1>;
}

// 이렇게!
// 이제 이후에, 받아온 json을 활용해 화면에 출력해주도록 하면 됨.
// Home.js처럼, 보여주고 싶은 정보들을 출력하면 됨!


//// Styles

// css 적용, 
// 홈페이지에서의 영화 줄거리 최대 길이 설정을 해보자! 너무 길면 안 되니까.

//Movie.js 파일에서
<p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>

// 이렇게 수정해 줌! 최대 길이 235를 넘으면, 0부터 235까지 자르고, 
// 넘지 않으면 그냥 줄거리 출력. slice는 시작과 끝의 값을 필요로 함.


//// Breaking Change




