var game = new Phaser.Game(320, 252, Phaser.AUTO, '', { preload: preload, create: create, update: update }, false, false);

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
  geg2: 0,
  gehe: 0,
  unterhaltung: null,

  // AMOS state
  screen: 0,
  screenh: [128,90,0,34],
  screeny: [34,34+128,0,0],
  bobs: [[],[],[],[]],

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
  game.load.json('unterhaltung', 'assets/texteDeutsch/unterhaltung.json');

  // graphic assets
  for (i = 0; i < 20; ++i) {
    game.load.sprite('gesicht_' + i, 'assets/grafiken/Gesichter.' + i + '.png');
  }
  for (i = 0; i < 34; ++i) {
    game.load.sprite('icons3_' + i, 'assets/grafiken/Icons3Deutch.' + i + '.png');
  }
  game.load.sprite('befehle', 'assets/grafiken/BefehleDeutch.Pic.png');
  game.load.sprite('befehle2', 'assets/grafiken/Befehle2.Pic.png');

  // Raum assets
  var raumBobNum = {
    "1":13, "10":0, "11":1, "12":3, "13":2, "14":7, "15":11, "16":0, "17":5, "18":1,
    "19":4, "2":9, "20":16, "21":0, "22":0, "23":0, "24":5, "25":0, "26":1, "3":25,
    "4":14, "5":2, "6":14, "7":3, "8":6
  };
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

function create()
{
  // interface and room 1

  // setup handlers
  game.input.onDown.add(mouseClick, this);
}


// mouse handler
function mouseClick()
{
  JOY.geg1 = 0;
  JOY.geg2 = 0;
  JOY.pers = 0;

  testScreen();
  JOY.geg1 = JOY.geg;
  schreibeSatz();

  if (JOY.unterhaltung !== null)
  {
    // we are in a conversation
  }
  else
  {
    // regular game mode
    if (game.input.mouse.button == 1 && game.input.activePointer.isDown) {
      if (verbAusfuehren()) {
        verbWaehlen();
      }
    }
    else if (game.input.mouse.button == 2) {
      vermRm();
      schreibeSatz();
    }
  }
}

// main game loop
function update()
{
  JOY.pers = 0;
  testScreen();
  JOY.geg1 = JOY.geg;
  schreibeSatz();
}

function switchScreen(s)
{
  JOY.screen = s;
}

function YScreen(y) { return y - JOY.screeny[JOY.screen]; }
function XScreen(x) { return x; }
function YMouse() { return game.input.y; }
function XMouse() { return game.input.x; }

// which of the three screen sections (personen, raum, befehle) did the user click
function mouseScreen()
{
  var i, my = game.input.y;
  for (i=0; i < JOY.screenh.length; ++i)
    if (my >= JOY.screeny[i] && my < (JOY.screeny[i] + JOY.screenh[i]))
      return i;
  return 0;
}

function mouseZone()
{
  var z = JOY.state.zones[JOY.screen];
  var i, mx = game.input.x, my = game.input.y;
  for (i = 1; i < z.length; ++i)
  {
    if (mx >= z[i][0] && my >= z[i][1] && mx < (z[i][0]+z[i][2]) && my < (z[i][1]+z[i][3]))
      return i + 1;
  }
  return 0;
}

function verbAusfuehren()
{
  if (JOY.geg1 === 0) {
    return;
  }
  if (JOY.raum == 14 && JOY.geg1 == 140 && JOY.state.handlung[3] == 6) {
    showText(ereignis$ ( 86 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    // Pop
    // Goto parser
    return false;
  }

  var mz, ms = mouseScreen();
  if (JOY.verb == 1) {
    if (ms == 0) {
      showText(JOY.state.objekt[geg1 - raumaddierer$ ( raum - 1] ));
      //Call 'clickmouse$'
    }
    if (ms == 1) {
      switchScreen(1);
      mz = mouseZone();
      if (mz > 4) {
        showText(JOY.state.invent[mz - 4]);
        //Call 'clickmouse$'
      }
    }
  }
  if (JOY.verb == 7 || JOY.verb == 13) {
    //Gosub "Raum" + Str$ ( raum ) - " "
    JOY.raumFunc[JOY.state.raum]();

    // this is a separate event loop...
    /*
    Label parser2:
    mc = 0
    mz = 0
    While mc = 0
    pers = 0
    mc = Mouse Click
    Gosub test_screen
    geg2 = geg
    Gosub schreibe_satzteil
    Wend
    if (JOY.mc == 2) {
    Gosub verb_rm
    Gosub schreibe_satzteil
  }
  If mc = 1
  verbWaehlen();
}
If geg2 = 0 And pers = 0
Goto parser2
}
If mc = 1
verbWaehlen();
}
*/
//Goto parser
return;
}
// GEHE ZU_RUECK_
if (JOY.verb == 10 && JOY.state.geg[JOY.geg1] == "RÜCK" )
  //Gosub "RAUM" + ( Str$ ( raum ) - " " )
  JOY.raumFunc[JOY.state.raum]();
  r = JOY.state.zurueck[JOY.raum]
  initRaum();
  //Pop
  //Goto parser
  return false;
}
if (JOY.verb == 12) {
  if (ms == 0) {
    //Gosub "RAUM" + ( Str$ ( raum ) - " " )
    JOY.raumFunc[JOY.state.raum]();
    JOY.g = JOY.geg1;
    aufnehmen();
    //Pop
    //Goto parser
    return false;
  }
  if (ms == 1 && mz > 4) {
    showText(Chr$ ( 10 ) + "HAST DU SCHON !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
    //Call 'clickmouse$'
    //Call 'screco$'
  }

  verbAusfuehren2();
  return true;
}

 function verbAusfuehren2()
 {
   handlung();
   // Gosub "Raum" + Str$ ( raum ) - " "
   JOY.raumFunc[JOY.state.raum]();

   // there is a "Pop; Goto parser" in there
   if (!raumAlle()) {
     return;
   }

   verbBestaetigen();
   // Call 'screco$'
 }

function verbWaehlen()
{
 switchScreen(1);
 var mz = mouseZone(), ms = mouseScreen();
 if (ms == 1 && mz > 0 && mz < 5)
 {
    if (mz == 1) {
      verbRaus();
      JOY.verb2 = JOY.verb;
       JOY.verb = Math.floor(YScreen(YMouse()) / 9);
       // Paste Icon 0 , JOY.verb * 9 , JOY,verb + 15
       if (JOY.verb == 6) {
          handlung();
          switchScreen(1);
          Text 2 , 6 , "UMSCHAUEN: " + JOY.state.raum[raum]
          showText(umgebung$);
          //Call 'clickmouse$'
          //Call 'screco$'
          switchScreen(1);
          Text 2 , 6 , JOY.state.geg[0]
          Text 2 , 6 , JOY.state.verb[verb] + JOY.state.geg[0]
          // Paste Icon 0 , JOY.verb * 9 , JOY.verb
          JOY.verb = JOY.verb2;
          verbRein();
       }
       // Pop
       // Goto parser
       return false;
    }
    if (mz == 2) {
      verbRaus();
       verb2 = verb
       verb = Y Screen ( Y Mouse ) / 9 + 9
       Paste Icon 58 , ( verb - 9 ) * 9 , verb + 15
       if (JOY.verb == 11) {
          handlung();
          JOY.geg = 0;
          // Gosub "Raum" + ( Str$ ( raum ) - " " )
          JOY.raumFunc[JOY.state.raum]();
          r = JOY.state.zurueck[raum]
          //Call 'maus_aus$'
          initRaum();
          //Call 'maus_an$'
          switchScreen(1);
          Call 'iconbank$' [ 0 ]
          Paste Icon 58 , ( verb - 9 ) * 9 , verb
          JOY.verb = JOY.verb2;
          verbRein();
       }
       // Pop
       // Goto parser
       return false;
    }
    if (mz == 3) {
      // save game

      /*
      verbRaus();
       verb2 = verb
       verb = 14
       switchScreen(1);
       Ink 0 , 5
       Text 2 , 6 , "SPIELSTAND SPEICHERN" + JOY.state.geg[0]
       Paste Icon 58 , 46 , 29
       showText(Chr$ ( 10 ) + "HAUN SIE MAL KURZ IHRE SAVEDISK IN DF0:" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
       Dir$ = "Df0:"
       If Dfree < 6000
          showText(Chr$ ( 10 ) + "DIE DISKETTE IST ZU VOLL !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          //Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          switchScreen(1);
          Paste Icon 58 , 46 , 14
          verbRein();
         // Pop
         // Goto parser
         return false;
       }
       Reserve As Work 12 , 36
       n$ = "Df0:"
       Dreg ( 1 ) = Varptr ( n$ )
       Dreg ( 2 ) = - 2
       lock = Doscall ( - 84 )
       Dreg ( 1 ) = lock
       Dreg ( 2 ) = Start ( 12 )
       r = Doscall ( - 114 )
       wrpro = Leek ( Start ( 12 ) + 8 )
       Dreg ( 1 ) = lock
       r = Doscall ( - 90 )
       Erase 12
       If wrpro = 80
          showText(Chr$ ( 10 ) + "DIESE DISKETTE IST SCHREIBGESCH�TZT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'screco$'
          switchScreen(1);
          Paste Icon 58 , 46 , 14
          verbRein();
          Pop
          Goto parser
       } else { If wrpro = 81
          showText(Chr$ ( 10 ) + "DIESE DISKETTE IST NICHT VALIDIERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'screco$'
          switchScreen(1);
          Paste Icon 58 , 46 , 14
          verbRein();
          Pop
          Goto parser
       }
       Gosub hol_namen
       Ink 0
       Bar 10 , 10 To 310 , 47
       Ink 1 , 0
       Box 11 , 11 To 309 , 46
       Text 32 , 20 , "BITTE GEBEN SIE DEN NAMEN F�R DEN SPIELSTAND EIN:"
       altname$ = antwort$ ( ym )
       Call 'eingabe$' [ 135 , 28 , 10 , antwort$ ( ym ) , 1 , 1 ]
       name$ = Param$
       showText(Chr$ ( 10 ) + "ICH SPEICHERE DEN SPIELSTAND F�R DICH !" + Chr$ ( 10 ) + "(ALLES MU� MAN SELBER MACHEN)" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       If Exist ( "Df0:Joy_File_" + Str$ ( ym ) - " " + "." + altname$ )
          Kill "Df0:Joy_File_" + Str$ ( ym ) - " " + "." + altname$
       }
       Set Input 13 , 10
       Open Out 1 , "Df0:Joy_File_" + Str$ ( ym ) - " " + "." + name$
       Print # 1 , liste
       Print # 1 , zeit
       Print # 1 , punkte
       Print # 1 , raum
       Print # 1 , lab
       Print # 1 , etage
       Print # 1 , versuch
       For i = 1 To 6
          Print # 1 , handlung$ ( i )
       Next
       For i = 1 To 20
          Print # 1 , person$ ( i )
          Print # 1 , person$ ( i )
          Print # 1 , reden$ ( i )
       Next
       For i = 1 To 26
          Print # 1 , betreten$ ( i )
       Next
       For i = 1 To 24
          Print # 1 , inventar$ ( i )
          Print # 1 , invent$ ( i )
       Next
       For i = 1 To 69
          Print # 1 , flag$ ( i )
       Next
       For i = 1 To 255
          Print # 1 , geg$ ( i )
          Print # 1 , transport$ ( i )
       Next
       Close 1
       verb = verb2
       Call 'screco$'
       switchScreen(1);
       Paste Icon 58 , 46 , 14
       verbRein();
       */

       // Pop
       // Goto parser
       return false;
    }
    if (mz == 4) {
      // load saved game

      /*
      verbRaus();
      JOY.verb2 = JOY.verb;
      JOY.verb = 15;
       switchScreen(1);
       Ink 0 , 5
       Text 2 , 6 , "SPIELSTAND LADEN" + geg$ ( 0 )
       Paste Icon 58 , 68 , 30
       showText(Chr$ ( 10 ) + "HAUN SIE MAL KURZ IHRE SAVEDISK IN DF0:" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
       Dir$ = "Df0:"
       Gosub hol_namen
       If gespeichert$ ( ym ) = 0
          showText(ereignis$ ( 68 ));
          //Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          switchScreen(1);
          Paste Icon 58 , 68 , 15
          verbRein();
         // Pop
         // Goto parser
         return false;
       }
       //showText(Chr$ ( 10 ) + "ICH LADE DEN SPIELSTAND F�R DICH !" + Chr$ ( 10 ) + "(ALLES MU� MAN SELBER MACHEN)" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       Set Input 13 , 10
       Open In 1 , "Df0:Joy_File_" + Str$ ( ym ) - " " + "." + antwort$ ( ym )
       Input # 1 , liste
       Input # 1 , zeit
       Input # 1 , punkte
       Input # 1 , r
       Input # 1 , lab
       Input # 1 , etage
       Input # 1 , versuch
       For i = 1 To 6
          Input # 1 , handlung$ ( i )
       Next
       For i = 1 To 20
          Line Input # 1 , person$ ( i )
          Input # 1 , person$ ( i )
          Input # 1 , reden$ ( i )
       Next
       For i = 1 To 26
          Input # 1 , betreten$ ( i )
       Next
       For i = 1 To 24
          Input # 1 , inventar$ ( i )
          Line Input # 1 , invent$ ( i )
       Next
       For i = 1 To 69
          Input # 1 , flag$ ( i )
       Next
       For i = 1 To 255
          Line Input # 1 , geg$ ( i )
          Input # 1 , transport$ ( i )
       Next
       Close 1

       JOY.verb = JOY.verb2;

       switchScreen(1);
       Paste Icon 58 , 68 , 15

       verbRein();
       inventory();
       initRaum();
       // Call 'screco$'
       */

       // Pop
       // Goto parser
       return false;
    }
  }
  return true;
}

/*
 Label hol_namen:
 For i = 1 To 9
    antwort$ ( i ) = "FILE" + Str$ ( i ) - " "
    gespeichert$ ( i ) = 0
 Next
 file$ = Dir First ( "Df0:" )
 Repeat
    If Left$ ( file$ , 10 ) = " Joy_File_"
       i = Asc ( Mid$ ( file$ , 11 , 1 ) ) - 48
       antwort$ ( i ) = Mid$ ( file$ , 13 , 10 ) - " "
       gespeichert$ ( i ) = 1
    }
    file$ = Dir Next
 Until file$ = ""
 Screen Copy 4 , 118 , 1 , 201 , 77 To 0 , 118 , 1 , 11100000
 switchScreen(0);
 Ink 1
 Box 119 , 2 To 199 , 75
 Gosub zeige_namen
 rm = 0
 While Mouse Click <> 1
    ym = ( Y Screen ( Y Mouse ) + 4 ) / 8
    If ym <> rm And ym > 0 And ym < 10
       Gosub zeige_namen
       If gespeichert$ ( ym ) = 0
          Ink 17 , 1
          t = Text Length ( antwort$ ( ym ) )
          Text 160 - t / 2 , ym * 8 + 1 , antwort$ ( ym )
       }
       rm = ym
    }
    If ym < 1 Or ym > 9
       Gosub zeige_namen
       rm = 0
    }
 Wend
 If ym < 0 Or ym > 9
    Call 'screco$'
    switchScreen(1);
    if (JOY.verb == 14) {
      Paste Icon 58 , 46 , 14
    } else {
       Paste Icon 58 , 68 , 15
    }
    verb = verb2
    verbRein();
    Pop
    Goto parser
 }
 Return

 Label zeige_namen:
 switchScreen(0);
 Gr Writing 0
 Ink 1 , 0
 For i = 1 To 9
    t = Text Length ( antwort$ ( i ) )
    Text 160 - t / 2 , ( i * 8 ) + 1 , antwort$ ( i )
 Next
 Return
*/

 function verbBestaetigen()
 {
 if (JOY.verb == 2) {
   if (JOY.oeffne == 0) {
      showText(Chr$ ( 10 ) + "GEHT NICHT AUF !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       JOY.oeffne = 0;
    }
 }
 if (JOY.verb == 3) {
   if (JOY.schliesse == 0) {
      showText(Chr$ ( 10 ) + "DAS GEHT NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       JOY.schliesse = 0
    }
 }
 if (JOY.verb == 4) {
   if (JOY.ziehe == 0) {
      showText(Chr$ ( 10 ) + "DAS GEHT NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       JOY.ziehe = 0
    }
 }
 if (JOY.verb == 5) {
   if (JOY.druecke == 0) {
      showText(Chr$ ( 10 ) + "ES PASSIERT NICHTS !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       JOY.druecke = 0
    }
 }
 if (JOY.verb == 7) {
   if (JOY.benutze == 0) {
      showText(Chr$ ( 10 ) + "ES PASSIERT NICHTS !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       JOY.benutze = 0
    }
 }
 if (JOY.verb == 8) {
   if (JOY.schalte == 0) {
      showText(Chr$ ( 10 ) + "DAS GEHT NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       schalte = 0
       showText(Chr$ ( 10 ) + "O.K." + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
       JOY.state.geg[JOY.geg1] += "(AN)";
    }
 }
 if (JOY.verb == 9) {
   if (JOY.schalte == 0) {
      showText(Chr$ ( 10 ) + "DAS GEHT NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       schalte = 0
       showText(Chr$ ( 10 ) + "O.K." + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
       // remove "(AN)" suffix
       var s = JOY.state.geg[JOY.geg1];
       JOY.state.geg[JOY.geg1] = s.substr(0, s.length-4);
    }
 }
 if (JOY.verb == 10) {
   if (JOY.gehe == 0) {
      showText(Chr$ ( 10 ) + "DORT KANNST DU NICHT HINGEHEN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       JOY.gehe = 0
    }
 }
 if (JOY.verb == 13) {
   if (JOY.gib == 0) {
      showText(Chr$ ( 10 ) + "ABER VIELLEICHT KANNST DU DIESEN GEGENSTAND" + Chr$ ( 10 ) + "NOCH GEBRAUCHEN ?" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
    } else {
       JOY.gib = 0
    }
 }
 Return


function testScreen()
{
  var mz;

  switch (mouseScreen())
  {
    case 0:
      switchScreen(0);
      mz = mouseZone();
      JOY.geg = JOY.state.raumaddierer[JOY.state.raum - 1 ] + mz;
      if (JOY.geg == JOY.state.raumaddierer[JOY.state.raum - 1]) {
        JOY.geg = 0;
      }
      break;

    case 1:
      switchScreen(1);
      mz = mouseZone();
      if (mz > 4) {
        JOY.geg = JOY.state.inventar[mz - 4];
      } else {
        JOY.geg = 0;
      }
      break;

    case 3;
      switchScreen(3);
      mz = mouseZone();
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

       //Call 'clickmouse$'

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
       //Call 'clickmouse$'
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
    //Call 'clickmouse$'
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
       //Call 'clickmouse$'
       Call 'screco$'
       punkte(100);
    }
    if (JOY.geg1 == 134 && geg2 == 7 && JOY.state.handlung[2] == 2) {
       JOY.benutze = 1
       showText(JOY.ereignis[39]);
       //Call 'clickmouse$'
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
          //Call 'clickmouse$'
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
          //Call 'clickmouse$'
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
          //Call 'clickmouse$'
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
       //Call 'clickmouse$'
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
    //Call 'clickmouse$'
    Call 'screco$'
    verbRaus();
    verb = verb2
    verbRein();
    Pop
    Goto parser
 }
 if (JOY.verb == 12 && geg1 == 2) {
    showText(JOY.ereignis[80]);
    //Call 'clickmouse$'
    Call 'screco$'
    Pop
    Goto parser
 }
 if (JOY.verb == 13 && geg1 == 162 && pers == 5 && JOY.state.handlung[1] == 2) {
    gib = 1
    showText(JOY.ereignis[34]);
    //Call 'clickmouse$'
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
          //Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          Pop
          Goto parser
       } else {
          showText(Chr$ ( 10 ) + "LA� MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          //Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          Pop
          Goto parser
       }
    }
    if (pers == 2 || pers == 3 || pers == 5 || pers == 6 || pers == 7 && JOY.state.reden[pers] == 0) {
       showText(Chr$ ( 10 ) + "LA� MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
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
          //Call 'clickmouse$'
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


function raumAlle()
{
/*
 If verb = 1
    If geg1 = 8 And transport$ ( 8 ) = 2
       flag$ ( 2 ) = 1
       inventar$ ( mz - 4 ) = 9
       invent$ ( mz - 4 ) = Chr$ ( 10 ) + "DIE HAST DU SCHON GELESEN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 )
       Gosub inventory
       transport$ ( 8 ) = 0
       transport$ ( 9 ) = 2
    EndIf
    If geg1 = 11
       Bset.<> 1 , flag$ ( 53 )
    EndIf
    If geg1 = 15
       person$ ( 1 ) = "JUPP JENNSEN"
       flag$ ( 54 ) = 1
       person$ ( 1 ) = raum
       Gosub personendisplay
       Call 'punkte$' [ 100 ]
    EndIf
 EndIf
 If verb = 2
    If geg1 = 110
       oeffne = 1
       Call 'txt$' [ Chr$ ( 10 ) + "TOLL ! JETZT HAST DU DIE AUFNAHMEN ZERST�RT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
       //Call 'clickmouse$'
       Call 'screco$'
       g = 110
       Gosub ablegen
    EndIf
    If geg1 = 127 And flag$ ( 42 ) > 0
       oeffne = 1
       flag$ ( 42 ) = 0

       //Gosub testinventar
       if (!testInventar()) return;

       Call 'iconbank$' [ 1 ]
       Screen 0
       For i = 1 To 24
          If inventar$ ( i ) = 0
             inventar$ ( i ) = 165
             invent$ ( i ) = Chr$ ( 10 ) + "DIESE BATTERIEN SIND FAST SCHON WIE" + Chr$ ( 10 ) + "STROM AUS DER STECKDOSE" + Chr$ ( 10 ) + "*" + Chr$ ( 10 )
             Exit
          EndIf
       Next
       Gosub inventory
       transport$ ( 165 ) = 2
       geg$ ( 127 ) = "TASCHENLAMPE"
       Pop
       Goto parser
    EndIf
 EndIf
 If verb = 7
    If geg1 = 165 And geg2 = 127 And flag$ ( 42 ) = 0
       benutze = 1
       flag$ ( 42 ) = 1
       g = 165
       Gosub ablegen
       transport$ ( 165 ) = 1
       geg$ ( 127 ) = "TASCHENLAMPE+BATTERIEN"
    EndIf
    If geg1 = 222 And geg2 = 223 And Not raum = 12
       Call 'txt$' [ Chr$ ( 10 ) + "WORAN DENN, DU NASE ?" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
       //Call 'clickmouse$'
       Call 'screco$'
       Pop
       Goto parser
    EndIf
 EndIf
 If verb = 8
    If geg1 = 127 And flag$ ( 42 ) = 1
       schalte = 1
       flag$ ( 42 ) = 2
    EndIf
 EndIf
 If verb = 9
    If geg1 = 127 And flag$ ( 42 ) = 2
       schalte = 1
       flag$ ( 42 ) = 1
    EndIf
 EndIf
 If verb = 13 And geg1 = 131 And pers = 9
    gib = 1
    g = 131
    Gosub ablegen
    Call 'txt$' [ ereignis$ ( 54 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    Pop
    Goto parser
 EndIf
 If verb = 16
    If pers = 1
       Call 'txt$' [ Chr$ ( 10 ) + "F�HRST DU IMMER SELBSTGESPR�CHE ?" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
       //Call 'clickmouse$'
       Call 'screco$'
    EndIf
    If pers = 8
       If reden$ ( 8 ) = 0
          Call 'unterhaltung_laden$' [ 1 ]
          Call 'unterhaltung$'
          reden$ ( 8 ) = 1
          Call 'punkte$' [ 53 ]
          verb = verb2
          Pop
          Goto parser
       EndIf
       If reden$ ( 8 ) = 1
          Call 'txt$' [ Chr$ ( 10 ) + "ICH HABE ES EILIG !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
          //Call 'clickmouse$'
          Call 'screco$'
       EndIf
    EndIf
    If pers = 9
       If reden$ ( 9 ) = 0
          Call 'unterhaltung_laden$' [ 3 ]
          Call 'unterhaltung$'
          If Btst ( 0 , gefragt )
             reden$ ( 9 ) = 1
             If transport$ ( 36 ) = 1
                Call 'txt$' [ ereignis$ ( 22 ) ]
                //Call 'clickmouse$'
                Call 'screco$'
                transport$ ( 36 ) = 0
             Else
                Call 'txt$' [ ereignis$ ( 21 ) ]
                //Call 'clickmouse$'
                Call 'screco$'
             EndIf
          EndIf
          verb = verb2
          Pop
          Goto parser
       EndIf
       If reden$ ( 9 ) = 1
          Call 'txt$' [ Chr$ ( 10 ) + "ICH STREIKE !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
          //Call 'clickmouse$'
          Call 'screco$'
       EndIf
    EndIf
 EndIf
 If flag$ ( 53 ) = 111 And flag$ ( 30 ) = 0
    flag$ ( 30 ) = 1
    Call 'txt$' [ ereignis$ ( 2 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    Call 'punkte$' [ 500 ]
 EndIf
 Return

 Label test_recall:
 If handlung$ ( 6 ) = 5 And flag$ ( 58 ) = 11
    Call 'txt$' [ ereignis$ ( 59 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    Call 'txt$' [ ereignis$ ( 60 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    Call 'txt$' [ ereignis$ ( 58 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    Screen 0
    Fade 3
    Wait 100
    Call 'punkte$' [ 1001 ]
    go = 4
    Goto game_over
 EndIf
 Return

 Label handlung:
 If zeit = 20 And flag$ ( 56 ) = 1
    person$ ( 8 ) = 3
    Gosub personendisplay
 EndIf
 If zeit = 23
    person$ ( 7 ) = 4
    person$ ( 9 ) = 4
    reden$ ( 7 ) = 1
    If raum = 4
       Gosub personendisplay
       Screen 2
       Bob 1 , 111 , 42 , 8
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 25
    flag$ ( 14 ) = 1
    If raum = 4
       Screen 2
       Bob 2 , 103 , 28 , 2
       Bob 1 , 111 , 42 , 8
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 25 And flag$ ( 56 ) = 1
    person$ ( 8 ) = 2
    Gosub personendisplay
 EndIf
 If zeit = 26
    person$ ( 7 ) = 5
    person$ ( 9 ) = 5
    If raum = 4
       Gosub personendisplay
       Screen 2
       Bob Off 1
       Call 'screco$'
    EndIf
    If raum = 5
       Gosub personendisplay
       Call 'test_joy2$'
       Load pfad$ + "Grafiken/Raum5_1.Pic"
       Unpack 8 To 2

       Call 'roller_blind$'
       Call 'punkte$' [ 145 ]
    EndIf
 EndIf
 If zeit = 27
    flag$ ( 14 ) = 0
    If raum = 4
       Screen 2
       Bob Off 2
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 28 And flag$ ( 56 ) = 1
    person$ ( 8 ) = 1
    If raum = 1
       Gosub personendisplay
       Screen 2
       Bob 19 , 0 , 34 , 10
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 31
    person$ ( 8 ) = 4
    If raum = 1
       Gosub personendisplay
       Screen 2
       Bob Off 19
       Call 'screco$'
    EndIf
    If raum = 4
       Gosub personendisplay
       Screen 2
       Bob 1 , 145 , 55 , 7
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 33
    flag$ ( 17 ) = 1
    If raum = 4
       Screen 2
       Bob 5 , 122 , 40 , 5
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 34
    person$ ( 8 ) = 7
    If raum = 4
       Gosub personendisplay
       Screen 2
       Bob Off 1
       Call 'screco$'
    EndIf
    If raum = 7
       Gosub personendisplay
       Screen 2
       Bob 5 , 203 , 0 , 3
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 35
    flag$ ( 17 ) = 0
    If raum = 4
       Screen 2
       Bob Off 5
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 37
    person$ ( 8 ) = 8
    Gosub personendisplay
    reden$ ( 8 ) = 1
    If raum = 7
       Screen 2
       Bob Off 5
       Call 'screco$'
    EndIf
    If raum = 8
       If transport$ ( 111 ) = 2
          g = 111
          Gosub ablegen
          Call 'txt$' [ ereignis$ ( 23 ) ]
       Else
          Call 'txt$' [ ereignis$ ( 24 ) ]
       EndIf
       //Call 'clickmouse$'
       Call 'screco$'
       person$ ( 8 ) = 7
       person$ ( 8 ) = "BARBARA BRINK"
       Gosub personendisplay
    EndIf
    If transport$ ( 111 ) = 1
       transport$ ( 111 ) = 0
    EndIf
 EndIf
 If zeit = 40
    person$ ( 8 ) = 7
    If raum = 7
       Gosub personendisplay
       Screen 2
       Bob 5 , 205 , 96 , 4
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 43
    person$ ( 8 ) = 11
    If raum = 7
       Gosub personendisplay
       Screen 2
       Bob Off 5
       Call 'screco$'
    EndIf
    If raum = 11
       Gosub personendisplay
       Screen 2
       Bob 3 , 138 , 83 , 2
       Call 'screco$'
    EndIf
 EndIf
 If zeit = 46
    person$ ( 8 ) = 14
    If raum = 11
       Gosub personendisplay
       Screen 2
       Bob Off 3
       Call 'screco$'
    EndIf
    If raum = 14
       Gosub personendisplay
       Call 'test_joy2$'
       Load pfad$ + "Grafiken/Raum14_1.Pic"
       Unpack 8 To 2

       If flag$ ( 36 ) = 1
          Screen 2
          Bob 2 , 55 , 35 , 2
       EndIf
       Call 'roller_blind$'
       //Call 'clickmouse$'
       Call 'test_joy2$'
       Load pfad$ + "Grafiken/Raum14_2.Pic"
       Unpack 8 To 2

       If flag$ ( 36 ) = 1
          Screen 2
          Bob 2 , 55 , 35 , 2
       EndIf
       Call 'roller_blind$'
       //Call 'clickmouse$'
       person$ ( 8 ) = 0
       Gosub personendisplay
       Call 'test_joy2$'
       Load pfad$ + "Grafiken/Raum14.Pic"
       Unpack 8 To 2

       If flag$ ( 36 ) = 1
          Screen 2
          Bob 2 , 55 , 35 , 2
       EndIf
       Call 'roller_blind$'
       Call 'punkte$' [ 514 ]
    EndIf
 EndIf
 If zeit = 47
    person$ ( 8 ) = 0
 EndIf
 If zeit > 100 And handlung$ ( 1 ) = 0 And raum > 3 And raum < 16 And flag$ ( 56 ) = 1
    Call 'txt$' [ ereignis$ ( 26 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    handlung$ ( 1 ) = 1
 EndIf
 If zeit > 130 And handlung$ ( 2 ) = 0 And raum > 3 And raum < 16 And flag$ ( 56 ) = 1
    Call 'txt$' [ ereignis$ ( 49 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    handlung$ ( 2 ) = 1
    reden$ ( 7 ) = 1
    person$ ( 3 ) = 0
    flag$ ( 3 ) = 1
    flag$ ( 4 ) = 1
    Gosub personendisplay
 EndIf
 If handlung$ ( 3 ) = 2
    handlung$ ( 3 ) = 3
    Call 'txt$' [ ereignis$ ( 51 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
 EndIf
 If zeit > 140 And flag$ ( 65 ) = 0
    flag$ ( 65 ) = 1
    Call 'txt$' [ ereignis$ ( 95 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
 EndIf
 If zeit > 180 And handlung$ ( 3 ) = 1 And raum > 3
    handlung$ ( 3 ) = 2
    Call 'txt$' [ Chr$ ( 10 ) + "INZWISCHEN..." + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
    //Call 'clickmouse$'
    Call 'maus_aus$'
    Screen 2
    Cls 0
    Call 'roller_blind$'
    Screen 3
    Cls 0
    Call 'test_joy2$'
    Screen 2
    Load pfad$ + "Grafiken/Raum23.Pic" , 8
    Unpack 8 To 2

    Erase 8
    Screen 0
    Get Palette 2
    Call 'roller_blind$'
    Call 'txt$' [ ereignis$ ( 25 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    Wait 100
    Fade 3 , , , , , , , , , , , , , , , , , , , , 0xf00 , 0xf77 , 0xc , 0xfbb , 0xcc , 0xff0 , 0x23 , 0x17 , 0xb0 , 0x0 , 0xaaf , 0x44f
    Wait 100
    flag$ ( 49 ) = 1
    r = raum
    Gosub initraum
    Return
 EndIf
 If zeit > 190 And handlung$ ( 6 ) = 0 And raum > 3 And raum < 16 And flag$ ( 56 ) = 1
    Call 'txt$' [ ereignis$ ( 52 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    handlung$ ( 6 ) = 1
    person$ ( 13 ) = 21
 EndIf
 If person$ ( 8 ) = raum And transport$ ( 111 ) = 2
    Call 'txt$' [ ereignis$ ( 23 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    person$ ( 8 ) = "BARBARA BRINK"
    g = 111
    Gosub ablegen
    reden$ ( 8 ) = 1
    Call 'punkte$' [ 99 ]
 EndIf
 If raum = 1
    If handlung$ ( 1 ) = 1
       Call 'txt$' [ ereignis$ ( 28 ) ]
       //Call 'clickmouse$'
       Call 'screco$'
       handlung$ ( 1 ) = 2
       person$ ( 5 ) = "CHRISTIANE"
    EndIf
    If handlung$ ( 2 ) = 1
       Call 'txt$' [ ereignis$ ( 37 ) ]
       //Call 'clickmouse$'
       Call 'screco$'
       handlung$ ( 2 ) = 2
       person$ ( 3 ) = "HERBERT"
       geg$ ( 6 ) = "MONITOR(AN)"
       flag$ ( 3 ) = 1
       geg$ ( 7 ) = "AMIGA 2000(AN)"
       flag$ ( 4 ) = 1
    EndIf
    If handlung$ ( 3 ) = 3
       Call 'txt$' [ ereignis$ ( 27 ) ]
       //Call 'clickmouse$'
       handlung$ ( 3 ) = 4
       person$ ( 6 ) = "GERD"
       gehe = 1
       r = 23
       Gosub initraum
       ' '      Pop '
       ' '      Goto PARSER '
       Return
    EndIf
    If transport$ ( 165 ) = 2
       handlung$ ( 3 ) = 1
       Call 'txt$' [ ereignis$ ( 35 ) ]
       //Call 'clickmouse$'
       Call 'screco$'
       g = 165
       Gosub ablegen
       g = 164
       Gosub ablegen
    EndIf
    If handlung$ ( 5 ) = 1
       handlung$ ( 5 ) = 2
       Call 'txt$' [ ereignis$ ( 50 ) ]
       //Call 'clickmouse$'
       Call 'screco$'
    EndIf
    If handlung$ ( 6 ) = 1
       handlung$ ( 6 ) = 2
       Call 'txt$' [ ereignis$ ( 56 ) ]
       //Call 'clickmouse$'
       Call 'screco$'
    EndIf
    If handlung$ ( 6 ) = 3 And transport$ ( 203 ) = 2
       person$ ( 13 ) = 0
       g = 203
       Gosub ablegen
       transport$ ( 203 ) = 1
       handlung$ ( 6 ) = 4
    EndIf
 EndIf
 If raum = 4 And flag$ ( 30 ) = 0
    flag$ ( 30 ) = 1
    Call 'txt$' [ ereignis$ ( 13 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
    flag$ ( 53 ) = 111
 EndIf
 If raum = 18 And flag$ ( 60 ) = 1
    flag$ ( 60 ) = 2
    Call 'txt$' [ ereignis$ ( 90 ) ]
    //Call 'clickmouse$'
    Call 'screco$'
 EndIf
 */

 JOY.state.zeit++;
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
    showText(Chr$ ( 10 ) + "MEHR KANNST DU NICHT TRAGEN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
    //Call 'clickmouse$'
    Call 'screco$'

    //Pop
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
  JOY.initRaum[JOY.raum]();

  switchScreen(3);
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
      }
   Next
   */
}

function font(f, groesse)
{
   If Not Upper$ ( Right$ ( f$ , 5 ) ) = ".FONT"
      f$ = f$ + ".Font"
   }
   i = 1
   While Font ( i ) <> ""
      If Upper$ ( Left$ ( Font ( i ) , 30 ) - " " ) = Upper$ ( f$ )
         If Val ( Mid$ ( Font ( i ) , 31 , 2 ) ) = groesse
            Set Font i
            Exit
         }
      }
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
 }
 switchScreen(1);
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
 } else {
    spr = 0
 }
 verbRein();
 Return

function ladeTexte()
{
  JOY.state.ereignis = game.cache.getJSON('texte')['Ereignisse.Txt'];
}

function inventory()
{
  switchScreen(1);
  Call 'iconbank$' [ 1 ]
  var zaehler = 0;

  for (var y = 1; y <= 3; ++y) {
    for (var x = 1; x <= 8; ++x) {
      zaehler++;
      if (JOY.state.inventar[zaehler] > 0) {
        // Paste Icon 100 + x * 24 , - 6 + y * 24 , inventar$ ( zaehler )
      } else {
        // Cls 0 , 100 + x * 24 , - 6 + y * 24 To ( 100 + x * 24 ) + 16 , ( - 6 + y * 24 ) + 16
      }
    }
  }
}

function initialisieren()
{
  var i;
  // Screen Open 1 , 320 , 90 , 64 , Lowres

  // personen
  // Screen Open 3 , 320 , 34 , 32 , Lowres
  // Screen Display 3 , 128 , 47 , ,
  switchScreen(3);
  // Reserve Zone 10
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
 }
 switchScreen(4);
 Call 'maus_an$'
 If geladen = 0
    If Not Exist ( pfad$ )
       switchScreen(0);
       Gr Writing 0
       Ink 1 , 0
       Text 70 , 60 , "BITTE LEGEN SIE DIE ZWEITE DISK EIN"
       While Not Exist ( pfad$ )
       Wend
       Cls 0
    }
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
 }
 switchScreen(3);
 Call 'iconbank$' [ 2 ]
 Get Icon Palette
 Priority Reverse On
 Load pfad$ + "Grafiken/Raum1.Pic" , 8
 Unpack 8 To 2

 Erase 8
 switchScreen(2);
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
  switchScreen(0);
  Get Palette 2
  Call 'screco$'
  Screen To Front 0
  switchScreen(2);
  Get Sprite Palette
  switchScreen(4);
  Cls 32
  switchScreen(0);
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

  showText(ereignis$ ( 1 ));
  //Call 'clickmouse$'

  // "Copy protection"
  /*
  showText(ereignis$ ( 64 ));
  //Call 'clickmouse$'
  Call 'screco$'
  code = Rnd ( 2 ) + 1
  Mid$ ( ereignis$ ( 65 ) , 48 , 1 ) = ( Str$ ( code ) - " " )
  a$ = ""
  Clear Key
  showText(ereignis$ ( 65 ));
  While a$ = ""
    a$ = Inkey$
  Wend
  if Upper$ ( a$ ) = Mid$ ( "JOY" , code , 1 )
    showText(ereignis$ ( 66 ));
    //Call 'clickmouse$'
    Call 'screco$'
    verbRein();
    Return
  } else {
    go = 3
    Goto game_over
  }*/

  initNeu();
 }

 function initNeu()
 {
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
    switchScreen(0);
    Gr Writing 0
    Ink 1 , 0
    Text 70 , 60 , "BITTE LEGEN SIE DIE ZWEITE DISK EIN"
    While Not Exist ( pfad$ )
    Wend
    Cls 0
 }
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
 }
 Gosub init_befehle
 switchScreen(3);
 Call 'iconbank$' [ 2 ]
 Get Icon Palette
 Priority Reverse On
 switchScreen(4);
 Cls 32
 switchScreen(0);
 Reserve Zone 20
 Return

function showText(t)
{
  console.log(t);
  /*
 Procedure txt$ [ t$ ]
    Shared name$
    zeilen = 0
    stelle = 2
    switchScreen(0);
    Do
       stelle2 = Instr$ ( t$ , Chr$ ( 10 ) , stelle )
       txt$ = Mid$ ( t$ , stelle , stelle2 - stelle )
       If txt$ = "*"
          Exit
       EndIf
       stelle = stelle2 + 1
       Inc zeilen
    Loop
    h = zeilen * 7 + 4
    w = 0
    stelle = 2
    For i = 1 To zeilen
       stelle2 = Instr$ ( t$ , Chr$ ( 10 ) , stelle )
       txt$ = Mid$ ( t$ , stelle , stelle2 - stelle )
       t = Text Length ( txt$ )
       w = Max ( w , t )
       stelle = stelle2 + 1
    Next
    Add w , 5
    x = Rnd ( 315 - w ) + 3
    y = Rnd ( 127 - h ) + 1
    pos = 1
    txt$ = ""
    Screen Copy 4 , x - 3 , y - 1 , x + w - 3 , y + h - 1 To 0 , x , y , 11100000
    If ( name$ = "GOG" ) Or ( name$ = "GOK" )
       Ink 30 , 0
    Else
       Ink 1
    EndIf
    Box x + 1 , y + 1 To x + w - 2 , y + h - 2
    Gr Writing 0
    stelle = 2
    Add y , 6
    For i = 1 To zeilen
       stelle2 = Instr$ ( t$ , Chr$ ( 10 ) , stelle )
       txt$ = Mid$ ( t$ , stelle , stelle2 - stelle )
       If txt$ = "*"
          Exit
       EndIf
       Text x + 3 , y + 1 , txt$
       stelle = stelle2 + 1
       Add y , 7
    Next
    Gr Writing 1
 End Proc
 */
}
