
var title = document.querySelector('header h2');
var img_cur = document.querySelector('.cd .cd-thumb');
var audio = document.querySelector('#audio');
var btn_play = document.querySelector('.btn-toggle-play');
var player = document.querySelector('.player');
var btn_pre = document.querySelector('.btn-prev');
var btn_next = document.querySelector('.btn-next');
var restart = document.querySelector('.btn-repeat');
var input_progress = document.querySelector('#progress');
var btn_random = document.querySelector('.btn-random');
var app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name : 'À Lôi',
            singer: '2T',
            img: "./css/img/img1.jpg",
            music: "./css/video/song1.mp3"
        },  
        {
            name : 'Ghé Qua',
            singer: 'Dick',
            img: "./css/img/img2.jpg",
            music: "./css/video/song2.mp3"
        },  
        {
            name : 'Những Bức Tranh Màu',
            singer: 'Long Cao',
            img: "./css/img/img3.jpg",
            music: "./css/video/song3.mp3"
        },  
        {
          name : 'Tại Vì Sao',
          singer: 'MCK',
          img: "./css/img/img4.jpg",
          music: "./css/video/song4.mp3"
      },  
      {
        name : 'See You Again',
        singer: 'Charlie Puth',
        img: "./css/img/img5.jpg",
        music: "./css/video/song5.mp3"
    },   
    {
      name : 'Ai Đưa Em Về',
      singer: '1NG',
      img: "./css/img/img6.jpg",
      music: "./css/video/song6.mp3"
  },    
    ],
    render: function() {
        var i = 1;
        const html = this.songs.map(song => {
            return `
            <div class="song" onclick="clickChange(${i++})">
            <div class="thumb" style="background-image: url('${song.img}')">
          </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        });
        document.querySelector('.playlist').innerHTML =  html.join('');
    },
    handleEvent: function() {
      // Xu li scroll
        document.onscroll = function() {
              var oldWidth = document.querySelector('.cd').offsetWidth;
              var scrollTop = window.scrollY;
              
              document.querySelector('.cd').style.width = (200 - scrollTop) > 0 ? (200 - scrollTop) : 0   +'px';
              document.querySelector('.cd').style.opacity = (oldWidth - scrollTop) / oldWidth;
            }

        // Xu li play
            btn_play.onclick = function() {
                if(app.isPlaying) {
                  audio.pause();
                }
                else {
                audio.play();
                }
            }
            // Khi được play 
            audio.onplay = function() {
              app.isPlaying = true;
              player.classList.add('playing');
            }
            // Khi bị pause
            audio.onpause = function() {
              app.isPlaying = false;
              player.classList.remove('playing');
            } 


    }, 
    getCurrentSong: function() {
        return this.songs[this.currentIndex];
    },
    loadCurrentSong: function() {
      var song = this.getCurrentSong();
      title.textContent = `${song.name}`;
      img_cur.style.backgroundImage = `url('${song.img}')`
      audio.src = song.music;
    },
    stopLoad: function() {
        app.isPlaying = false;
        player.classList.remove('playing');
    }
    , 
    changeSong: function() {
      var arrlength = this.songs.length - 1;

      //  Chuyen bai hat ke tiep
      btn_next.onclick = function()  {
        app.isPlaying = false;
        player.classList.remove('playing');
        if(app.currentIndex === arrlength) {
          app.currentIndex = 0 ;
        }
        else {
          app.currentIndex++;
        }
        app.loadCurrentSong();
      }
      // Chuyen bai hat truoc do
      btn_pre.onclick = function() {
        app.stopLoad();
        if(app.currentIndex === 0) {
            app.currentIndex = arrlength;
        }
        else {
            app.currentIndex--;
        }
        app.loadCurrentSong();
        // console.log(app.currentIndex);
      }
    },
    clicktoChange: function() {
        function clickChange(idx) {
            app.currentIndex = idx - 1;
            app.loadCurrentSong();
        }
    },
    progressMusic: function() {
          audio.addEventListener('loadedmetadata',function() {
              input_progress.max = audio.duration;
          })
          audio.addEventListener('timeupdate',function() {
              input_progress.value = audio.currentTime;
              console.log(audio.currentTime);
          })
          input_progress.addEventListener('input',function() {
              audio.currentTime = input_progress.value;
          })
    },
    clickRestart: function() {
          restart.onclick = function() {
            audio.currentTime =0;
          }
    }
    ,
    btnGetRanDom: function() {
        btn_random.onclick = function() {
          // console.log(1)
           app.songs = shuffleArray(app.songs);
           app.currentIndex = 0; 
           app.stopLoad();
           app.render();
           app.loadCurrentSong();
        }
    } 
    ,
    start : function() {
      this.handleEvent();

      this.loadCurrentSong();

      this.render();

      this.changeSong();

      this.progressMusic();

      this.clicktoChange();

      this.clickRestart();

      this.btnGetRanDom();
    }   
}
function clickChange(idx) {
  app.stopLoad();
  console.log(idx);
  app.currentIndex = idx - 1;
  app.loadCurrentSong();
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);
app.start();