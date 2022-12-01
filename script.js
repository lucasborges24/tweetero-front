let _username = '';

class SignUp {
  constructor() {
    this.loadTweets = new LoadTweets();
  }

  signup(username, avatar) {
    console.log(username);
  axios
      .post("http://localhost:5001/sign-up", {
      username,
        avatar,
    })
    .then(() => {
      _username = username;
        this.loadTweets.loadTweets();
    })
      .catch((err) => {
      console.error(err);
        alert("Erro ao fazer cadastro! Consulte os logs.");
    });
}
}

function loadTweets() {
  axios.get('http://localhost:5001/tweets').then(res => {
    const tweets = res.data;
    let tweetsHtml = '';

    for (const tweet of tweets) {
      tweetsHtml += `
        <div class="tweet">
          <div class="avatar">
            <img src="${tweet.avatar}" />
          </div>
          <div class="content">
            <div class="user">
              @${tweet.username}
            </div>
            <div class="body">
              ${escapeHtml(tweet.tweet)}
            </div>
          </div>
        </div>
      `;
    }

    document.querySelector('.tweets').innerHTML = tweetsHtml;
    document.querySelector('.pagina-inicial').classList.add('hidden');
    document.querySelector('.tweets-page').classList.remove('hidden');
  });
}

class PostTweet {
  constructor() {
    this.loadTweets = new LoadTweets();
  }

  async postTweet(tweet) {
    try {
      await axios.post("http://localhost:5001/tweets", {
      username: _username,
        tweet,
      });
      document.querySelector("#tweet").value = "";
      this.loadTweets.loadTweets();
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer tweet! Consulte os logs.");
    }
  }
}

document
  .querySelector(".btn-enviar")
  .addEventListener("click", () =>
    signUp.signup(
      document.querySelector("#username").value,
      document.querySelector("#username").value
    )
  );
document
  .querySelector(".btn-enviar-tweet")
  .addEventListener("click", () =>
    postTweet.postTweet(document.querySelector("#tweet").value)
  );
