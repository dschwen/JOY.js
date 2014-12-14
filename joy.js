var game = new Phaser.Game(320, 240, Phaser.AUTO, '', { preload: preload, create: create, update: update }, false, false);

JOY = {
  state: {
    inventar: Array(24),
    flag: Array(70),
    verb: Array(16),
    geg: Array(255),
    transport: Array(255),
    //raum: Array(26),
    zurueck: Arary(26),
    betreten: Array(26),
    person: Array(20),    // room number each person is in
    personen: Array(10),  // list of portraits displayed up top
    reden: Array(20),
    invent: Array(24),
    raumaddierer: Array(26),
    c: Array(9),
    name: Array(11),
    score: Array(11),
    handlung: Array(6),
    frage: Array(11), antwort: Array(10), ja: Array(10), nein: Array(10),
    erscheinen: Array(11), alterscheinen: Array(11),
    rtext: Array(11),
    fahrx: Array(9), fahry: Array(9),
    gespeichert: Array(10),
    feld: Array(4),// 16),
    stat: Array(7), graus: Array(160), y: Array(10),
    scr: Array(10), scr2: Array(10),
    str: Array(10),
    rl: Array(54),// 133),
    kurve: Array(33),// 69),
    lrand: Array(54), breite: Array(54),
    objekt: Array(54), obj: Array(10), mitte: Array(10),
    hausx: Array(10), hausy: Array(10),
    sperrex: Array(10), sperrey: Array(10),
    mikrox: Array(10), mikroy: Array(10),
    keksx: Array(10), keksy: Array(10),
    baumx: Array(10), baumy: Array(10),
    omax: Array(10), omay: Array(10),
    zones: [[],[],[],[]],           // current clickable zones per screen

    raum: 1,
    raum2: 0
  },

  // parser state
  verb: 0,
  benutze: 0,
  pers: 0,
  geg1: 0,
  gehe: 0,

  // AMOS state
  screen: 0,

  // Raum routinen
  initRaum: [],
  raumFunc: [],

  // assets
  ereignis: []
};

// Load all game assets
function preload() {
  var i;

  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  game.scale.setScreenSize();
  game.scale.setResizeCallback(resize, this);
  game.stage.smoothed = false;

  game.load.bitmapFont('font_times', 'assets/fonts/Times.png', 'assets/fonts/Times.xml');
  game.load.bitmapFont('font_joy', 'assets/fonts/JOY.png', 'assets/fonts/JOY.xml');
  //game.load.bitmapFont('font_joy2', 'assets/fonts/JOY2.png', 'assets/fonts/JOY2.xml');

  // JSON assets
  game.load.json('texte', 'assets/texteDeutsch/text.json');
  game.load.json('zones', 'assets/texteDeutsch/zones.json');

  // graphic assets
  for (i = 0; i < 20; ++i) {
    game.load.sprite('gesicht_' + i, 'assets/grafiken/Gesichter.' + i + '.png');
  }
  for (i = 0; i < 34; ++i) {
    game.load.sprite('icons3_' + i, 'assets/grafiken/Icons3Deutch.' + i + '.png');
  }

  // Raum assets
  var raumBobNum = {
    "1":13, "10":0, "11":1, "12":3, "13":2, "14":7, "15":11, "16":0, "17":5, "18":1,
    "19":4, "2":9, "20":16, "21":0, "22":0, "23":0, "24":5, "25":0, "26":1, "3":25,
    "4":14, "5":2, "6":14, "7":3, "8":6
  }
  for (var r in raumBobNum)
    if(raumBobNum.hasOwnProperty(r)) {
      for(i = 0; i <= raumBobNum[r]; ++i) {
        game.load.sprite('raum_' + r + '_bob_'+ i, 'assets/grafiken/Raum' + r + '.Bobs.' + i + '.png');
      }
      game.load.sprite('raum_' + r, 'assets/grafiken/Raum' + r + '.Pic.png');
    }
  game.load.sprite('raum_5_1', 'assets/grafiken/Raum5_1.Pic.png');
  game.load.sprite('raum_11_1', 'assets/grafiken/Raum11_1.Pic.png');
}


function switchScreen(s)
{
  JOY.screen = s;
}

function mouseScreen()
{
  // which of the three screen sections (personen, raum, befehle) did the user click
  return 0;
}

function testScreen()
{
  switch (mouseScreen())
  {
    case 0:
      switchScreen(0);
      mz = Mouse Zone
      JOY.geg = JOY.state.raumaddierer[JOY.state.raum - 1 ] + mz;
      if (JOY.geg == JOY.state.raumaddierer[JOY.state.raum - 1]) {
        JOY.geg = 0;
      }
      break;

    case 1:
      switchScreen(1);
      mz = Mouse Zone
      if (mz > 4) {
        JOY.geg = JOY.state.inventar[mz - 4];
      } else {
        JOY.geg = 0;
      }
      break;

    case 3;
      switchScreen(3);
      mz = Mouse Zone
      JOY.geg = 0;
      pers = JOY.state.personen[mz];
      break;
  }
}

// implementierung aller Raum routinen
JOY.initRaum[1] = function()
{
  if (JOY.state.raum2 > 3) {
     JOY.state.flag[1] = 1
  }
  if (JOY.state.transport[2] == 1) {
     if (JOY.state.flag[1] = 0 || JOY.state.flag[1] = 2) {
        switchScreen(2);
        Bob 2 , 54 , 41 , 3
        switchScreen(0);
        Set Zone 2 , 50 , 39 To 61 , 51
     } else {
        switchScreen(2);
        Bob 14 , 49 , 0 , 4
        switchScreen(0);
        Set Zone 2 , 61 , 20 To 67 , 30
     }
  } else {
     if (JOY.state.flag[1] == 1) {
        switchScreen(2);
        Bob 14 , 49 , 0 , 8
     }
  }
  if (JOY.state.transport[5] == 1) {
     switchScreen(2);
     Bob 5 , 305 , 34 , 5
     switchScreen(0);
     Set Zone 5 , 306 , 33 To 316 , 47
  }
  if (JOY.state.flag[5] == 0) {
     switchScreen(2);
     Bob 16 , 282 , 0 , 7
     switchScreen(0);
     Set Zone 18 , 281 , 0 To 319 , 54
  } else {
     switchScreen(0);
     Set Zone 16 , 281 , 0 To 319 , 54
  }
  if (JOY.state.flag[3] == 1 && JOY.state.flag[4] = 1 && ( JOY.state.handlung[2] = 0 || JOY.state.handlung[2] = 3 )) {
     switchScreen(2);
     Bob 6 , 136 , 81 , 6
  }
  if (JOY.state.handlung[2] > 0 && JOY.state.handlung[2] < 3) {
     switchScreen(2);
     Bob 6 , 136 , 81 , 9
  }
  if (JOY.state.flag[2] = 0) {
     if (JOY.state.transport[8] = 1) {
        switchScreen(2);
        Bob 8 , 57 , 123 , 2
        switchScreen(0);
        Set Zone 8 , 57 , 123 To 85 , 128
     }
  } else {
     if (JOY.state.transport[9] = 1) {
        switchScreen(2);
        Bob 9 , 57 , 123 , 2
        switchScreen(0);
        Set Zone 9 , 57 , 123 To 85 , 128
     }
  }
  if (JOY.state.person[8] = 1) {
     switchScreen(2);
     Bob 19 , 0 , 34 , 10
  }
}

// implementierung aller Raum routinen
JOY.raumFunc[1] = function()
{
  if (JOY.verb == 1) {
    if (JOY.geg1 == 6 && handlung[2] == 2) {
       JOY.gehe = 1;
       r = 22
       Gosub initraum
       Pop
       Goto parser
    }
    if (JOY.geg1 == 7 && JOY.state.transport[11] == 1) {
       //showText(JOY.ereignis[3]);
       showText(JOY.ereignis[3])

       Call 'clickmouse$'

       g = 11;
       mz = 11;
       aufnehmen();

       //Bset.<> 0 , JOY.state.flag[53]
       flagSet(0, 53);

       //Bclr 0 , JOY.state.flag[58]
       flagClear(0, 58);
    }
    if (JOY.geg1 == 8 && JOY.state.transport[8] = 1) {
       JOY.state.flag[2] = 1
       JOY.state.transport[8] = 0
       JOY.state.transport[9] = 1
       switchScreen(2);
       Bob Off 8
       Bob 9 , 57 , 123 , 2
       Call 'screco$'
       switchScreen(0);
       Reset Zone 8
       Set Zone 9 , 57 , 123 To 85 , 127
    }
    if (JOY.geg1 == 12) {
       Bset.<> 2 , JOY.state.flag[53]
    }
    if (JOY.geg1 == 13) {
       JOY.state.flag[54] = 1
       JOY.state.person[1] = 1
       personenDisplay();
       if (JOY.state.person[1] = "???" && JOY.state.flag[56] = 1) {
          JOY.state.person[1] = "JUPP"
       }
    }
  }
  if (JOY.verb == 2 && geg1 = 14 && JOY.state.flag[1] = 0 && JOY.state.transport[2] = 1) {
    oeffne = 1;
    JOY.state.flag[1] = 1;

    switchScreen(2);
    Bob Off 2
    Bob 14 , 49 , 0 , 4

    Call 'screco$'
    switchScreen(0);

    Reset Zone 2
    Set Zone 2 , 61 , 20 To 67 , 30
    if (JOY.state.flag[56] = 0) {
       showText(JOY.ereignis[10]);
       Call 'clickmouse$'
       Call 'screco$'
       JOY.state.flag[56] = 1
       JOY.state.betreten[2] = 0
       JOY.state.betreten[3] = 0
       For i = 2 To 10
          if (JOY.state.person[i] = 4
             JOY.state.person[i] = 1
          }
       Next
       personenDisplay();
       if (JOY.state.person[1] = "???") {
          JOY.state.person[1] = "JUPP"
       }
    }
 }
 if (JOY.verb == 3 && geg1 = 14 && JOY.state.flag[1] = 1 && JOY.state.transport[2] == 1) {
    schliesse = 1;
    JOY.state.flag[1] = 0;

    switchScreen(2);
    Bob Off 14
    Bob 2 , 54 , 41 , 3
    Call 'screco$'

    switchScreen(0);
    Set Zone 2 , 50 , 39 To 61 , 51
 }
 if (JOY.verb == 4) {
    if (JOY.geg1 == 2 && JOY.state.transport[2] == 1) {
       ziehe = 1;
       if (JOY.state.flag[1] == 0 || JOY.state.flag[1] == 2) {
          g = geg1;
          aufnehmen();
       } else {
          switchScreen(2);
          Bob 14 , 49 , 0 , 8

          g = 2;
          mz = 2;
          aufnehmen();
       }
    }
 }
 if (( verb == 5 || verb == 8 ) && geg1 == 10) {
    showText(Chr$ ( 10 ) + "ABER ES IST DOCH NOCH HELL!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
    Call 'clickmouse$'
    Call 'screco$'
    Pop
    Goto parser
 }
 if (JOY.verb == 7) {
    if (JOY.geg1 == 2 && geg2 == 14 && JOY.state.transport[2] == 2) {
       JOY.benutze = 1;
       g = 2;
       ablegen();
       JOY.state.transport[2] = 1;
       if (JOY.state.flag[1] == 0 || JOY.state.flag[1] == 2) {
          switchScreen(2);
          Bob 2 , 54 , 41 , 3
          Call 'screco$'
          switchScreen(0);
          Set Zone 2 , 50 , 39 To 61 , 51
       } else {
          switchScreen(2);
          Bob 14 , 49 , 0 , 4
          Call 'screco$'
          switchScreen(0);
          Set Zone 2 , 61 , 20 To 67 , 30
       }
    }
    if (JOY.geg1 == 11 && geg2 == 7) {
       JOY.benutze = 1;
       g = 11;
       ablegen();
       JOY.state.transport[11] = 1
       Bset.<> 0 , JOY.state.flag[58]
       Gosub test_recall
    }
    if (JOY.geg1 == 33 && geg2 == 14) {
       [JOY.benutze] = 1
       JOY.state.flag[1] = 0;
       g = 33;
       ablegen();
       showText(JOY.ereignis[7]);
       Call 'clickmouse$'
       Call 'screco$'
       punkte(100);
    }
    if (JOY.geg1 == 134 && geg2 == 7 && JOY.state.handlung[2] == 2) {
       JOY.benutze = 1
       showText(JOY.ereignis[39]);
       Call 'clickmouse$'
       Call 'screco$'
       g = 134;
       ablegen();
       JOY.state.handlung[2] = 3;
       JOY.state.person[3] = 1;
       personenDisplay();
       switchScreen(2);
       Bob 6 , 136 , 81 , 6
       Call 'screco$'
       punkte(102);
    }
    if (JOY.geg1 == 203 && geg2 == 12) {
       JOY.benutze = 1;
       g = 203;
       ablegen();
       Bset.<> 1 , JOY.state.flag[58]
       Gosub test_recall
    }
    if (JOY.geg1 == 254 && geg2 == 7) {
       if (JOY.state.handlung[2] = 0 || JOY.state.handlung[2] == 3) {
          Goto klackstris
       } else {
          showText(Chr$ ( 10 ) + "DENK AN HERBERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'clickmouse$'
          Call 'screco$'
          Pop
          Goto parser
       }
    }
 }
 if (JOY.verb == 8) {
    if (JOY.geg1 == 6 && JOY.state.flag[3] == 0) {
       schalte = 1
       JOY.state.flag[3] = 1
       if (JOY.state.flag[4] == 1) {
          switchScreen(2);
          Bob 6 , 136 , 81 , 6
          Call 'screco$'
       }
    }
    if (JOY.geg1 == 7 && JOY.state.flag[4] == 0) {
       schalte = 1
       JOY.state.flag[4] = 1
       Gosub test_recall
       if (JOY.state.flag[3] = 1) {
          switchScreen(2);
          Bob 6 , 136 , 81 , 6
          Call 'screco$'
       }
    }
    if (JOY.geg1 == 12 && JOY.state.flag[51] == 0) {
       schalte = 1
       JOY.state.flag[51] = 1
    }
 }
 if (JOY.verb == 9) {
    if (JOY.geg1 == 6 && JOY.state.flag[3] == 1) {
       if (JOY.state.handlung[2] == 0 || JOY.state.handlung[2] == 3) {
          schalte = 1
          JOY.state.flag[3] = 0
          switchScreen(2);
          Bob Off 6
          Call 'screco$'
       } else {
          showText(Chr$ ( 10 ) + "DENK AN HERBERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'clickmouse$'
          Call 'screco$'
          Pop
          Goto parser
       }
    }
    if (JOY.geg1 == 7 && JOY.state.flag[4] == 1) {
       if (JOY.state.handlung[2] = 0 || JOY.state.handlung[2] = 3) {
          schalte = 1
          JOY.state.flag[4] = 0
          switchScreen(2);
          Bob Off 6
          Call 'screco$'
       } else {
          showText(Chr$ ( 10 ) + "DENK AN HERBERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'clickmouse$'
          Call 'screco$'
          Pop
          Goto parser
       }
    }
    if (JOY.geg1 == 12 && JOY.state.flag[51] == 1) {
       schalte = 1
       JOY.state.flag[51] = 0
    }
 }
 if (JOY.verb == 10 && geg1 = 14 && JOY.state.flag[1] == 1) {
    if (JOY.state.handlung[3] = 5 && JOY.state.handlung[4] = 0) {
       JOY.state.handlung[4] = 1
       showText(JOY.ereignis[29]);
       Call 'clickmouse$'
       JOY.state.person[2] = 0
       JOY.state.person[16] = 20
       personenDisplay();
    }
    gehe = 1
    r = 4
    Gosub initraum
 }
 if (JOY.verb == 11 && JOY.state.flag[56] == 1) {
    showText(JOY.ereignis[11]);
    Call 'clickmouse$'
    Call 'screco$'
    Call 'verb_raus$'
    verb = verb2
    Call 'verb_rein$'
    Pop
    Goto parser
 }
 if (JOY.verb == 12 && geg1 == 2) {
    showText(JOY.ereignis[80]);
    Call 'clickmouse$'
    Call 'screco$'
    Pop
    Goto parser
 }
 if (JOY.verb == 13 && geg1 == 162 && pers == 5 && JOY.state.handlung[1] == 2) {
    gib = 1
    showText(JOY.ereignis[34]);
    Call 'clickmouse$'
    Call 'screco$'
    g = 162
    ablegen();
    JOY.state.transport[162] = 1
    JOY.state.handlung[1] = 3
    punkte(103);
 }
 if (JOY.verb == 16) {
    if (pers == 5) {
       if (JOY.state.handlung[1] == 2) {
          showText(Chr$ ( 10 ) + "GLGLGLGLGL BLABLA TRRRR GLUCKS TRALALA HIHAHOHU BL-BL-BL" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          Pop
          Goto parser
       } else {
          showText(Chr$ ( 10 ) + "LA� MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          Pop
          Goto parser
       }
    }
    if (pers == 2 || pers == 3 || pers == 5 || pers == 6 || pers == 7 && JOY.state.reden[pers] == 0) {
       showText(Chr$ ( 10 ) + "LA� MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       Call 'clickmouse$'
       Call 'screco$'
    }
    if (pers == 10) {
       if (JOY.state.reden[10] == 0) {
          Call 'unterhaltung_laden$' [ 2 ]
          Call 'unterhaltung$'
          JOY.state.reden[10] = 1
          verb = verb2
          Pop
          Goto parser
       }
       if JOY.state.reden[10] == 1) {
          showText(Chr$ ( 10 ) + "LA� MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'clickmouse$'
          Call 'screco$'
       }
    }
    if (pers == 18) {
       Call 'unterhaltung_laden$' [ 14 ]
       Call 'unterhaltung$'
       if (Btst ( 2 , gefragt )) {
          JOY.state.person[7] = "HANS-WERNER"
          JOY.state.person[9] = "RAINER"
          JOY.state.person[10] = "ANJA"
          punkte(113);
       }
       verb = verb2
       Pop
       Goto parser
    }
 }
}

function handlung()
{
}

function aufnehmen()
{
}

function ablegen()
{
  for (var i = 1; i <= 24; ++i) {
    if (JOY.state.inventar[i] == g) {
      JOY.state.inventar[i] = 0;
      JOY.state.transport[g] = 0;
      JOY.state.invent[i] = "";
      break;
    }
  }
  inventory();
}

function testInventar()
{
  var liste = 0;
  for (var i = 1; i <= 24) {
    if (JOY.state.inventar[i] > 0) {
      liste++
    }
  }
  if (liste == 24) {
    Call 'txt$' [ Chr$ ( 10 ) + "MEHR KANNST DU NICHT TRAGEN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
    Call 'clickmouse$'
    Call 'screco$'
    Pop
    //Goto parser
  }
}

function personenDisplay()
{
  Call 'iconbank$' [ 2 ]
  switchScreen(3);

  var person_ = 1;
  var i = 0;
  for (var j = 1; j <= 10; ++j) {
    personen[j] = 0;
  }

  do
  {
    if (JOY.state.person[person_] == JOY.state.raum) {
      Paste Icon i * 31 , 0 , person_
      JOY.state.personen[i + 1] = person_;
      i++;
    }
    person_++;
  } while (i != 10 && person_ != 21);

  Cls 0 , i * 31 , 0 To ( i * 31 ) + ( 320 - i ) , 39
}

function initRaum()
{
  JOY.state.raum2 = JOY.state.raum;
  JOY.state.raum = r;

  //Call 'maus_aus$'
  switchScreen(2);
  Bob Off
  Wait Vbl
  Cls 0

  Call 'roller_blind$'
  Call 'test_joy2$'

  switchScreen(2);
  Load pfad$ + "Grafiken/Raum" + ( Str$ ( raum ) - " " ) + ".Bobs.Abk"
  if (JOY.state.raum == 11 && JOY.state.flag[68] == 1 && JOY.state.zeit > 47) {
     Load pfad$ + "Grafiken/Raum11_1.Pic" , 8
  } else {
     if (JOY.state.raum == 5 && JOY.state.person[7] == 5) {
        Load pfad$ + "Grafiken/Raum5_1.Pic" , 8
     } else {
        if (JOY.state.raum == 14) {
           if (JOY.state.zeit == 46) {
              Load pfad$ + "Grafiken/Raum14_1.Pic" , 8
           } else {
              if (JOY.state.zeit == 47) {
                 Load pfad$ + "Grafiken/Raum14_2.Pic" , 8
              } else {
                 Load pfad$ + "Grafiken/Raum14.Pic" , 8
              }
           }
        } else {
           Load pfad$ + "Grafiken/Raum" + ( Str$ ( raum ) - " " ) + ".Pic" , 8
        }
     }
  }
  Unpack 8 To 2
  Erase 8

  Load pfad$ + "Daten/Raum" + ( Str$ ( raum ) - " " ) + ".Zones" , 8
  Set Input 42 , - 1
  Open In 1 , pfad$ + "Texte/Raum" + ( Str$ ( raum ) - " " ) + ".Umgebung.Txt"
  Line Input # 1 , umgebung$
  umgebung$ = umgebung$ + "*" + Chr$ ( 10 )
  Close 1
  Open In 1 , pfad$ + "Texte/Raum" + ( Str$ ( raum ) - " " ) + ".Objekte.Txt"
  For i = 1 To JOY.state.raumaddierer[raum] - JOY.state.raumaddierer[raum - 1]
     Line Input # 1 , JOY.state.objekt[i]
     JOY.state.objekt[i] = JOY.state.objekt[i] + "*" + Chr$ ( 10 )
  Next
  Close 1

  // move player to current room
  if (JOY.state.flag[54] == 1) {
    JOY.state.person[1] = JOY.state.raum;
  }

  switchScreen(0);
  Flash Off
  Get Palette 2

  initZones();

  //Gosub "INITRAUM" + ( Str$ ( raum ) - " " )
  JOY.initRaum[raum]();

  //switchScreen(3);
  //Cls 0
  personendisplay();

  switchScreen(0);
  Call 'cursor$'

  // crooked mouse cursor in room 19?
  if (JOY.state.raum2 == 19) {
     Bank Swap 1 , 11
     Change Mouse 4
     Bank Swap 1 , 11
  }
  if (r == 19) {
     Bank Swap 1 , 11
     Change Mouse 5
     Bank Swap 1 , 11
  }

  Call 'roller_blind$'
  //Call 'maus_an$'

  //Gosub handlung
  handlung();

  if (!(raum == 22 || raum == 23)) {
     JOY.state.betreten[raum] = 1;
  }
}

function initZones()
{
   switchScreen(0);
   JOY.state.zones[JOY.screen] = JOY.raumZones[JOY.raum];
   /*
   anz = Deek ( Start ( 8 ) + Length ( 8 ) - 2 )
   For i = 1 To anz
      adr = Start ( 8 ) + ( i - 1 ) * 8
      x1 = Deek ( adr )
      y1 = Deek ( adr + 2 )
      x2 = Deek ( adr + 4 )
      y2 = Deek ( adr + 6 )
      If x2 <> 0
         Set Zone i , x1 , y1 To x2 , y2
      EndIf
   Next
   */
}

function font(f, groesse)
{
   If Not Upper$ ( Right$ ( f$ , 5 ) ) = ".FONT"
      f$ = f$ + ".Font"
   EndIf
   i = 1
   While Font ( i ) <> ""
      If Upper$ ( Left$ ( Font ( i ) , 30 ) - " " ) = Upper$ ( f$ )
         If Val ( Mid$ ( Font ( i ) , 31 , 2 ) ) = groesse
            Set Font i
            Exit
         EndIf
      EndIf
      Inc i
   Wend
}

function mausAus()
{
   Limit Mouse X Mouse , Y Mouse To X Mouse , Y Mouse
}

function mausAn()
{
   Limit Mouse 128 , 47 To 447 , 297
}

function verbRaus()
{
  Shared verb
  switchScreen(1);
  Call 'iconbank$' [ 0 ]

  if (JOY.verb < 10) {
    Paste Icon 0 , verb * 9 , verb
  } else {
    Paste Icon 58 , ( verb - 9 ) * 9 , verb
  }
}

function verbRein()
{
  switchScreen(1);
  Call 'iconbank$' [ 0 ]
  if (JOY.verb < 10) {
    Paste Icon 0 , verb * 9 , verb + 15
  } else {
    Paste Icon 58 , ( verb - 9 ) * 9 , verb + 15
  }
}

function lopri(x , y , txt)
{
   Text 16 + x * 8 , 54 + y * 8 , txt$
}

Procedure cursorweg$
   Shared s , z , scr$ ( )
   Ink 14 , 6
   Call 'lopri$' [ s , z , Mid$ ( scr$ ( z ) , s + 1 , 1 ) ]
   Wait Vbl
End Proc

Procedure cursorhin$
   Shared s , z , scr$ ( ) , cc16 , cc17
   Ink 16 , 17
   Call 'lopri$' [ s , z , Mid$ ( scr$ ( z ) , s + 1 , 1 ) ]
   Colour 16 , cc16
   Colour 17 , cc17
   Shift Up 25 , 16 , 17 , 1
   Wait Vbl
End Proc

Procedure bildaufbau$
   Shared scr$ ( )
   For i = 0 To 24
      Call 'lopri$' [ 0 , i , scr$ ( i ) ]
   Next
End Proc

Procedure make_screen$
   switchScreen(1);
   Get Block 1 , 0 , 0 , 40 , 80 , 1
   switchScreen(0);
   Put Block 2
   Put Block 1 , 119 , 19
   Screen Swap
   Wait Vbl
End Proc

Procedure p$
   Shared p
   switchScreen(0);
   Ink 1 , 0
   Text 232 , 30 , Str$ ( p ) - " "
End Proc

 Label init_befehle:
 Screen Display 1 , 128 , 309 , ,
 Load pfad$ + "Grafiken/Befehle2.Pic" , 8
 Unpack 8 To 1

 Erase 8
 Get Cblock 2 , 0 , 0 , 320 , 90
 Load pfad$ + "Grafiken/Befehle.Pic" , 8
 Unpack 8 To 1

 Erase 8
 Gosub inventory
 Ink 0 , 5
 If half = 1
    Screen Display 1 , 128 , , 160 , 90
 EndIf
 Screen 1
 Call 'font$' [ "JOY" , 6 ]
 Reserve Zone 28
 Set Zone 1 , 0 , 9 To 57 , 90
 Set Zone 2 , 58 , 9 To 115 , 44
 Set Zone 3 , 58 , 46 To 115 , 68
 Set Zone 4 , 58 , 68 To 115 , 90
 feld = 5
 For j = 1 To 3
    For i = 1 To 8
       x = 100 + i * 24
       y = - 6 + j * 24
       Set Zone feld , x , y To x + 16 , y + 16
       Inc feld
    Next
 Next
 If spr = 0
    Call 'befehle_hoch$'
 Else
    spr = 0
 EndIf
 Call 'verb_rein$'
 Return

function ladeTexte:
 Screen 1
 Set Input 42 , - 1
 anz# = Float 1
 Ink 6
 Get Cblock 1 , 0 , 0 , 320 , 11
 If Not Exist ( pfad$ )
    Screen 0
    Gr Writing 0
    Ink 1 , 0
    Text 70 , 60 , "BITTE LEGEN SIE DIE ZWEITE DISK EIN"
    While Not Exist ( pfad$ )
    Wend
    Cls 0
 EndIf
 Screen 1
 Open In 1 , pfad$ + "Texte/Ereignisse.Txt"
 For i = 1 To 102
    Bar 1 , 1 To 1 + anz# , 6
    Line Input # 1 , ereignis$ ( i )
    anz# = anz# + Float 3.1000001430511475
    ereignis$ ( i ) = ereignis$ ( i ) + "*" + Chr$ ( 10 )
 Next
 Close 1
 Put Cblock 1 , 0 , 0
 Return

 Label inventory:
 Screen 1
 Call 'iconbank$' [ 1 ]
 zaehler = 0
 For y = 1 To 3
    For x = 1 To 8
       Inc zaehler
       If inventar$ ( zaehler ) > 0
          Paste Icon 100 + x * 24 , - 6 + y * 24 , inventar$ ( zaehler )
       Else
          Cls 0 , 100 + x * 24 , - 6 + y * 24 To ( 100 + x * 24 ) + 16 , ( - 6 + y * 24 ) + 16
       EndIf
    Next
 Next
 Return

function initialisieren()
{
  var i;
  // Screen Open 1 , 320 , 90 , 64 , Lowres

  // personen
  // Screen Open 3 , 320 , 34 , 32 , Lowres
  // Screen Display 3 , 128 , 47 , ,
  Reserve Zone 10
  for (i = 0; i <= 9; ++i) {
    //Set Zone i + 1 , 31 * i , 0 To 31 * i + 30 , 38
  }

  //Screen Open 4 , 320 , 128 , 64 , Lowres
  //Screen Display 4 , 128 , 80 , ,
  //Flash Off
  //Curs Off
  //Cls 0
  if (half == 1) {
    Screen Display 3 , 128 , 47 , 160 ,
  }

  // Label init_spiel:
  for (i = 1; i <= 24; ++i) {
    JOY.state.inventar[i] = 0;
  }
  JOY.state.inventar[1] = 15;

  JOY.geg[0] = "                                                ";
  //iconbank = 0;
  JOY.state.zeit = 0;
  JOY.state.punkte = 0;

  JOY.verb = 1;
  JOY.gehe = 0;
  JOY.oeffne = 0;
  JOY.druecke = 0;
  JOY.schliesse = 0;
  JOY.ziehe = 0;
  JOY.raum = 1;

  JOY.state.lab = Math.floor(Math.Random * 3) + 1;

  etage = 2
  versuch = 0
  z = 6
  s = 0
  bm = 1
  cc16 = 0x8f
  cc17 = 0xc
  Restore verben
  For i = 1 To 16
    Read verb$ ( i )
  Next
  Restore objekte
  For i = 1 To 255
    Read geg$ ( i ) , transport$ ( i )
Next
 Restore r�ume
 For i = 1 To 26
    Read raum$ ( i ) , zur�ck$ ( i )
    betreten$ ( i ) = 0
 Next
 betreten$ ( 1 ) = 1
 Restore personen
 For i = 1 To 20
    Read person$ ( i ) , person$ ( i )
    reden$ ( i ) = 0
 Next
 Restore raumaddierer
 For i = 1 To 26
    Read raumaddierer$ ( i )
 Next
 Restore fahrstuhl_daten
 For i = 1 To 9
    Read fahrx$ ( i ) , fahry$ ( i )
 Next
 For i = 1 To 6
    handlung$ ( i ) = 0
 Next
 For i = 1 To 69
    flag$ ( i ) = 0
 Next
 JOY.state.flag[1] = 2
 JOY.state.flag[5] = 1
 JOY.state.flag[47] = 1
 JOY.state.flag[48] = 2
 JOY.state.flag[50] = 1
 JOY.state.flag[58] = 1
 JOY.state.betreten[1] = 1
 Screen Open 0 , 320 , 128 , 64 , Lowres
 Screen Display 0 , 128 , 80 , ,
 Flash Off
 Curs Off
 Cls 0
 Colour 1 , 0xfff
 Call 'font$' [ "JOY" , 6 ]
 If half = 1
    Screen Display 0 , 128 , 80 , 160 ,
 EndIf
 Screen 4
 Call 'maus_an$'
 If geladen = 0
    If Not Exist ( pfad$ )
       Screen 0
       Gr Writing 0
       Ink 1 , 0
       Text 70 , 60 , "BITTE LEGEN SIE DIE ZWEITE DISK EIN"
       While Not Exist ( pfad$ )
       Wend
       Cls 0
    EndIf
    Load pfad$ + "Grafiken/Icons3.Abk"
    Make Icon Mask
    Call 'iconbank$' [ 2 ]
    Load pfad$ + "Grafiken/Gesichter.Abk"
    No Icon Mask
    Call 'iconbank$' [ 1 ]
    Load pfad$ + "Grafiken/Icons.Abk"
    No Icon Mask
    Load pfad$ + "Grafiken/Mauspfeil.Abk"
    Change Mouse 4
    Bank Swap 1 , 11
    Load pfad$ + "Grafiken/Raum1.Bobs.Abk"
    Gosub init_befehle
    Gosub ladetexte
    geladen = 1
 EndIf
 Screen 3
 Call 'iconbank$' [ 2 ]
 Get Icon Palette
 Priority Reverse On
 Load pfad$ + "Grafiken/Raum1.Pic" , 8
 Unpack 8 To 2

 Erase 8
 Screen 2
 For i = 0 To 31
    Colour i , 0x0
 Next
 Load pfad$ + "Daten/Raum1.Zones" , 8
 Bob 2 , 54 , 41 , 3
 Bob 5 , 305 , 34 , 5
 Bob 8 , 57 , 123 , 2
 Set Input 42 , - 1
 Open In 1 , pfad$ + "Texte/Raum1.Umgebung.Txt"
 Line Input # 1 , umgebung$
 umgebung$ = umgebung$ + "*" + Chr$ ( 10 )
 Close 1
 Open In 1 , pfad$ + "Texte/Raum1.Objekte.Txt"
 For i = 1 To 18
    Line Input # 1 , objekt$ ( i )
    objekt$ ( i ) = objekt$ ( i ) + "*" + Chr$ ( 10 )
 Next
 Close 1
 invent$ ( 1 ) = objekt$ ( 15 )
 Screen 0
 Get Palette 2
 Call 'screco$'
 Screen To Front 0
 Screen 2
 Get Sprite Palette
 Screen 4
 Cls 32
 Screen 0
 Reserve Zone 20
 Call 'init_zones$'
 Set Zone 2 , 50 , 39 To 61 , 51
 Set Zone 5 , 303 , 32 To 313 , 47
 Set Zone 8 , 57 , 123 To 85 , 126
 Set Zone 16 , 281 , 0 To 319 , 54
 Call 'cursor$'
 X Mouse = 128
 Y Mouse = 45
 Show On
 Fade 10 To 2
 Wait 200
 Call 'txt$' [ ereignis$ ( 1 ) ]
 Call 'clickmouse$'
 Call 'txt$' [ ereignis$ ( 64 ) ]
 Call 'clickmouse$'
 Call 'screco$'
 code = Rnd ( 2 ) + 1
 Mid$ ( ereignis$ ( 65 ) , 48 , 1 ) = ( Str$ ( code ) - " " )
 a$ = ""
 Clear Key
 Call 'txt$' [ ereignis$ ( 65 ) ]
 While a$ = ""
    a$ = Inkey$
 Wend
 If Upper$ ( a$ ) = Mid$ ( "JOY" , code , 1 )
    Call 'txt$' [ ereignis$ ( 66 ) ]
    Call 'clickmouse$'
    Call 'screco$'
    Call 'verb_rein$'
    Return
 Else
    go = 3
    Goto game_over
 EndIf

 Label init_neu:
 iconbank = 0
 Screen Open 1 , 320 , 90 , 64 , Lowres
 Screen Display 1 , 128 , 309 , ,
 Flash Off
 Curs Off
 Cls 0
 Screen Open 2 , 320 , 128 , 64 , Lowres
 Screen Display 2 , 128 , 80 , ,
 Flash Off
 Curs Off
 Cls 0
 Screen Open 3 , 320 , 34 , 32 , Lowres
 Screen Display 3 , 128 , 47 , ,
 Flash Off
 Curs Off
 Cls 0
 Reserve Zone 10
 For i = 0 To 9
    Set Zone i + 1 , 31 * i , 0 To 31 * i + 30 , 38
 Next
 Screen Open 4 , 320 , 128 , 64 , Lowres
 Screen Display 4 , 128 , 80 , ,
 Flash Off
 Curs Off
 Cls 0
 Screen Open 0 , 320 , 128 , 64 , Lowres
 Screen Display 0 , 128 , 80 , ,
 Flash Off
 Curs Off
 Cls 0
 Colour 1 , 0xfff
 Colour 30 , 0xfff
 Call 'maus_aus$'
 Call 'font$' [ "JOY" , 6 ]
 If Not Exist ( pfad$ )
    Screen 0
    Gr Writing 0
    Ink 1 , 0
    Text 70 , 60 , "BITTE LEGEN SIE DIE ZWEITE DISK EIN"
    While Not Exist ( pfad$ ) 
    Wend
    Cls 0
 EndIf
 Load pfad$ + "Grafiken/Icons3.Abk"
 Make Icon Mask
 Call 'iconbank$' [ 2 ]
 Load pfad$ + "Grafiken/Gesichter.Abk"
 No Icon Mask
 Call 'iconbank$' [ 1 ]
 Load pfad$ + "Grafiken/Icons.Abk" , 2
 No Icon Mask
 Load pfad$ + "Grafiken/Mauspfeil.Abk"
 Change Mouse 4
 Bank Swap 1 , 11
 Show On
 If go = 6
    spr = 1
 EndIf
 Gosub init_befehle
 Screen 3
 Call 'iconbank$' [ 2 ]
 Get Icon Palette
 Priority Reverse On
 Screen 4
 Cls 32
 Screen 0
 Reserve Zone 20
 Return
