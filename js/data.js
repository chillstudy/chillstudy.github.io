const Time = new Date();
let Day = Time.getDate();
let Month = Time.getMonth() + 1;
let Year = Time.getFullYear();
const countDays = ( d , m , y = 2022 , d1 = 27 , m1 = 2 , y1 = 2022 ) => {
    const DaysOf = ( x , y , z ) => {
        let Days = [ 0 , 31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];
        if (( z % 4 == 0 && z % 100 != 0 ) || ( z % 400 == 0 )) {
            Days[2]++;
        }
        let c = 0;
        for ( let i = 1 ; i < y ; ++i ) {
            c += Days[i];   
        }
        return c + x;
    } 

    return ((DaysOf(d,m,y) - DaysOf(d1,m1,y1)));
}


let Subject = [
    {
        Subject1: 'Ôn tập , học môn Toán - Chuyên',
        Subject2: 'Ôn tập , học môn  Anh'
    },
    {
        Subject1: 'Ôn tập , học môn Toán',
        Subject2: 'Ôn tập , học môn Văn'
    }
]

const swap = ( index ) => {
    let t = Subject[index].Subject1;
    Subject[index].Subject1 = Subject[index].Subject2;
    Subject[index].Subject2 = t;
}

let indexDay = countDays(Day,Month) % 2;

if ( countDays(Day,Month) > 1 ) {
    swap(1 - indexDay)
}


let toDoList = [
    {
        startTime: '05:00',
        endTime: '06:30',
        name: 'Học thuộc + Chép văn'
    },
    {
        startTime: '06:30',
        endTime: '',
        name: 'Ăn sáng chuẩn bị đi học'
    },
    {
        startTime: '07:15',
        endTime: '11:30',
        name: 'Học trên trường'
    },
    {
        startTime: '11:30',
        endTime: '13:30',
        name: 'Cơm nước ngủ trưa'
    },
    {
        startTime: '13:45',
        endTime: '16:45 / 17:00',
        name: 'Học trên trường'
    },
    {
        startTime: '17:20',
        endTime: '17:30',
        name: 'Tập thể dục '
    },
    { 
        startTime: '17:30',
        endTime: '17:45',
        name: 'Tắm rửa'
    },
    {
        startTime: '17:45',
        endTime: '18:00',
        name: 'Ăn tối'
    },
    {
        startTime: '18:15 / 18:30',
        endTime: '21:00',
        name: `${Subject[indexDay].Subject1}`
    },
    {
        startTime: '21:00',
        endTime: '21:15',
        name: 'Làm bài tập Anh'
    },
    {
        startTime: '21:20 / 21:30',
        endTime: '23:00',
        name: `${Subject[indexDay].Subject2}`
    },
    {
        startTime: '23:00',
        endTime: '23:15',
        name: 'Giải trí'
    },
    {
        startTime: '23:15 / 23:20',
        endTime: '',
        name: 'Đi ngủ'
    }
]




// localStorage.clear()