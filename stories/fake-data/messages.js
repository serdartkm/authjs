export const fakeMessages=[{datetime: 1569393960355, side:"right", message:"hello", letter:"D", order:"F", local:true,dateSpace:true},
{datetime: 1569393960355, side:"left", message:"hi", letter:"D", order:"F", local:false,dateSpace:false},
{datetime: 1569393960355, side:"left", message:"what are you doing", letter:"D", order:"S", local:false,dateSpace:false},

{datetime: 1569393960355, side:"right", message:"I am reading a book", letter:"D", order:"F", local:true,dateSpace:false},
{datetime: 1569393960355, side:"right", message:"What are you doing", letter:"D", order:"S", local:true,dateSpace:false},
{datetime: 1569393960355, side:"left", message:"I am sining a song", letter:"D", order:"F", local:false,dateSpace:true},
]
export default [
{ message: "hello dragos 1", local: true, from: "mario", to: "dragos", datetime: new Date("Wed, 27 July 2019 07:45:00 GMT").getTime() },
{ message: "hello mario 2", local: false, from: "dragos", to: "mario", datetime: new Date("Wed, 27 July 2019 07:46:00 GMT").getTime() },
{ message: "what are you diong today 3", local: false, from: "dragos", to: "mario", datetime: new Date("Wed, 27 July 2019 07:47:00 GMT").getTime() },

{ message: "I am reading a book 4", local: true, from: "mario", to: "dragos", datetime: new Date("Wed, 27 July 2019 07:48:00 GMT").getTime() },
{ message: "What are you doing 5", local: true, from: "mario", to: "dragos", datetime: new Date("Wed, 27 July 2019 07:49:00 GMT").getTime() },

{ message: "I am watching a movie 6", local: false, from: "dragos", to: "mario", datetime: new Date("Wed, 28 July 2019 07:47:00 GMT").getTime() },
{ message: "See you tomorrow 7", local: false, from: "dragos", to: "mario", datetime: new Date("Wed, 28 July 2019 07:48:00 GMT").getTime() },
{ message: "See you 8", local: true, from: "mario", to: "dragos", datetime: new Date("Wed, 28 July 2019 07:49:00 GMT").getTime() },
]