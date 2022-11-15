// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const elFormQuestion = document.querySelector('.form')
const ul = document.querySelector("ul.discussions__container");
const userName = document.querySelector('#name')
const questionTitle = document.querySelector('#title')
const questionContent = document.querySelector('#story')

// 시간 형식 변경
const convertDate = (dateStr) => {
  // 날짜 형식 옵션
  // const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', dayPeriod: 'long', minute: 'numeric', second: 'numeric'}
  // dateStr = new Intl.DateTimeFormat('ko-kr', options).format(new Date(dateStr))
  dateStr = new Date(dateStr)

  const year = dateStr.getFullYear()
  const month = String(dateStr.getMonth()).padStart(2, '0')
  const day = String(dateStr.getDay()).padStart(2, '0')
  const getDayPeriod = (hour) => {
    if (hour > 12) {
      hour = `오후 ${String(hour - 12).padStart(2, '0')}`
    }
    else {
      hour = `오전 ${String(hour).padStart(2, '0')}`
    }

    return hour
  }
  const hour = getDayPeriod(dateStr.getHours())
  const minute = String(dateStr.getMinutes()).padStart(2, '0')
  const second = String(dateStr.getSeconds()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 아바타 영역 구성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img')
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl
  avatarWrapper.append(avatarImg)

  // 컨텐츠 영역 구성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement('h2')
  discussionTitle.className = 'discussion__title'
  const discussionTitleLink = document.createElement('a')
  discussionTitleLink.href = obj.url
  discussionTitleLink.textContent = obj.title
  discussionTitle.append(discussionTitleLink)
  const discussionInfo = document.createElement('div')
  discussionInfo.className = 'discussion__information'
  const createdAt = convertDate(obj.createdAt)
  discussionInfo.textContent = `${obj.author} / ${createdAt}`
  discussionContent.append(discussionTitle, discussionInfo)
  
  // 답변여부 영역
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const isAnswered = '☑'
  obj?.answer ? discussionAnswered.textContent = '☑' : discussionAnswered.textContent = '☒'
  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// submit 버튼을 눌렀을 때 동작 추가
elFormQuestion.addEventListener('submit', (event) => {
  // block refresh
  event.preventDefault()
  
  const agoraStatesDiscussion = {
    // ToDo: implement feature add id, url, answer
    id: '1',
    createdAt: new Date().toISOString(),
    title: questionTitle.value,
    url: '1',
    author: userName.value,
    answer: null,
    bodyHTML: questionContent.value,
    avatarUrl: './avatar.webp'
  }
  agoraStatesDiscussions.unshift(agoraStatesDiscussion)
  ul.prepend(convertToDiscussion(agoraStatesDiscussion))
  userName.value = ''
  questionTitle.value = ''
  questionContent.value = ''
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);
