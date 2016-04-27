// home.js

var leagues = {},
  setup = {};

var home = {
  start: function(){
    apiCall.url = searchFile('setup.json');
    apiCall.cb = function(){
      setup.content = JSON.parse( this.responseText );
      setup.default = JSON.parse( atob(setup.content.content) );
      setup.sha = setup.content.sha;
      monitor('setup', '<a href="' + repo.home + '/setup">edit</a>');
      home.checkLeagues();
    };
    apiCall.err = function(){
      if(repo.type == 'org' && user.type == 'owner') monitor('warning','no setup, <a href="' + repo.home + '/setup/">create</a>'); else monitor('error','no setup');
    };
    apiCall.call();
  },
  checkLeagues: function(){
    apiCall.url = searchFile('leagues/leagues.json');
    apiCall.cb = function(){
      leagues.content = JSON.parse( this.responseText );
      apiCall.data = '';
      leagues.obj = JSON.parse( atob(leagues.content.content) );
      monitor('leagues', '<a href="' + repo.home + '/league/setup">create</a>');
    };
    apiCall.err = function(){
      if(repo.type == 'org' && user.type == 'owner') monitor('warning','no leagues, <a href="' + repo.home + '/league/setup/">create</a>'); else monitor('error','no leagues');
    };
    apiCall.call();
  }
};

var start = home.start();