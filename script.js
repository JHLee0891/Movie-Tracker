const searchData = [];

// API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODgxMjFkOTEzM2FlMGY5NGQ4N2U4MzZlOTYxYjFlMCIsInN1YiI6IjY2MjVkNTg2Y2I1YzhlMDE2NDNmZDM1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aUNmqoFqAHTWUeBHSc8YjpRej1AGkYgjbGFZ4BfISiU'
  }
};

// API data -> result 값 불러오기 -> forEach 메서드를 이용해 item.(값 이름)을 searchEData에 Push
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(res => res.json())
  .then(data => {
    console.log(data.results); //콘솔 로그 (경로)
    // 변수같은 경우 선언 시 대문자는 피한다 (Class 에서는 대문자 사용 가능)
    data.results.forEach(item => {
      // Item List
      movieData(item.id, item.overview, item.poster_path, item.title, item.vote_average);

      searchData.push(item);
    });
    console.log(searchData);
  })
  .catch(err => console.error(err));

// 포맷을 넣을 작업
// const movieData = (매개변수) => {동작};
const movieData = (id, overview, poster_path, title, vote_average) => {
  // Tamplet 하나 완성
  const tamplet = `
  <div class="col">
  <div class="card h-100" onclick="alert('ID: ${id}')">
    <img
      src="https://image.tmdb.org/t/p/w500${poster_path}"
      style="h-70"
      class="card-img-top"
      id="card-img"
      alt="${title}, [Movie ID: ${id}]"
    />
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">
          ${overview}
      </p>
    </div>
    <div class="card-footer">
      <small class="text-body-secondary">평점 ${vote_average}</small>
    </div>
  </div>
</div>
`;
  document.getElementById('row').insertAdjacentHTML('beforeend', tamplet); // 경로 설정, 접근
};

const itemSearch = () => {
  let resultCount = 0;
  // console.log(searchData);
  // search input 접근 input에 입력 된 value를 가져와서 userSearch에 반환
  const userSearch = document.getElementById('search').value;
  // console.log(userSearch);
  document.getElementById('row').replaceChildren();
  searchData.map(item => {
    if (item.title.toLowerCase().indexOf(userSearch.toLowerCase()) !== -1) {
      resultCount++;
      movieData(item.id, item.overview, item.poster_path, item.title, item.vote_average);
    } else {
      console.log();
    }
  });
  // 검색결과가 없을 경우 no
  if (resultCount == 0) {
    document.getElementById('noresults').style.display = 'block';
  } else {
    document.getElementById('noresults').style.display = 'none';
  }
};

// getElementById 해당 id에 대한 HTML 태그 전체를 반환
document.getElementById('searchButton').addEventListener('click', () => {
  itemSearch();
});

const input = document.getElementById('search');

// "Enter" 키 를 누를 경우 버튼 기능 실행 키 추가
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('searchButton').click();
  }
});
