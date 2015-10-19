function playerDirective(){
  return {
    restrict: 'E',
    replace: 'true',
    templateUrl: "app/directives/video-player/videoPlayer.html",
    scope: {
      mp4: '@',
      translationSrc: '@'
    },
    link: function(scope, element, attributes)
    {
      var htmlVideoTag;
      _init();

      htmlVideoTag.addEventListener("timeupdate",function(){

        var currentMinutes = Math.floor(htmlVideoTag.currentTime / 60);
        var currentSeconds = Math.floor(htmlVideoTag.currentTime - currentMinutes * 60);

        if (currentMinutes < 10) {
          currentMinutes = "0" + currentMinutes;
        }

        if (currentSeconds < 10) {
          currentSeconds = "0" + currentSeconds;
        }

        scope.$apply(function(){
          scope.currentTime = currentMinutes+":"+currentSeconds;
        });

      },false);

      scope.play = function() {
        htmlVideoTag.play();
      };

      scope.pause = function() {
        htmlVideoTag.pause();
      };

      scope.rewind = function() {
        htmlVideoTag.currentTime = 0;
      }

      scope.setPlaybackSpeed = function() {
        htmlVideoTag.playbackRate = scope.playbackSpeed;
      }

      scope.setVolumeLevel = function() {
        htmlVideoTag.volume = scope.savedVolumeLevel = scope.volumeLevel;
      };

      scope.setStartTime = function() {
        htmlVideoTag.currentTime = scope.startTime;
      }

      scope.toggleMute = function()
      {
        (scope.muted == true) ? _mute() : _unmute();
      }

      scope.toggleSubtitles = function() {
        (scope.showSubtitles) ? _showSubtitles() : _hideSubtitles();
      }

      function _mute() {
        htmlVideoTag.volume = scope.volumeLevel = 0;
      }

      function _unmute() {
        htmlVideoTag.volume = scope.volumeLevel = scope.savedVolumeLevel;
      }

      function _showSubtitles() {
        scope.showSubtitles = true;
        htmlVideoTag.textTracks[0].mode = 'showing';
      }

      function _hideSubtitles() {
        scope.showSubtitles = false;
        htmlVideoTag.textTracks[0].mode = 'hidden';
      }

      function _init() {
        htmlVideoTag = element.children("video")[0];
        scope.playbackSpeed = htmlVideoTag.playbackRate = 1;
        scope.savedVolumeLevel = scope.volumeLevel = htmlVideoTag.volume = 1;
        scope.currentTime = "00:00";
        scope.muted = false;
        scope.showSubtitles = true;
        scope.startTime = "";
      }
    }
  };
}