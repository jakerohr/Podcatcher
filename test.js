


// var totalTime = 0;
// var playList = [];
// while (totalTime <= userTime) {
//   // loop through filterTime, on each loop push into playList and add duration to totalTime
//   playList.push(filterTime);
//   totalTime += filterTime.audio[0].duration.$text/60;
// }



//  var filterTime = [];
//     var totalTime = 0;
//     var playList = [];
//     for (var i = 0; i < podcasts.list.story.length; i++) {
//       var episodeLength = podcasts.list.story[i].audio[0].duration.$text;
//       if(episodeLength <= userTime * 60){
//         filterTime.push(podcasts.list.story[i])
//       }
//       while (totalTime <= userTime) {
//         // loop through filterTime, on each loop push into playList and add duration to totalTime
//         playList.push(filterTime);
//         totalTime += filterTime.audio[0].duration.$text/60;
//         console.log(totalTime);
//       // console.log(playList);
//         // console.log(podcasts.list.story[i].audio[0].duration.$text)
//       }
//     }



// console.log(test?string.slice(test?string.indexOf('?')));
string = "thisisatest?string"
// console.log(test?string.slice(test?string.indexOf('?')));
console.log(string.slice(0, string.indexOf('?')));
