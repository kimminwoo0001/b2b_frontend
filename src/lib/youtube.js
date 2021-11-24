var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady(video) {
  window['onYouTubeIframeAPIReady'] = (e) => {
    const YT = window['YT'];
    const reframed = false;
    const player = new window['YT'].Player('player', {
      videoId: video,
      width: '1440',
      height: '860',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerStateChange,

      }
    });
  };
}


function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data === window.YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  //player.stopVideo();
}

export default onYouTubeIframeAPIReady;