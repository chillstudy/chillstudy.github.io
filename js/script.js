const $ = ( x ) => document.querySelector(x);
const $$ = ( x ) => document.querySelectorAll(x);

const countSong = 2
const toDoListHeader = $('.toDoList__header')
const toDoListNav= $('.toDoList__nav')
const toDoListTime = $('.toDoList-Time')
const btnPlaySong = $('#toDoList-Music-play-btn')
const btnRandomSong = $('#toDoList-Music-Random-btn')
const song = $('#song')
const valueSong = $('#SongVolume')

const app = {
    music: function () {
        let PlayingSong = false;

        const PlaySong = () => {
            if ( song.src == '' ) {
                let indexSong = Math.floor(Math.random() * countSong) + 1;
                song.src = `https://res.cloudinary.com/dnzluhc7k/video/upload/v1645869691/music/${indexSong}.mp3`;
            }
            song.play();
            PlayingSong = true;
            btnPlaySong.innerHTML = `
                Dừng nhạc 
                <div>
                    <ion-icon name="volume-mute-outline"></ion-icon>
                </div>
        `
            btnPlaySong.style.backgroundColor = '#ff7553'
        }

        const PauseSong = () => {
            song.pause();
            PlayingSong = false;
            btnPlaySong.innerHTML = `
                Phát nhạc 
                <div>
                    <ion-icon name="volume-high-outline"></ion-icon>
                </div>
            `
            btnPlaySong.style.backgroundColor = '#5acf73'
        }

        btnPlaySong.onclick = () => {
            if ( PlayingSong ) PauseSong(); else PlaySong();
            song.volume = valueSong.value / 100;
            valueSong.addEventListener('input', function () {
                song.volume = valueSong.value / 100;
            }, false);
        }

        btnRandomSong.onclick = () => {
            let indexSong = Math.floor(Math.random() * countSong) + 1;
            song.src = `https://res.cloudinary.com/dnzluhc7k/video/upload/v1645869691/music/${indexSong}.mp3`;
            PlaySong();
        }

        btnPlaySong.onclick()
    },
    CreateToDoList: function () {
        if (typeof window !== 'undefined') {
            if ( localStorage.getItem('dataToDoList') == null ) {
                
            let htmls = toDoList.map( toDo => {
                let startAndEnd;
                if ( toDo.endTime == '' ) {
                    startAndEnd = `Từ ${toDo.startTime}`
                } else {
                    startAndEnd = `Từ ${toDo.startTime} đến ${toDo.endTime}`
                }
                return `
                    <li class="toDoList__item">
                        <div class="toDoList__item-main">
                            <div class="toDoList__item-mainTitle">
                                <h3>${toDo.name}</h3>
                            </div>
                            <div class="toDoList__item-mainDate">
                                <p> ${startAndEnd} </p>
                            </div>
                        </div>
                        <div class="toDoList__item-checkBox">
                            <div class = "toDoList__item-subCheckBox"></div>
                        </div>
                    </li>`
            })

            localStorage.setItem('dataToDoList' , htmls.join(''))
            } 

            toDoListNav.innerHTML = localStorage.getItem('dataToDoList')
        }
    },
    setTime: function () {
        let Time = new Date();
        let Day = Time.getDate();
        let Month = Time.getMonth() + 1;
        let Year = Time.getFullYear();

        toDoListHeader.innerHTML = `<h1>Thời khóa biểu ngày ${Day}/${Month}/${Year}</h1>`

        const p = (x) => {
            x = x + '';
            if ( x.length == 1 ) {
                x = '0' + x;
            } 
            return x;
        }

        const cmpTime = ( x , y ) => {
            if ( y == '' ) 
                return true;
            for ( let i = 0 ; i < 5 ; ++i ) {
                if ( x[i] > y[i] ) 
                    return true;
                else if ( x[i] < y[i] )
                    return false;
            }
            return true;
        }
        const SubtractionTime = ( x , y ) => {
            let Hours = (+(x[0] + x[1])) - (+(y[0] + y[1]))
            let Minutes = (+(x[3] + x[4])) - (+(y[3] + y[4]))
            if ( Minutes < 0 ) {
                Hours--;
                Minutes += 60;
            }
            return `${p(Hours + '')}:${p(Minutes + '')}`
        }
        let StudyingTime , StudyTime , subTime = [ Time.getHours() , Time.getMinutes() , Time.getSeconds()];
        
        setInterval( function () {
            let toDoItem = $$('.toDoList__item')
            subTime[2]++;
            for ( let i = 2 ; 0 < i ; --i ) {
                if ( subTime[i] > 59 ) {
                    subTime[i] = 0;
                    subTime[i-1]++;
                }
            }
            let RealTime = `${p(subTime[0])}:${p(subTime[1])}:${p(subTime[2])}`

            for (let i = 0; i < toDoItem.length; i++) {
                if ( cmpTime(RealTime , toDoList[i].endTime) ) {
                    toDoItem[i].classList.remove('Studying');
                    toDoItem[i].classList.add('Accomplishment');
                } else {
                    toDoItem[i].classList.add('Studying');
                    StudyingTime = SubtractionTime(RealTime,toDoList[i].startTime)
                    StudyTime = SubtractionTime(toDoList[i].endTime,toDoList[i].startTime)
                    break
                }
            }


            toDoListTime.innerHTML = `
                <h1> Bạn đang thực hiện - ${StudyingTime} / ${StudyTime}</h1>
                <div>
                    <h2 style="text-align: center;">${RealTime}</h2>
                </div>`
        }, 1000)
    },
    start: function () {
        this.music();
        this.CreateToDoList();
        this.setTime()
    }
}

app.start();