var game = new Phaser.Game(320, 252, Phaser.AUTO, '', { preload: preload, create: create, update: update }, false, false);

JOY = {
  state: {
    inventar: Array(24),
    flag: Array(70),
    verb: Array(16),
    geg: Array(255),
    transport: Array(255),

    // raumName was raum
    raumName: [null ,"REDAKTION VORNE" , "REDAKTION HINTEN" , "KÜCHE" , "FLUR" ,
               "BÜRO", "DUNKELKAMMER", "WENDELTREPPE", "DACHBÜRO", "DACH", "2. STOCKWERK",
               "PLATEAU", "ARCHIV", "1. STOCKWERK", "HOF", "ERDGESCHOß", "SUPERMARKT",
               "KELLER", "VORHALLE", "BUCHHANDEL", "GANG", "GEHEIMRAUM", "HERBIS QUEST",
               "LAMEBOY", "FUßWEG", "M PARK", "COMPUTERSHOP"],
    zurueck: [null, 2, 1, 2, 1, 4, 4, 4, 7, 8, 6, 7, 13, 10, 0,  14, 24, 15, 15, 15, 0, 17, 1, 0, 15, 0, 24],
    betreten: Array(26),

    // personName was person (string). This collides with person (int)
    personName: [null, "???", "???", "???", "VERKÄUFERIN", "???", "???", "???", "???", "???", "???", "", "MANN", "SPACERAT", "DER TOD", "LEICHE", "LUTZ", "KRANKENSCHWESTER", "KARSTEN KÜSTER", "MICHAEL KAFKE", "DANIEL SCHWEN"],
    person: [null, 0, 4, 4, 16, 4, 4, 4, 4, 4, 4, 0, 15, 0, 0, 0, 0, 18, 0, 25, 25], // room number each person is in

    personen: Array(10),   // list of portraits displayed up top
    reden: Array(20),
    invent: Array(24),
    raumaddierer: [null, 18 , 35 , 50 , 55 , 71 , 91 , 95 , 111 , 114 , 117 , 120 , 134 , 137 , 142 , 149 , 166 , 174 , 181 , 187 , 197 , 203 , 212 , 223 , 237 , 244 , 255],
    c: Array(9),
    name: Array(11),
    score: Array(11),
    handlung: Array(6),
    frage: Array(11), antwort: Array(10), ja: Array(10), nein: Array(10),
    erscheinen: Array(11), alterscheinen: Array(11),
    rtext: Array(11),
    fahrx: [null, 85, 85, 85, 85, 85 , 122, 122 , 122 , 122],
    fahry: [null, 92, 69, 46, 23,  0 ,  23,   0 ,  49 ,  92],
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
  bank: "gesicht_",
  ereignis: [],

  //data
  verben: [null, "BETRACHTE" , "ÖFFNE" , "SCHLIEßE" , "ZIEHE" , "DRÜCKE" , "UMSCHAUEN" , "BENUTZE" , "SCHALTE EIN" , "SCHALTE AUS" , "GEHE ZU" , "ZURÜCK" , "NIMM" , "GIB" , "SPIELSTAND SPEICHERN" , "SPIELSTAND LADEN" , "REDE MIT"]
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
  game.load.json('zones', 'assets/daten/zones.json');
  game.load.json('objtrans', 'assets/daten/objtrans.json');
  game.load.json('texte', 'assets/texteDeutsch/text.json');
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
  initialisieren();
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
      if (verbRm()) {
        schreibeSatz();
      }
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

// AMOS Functions
function SwitchScreen(s) { JOY.screen = s; }
function YScreen(y) { return y - JOY.screeny[JOY.screen]; }
function XScreen(x) { return x; }
function YMouse() { return game.input.y; }
function XMouse() { return game.input.x; }
function SetZone(n,x1,y1,x2,y2) { JOY.state.zones[JOY.screen][n] = [x1,y1,x2-x1,y2-y1]; }
function ResetZone(n) { JOY.state.zones[JOY.screen][n] = null; }
function BobOff(n) {
  var b = JOY.bobs[JOY.screen];
  if (b) {
    b[i].destroy();
    b[i] = null;
  }
}
function Bob(n,x,y,i) {
  BobOff(n);
  var b = JOY.bobs[JOY.screen];
  b[n] = game.add.sprite(x, y+JOY.screeny[JOY.screen], JOY.bank + i);
}
function ClrBobs() {
  var i, b = JOY.bobs[JOY.screen];
  for (i=0; i<b.length; ++b) {
    if (b) {
      b[i].destroy();
      b[i] = null;
    }
  }
}

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
    if (z[i] && mx >= z[i][0] && my >= z[i][1] && mx < (z[i][0]+z[i][2]) && my < (z[i][1]+z[i][3]))
      return i + 1;
  }
  return 0;
}

function schreibeSatz()
{
  var ms = mouseScreen();
  if (ms != 3) {
    SwitchScreen(1);
    //Ink 0 , 5
    if (JOY.state.geg[JOY.geg1] == "RÜCK") {
      if (JOY.verb == 10) {
        //Text 2 , 6 , verb$ ( verb ) + geg$ ( geg1 ) + geg$ ( 0 )
        return;
      } else {
        JOY.geg1 = 0;
      }
    }
    if (JOY.geg1 == 227 && JOY.verb == 10) {
      //Text 2 , 6 , verb$ ( verb ) + geg$ ( geg1 ) + geg$ ( 0 )
      return;
    }
    //Text 2 , 6 , verb$ ( verb ) + " " + geg$ ( geg1 ) + geg$ ( 0 )
  } else {
    SwitchScreen(1);
    //Text 2 , 6 , verb$ ( verb ) + " " + person$ ( pers ) + geg$ ( 0 )
  }
}

function schreibeSatzteil()
{
  var ms = mouseScreen();
  if (ms != 3) {
    SwitchScreen(1);
    //Ink 0 , 5
    if ( JOY.state.geg[JOY.geg2] == "RÜCK" || JOY.geg1 == JOY.geg2) {
      geg2 = 0;
    }
    // Text 2 , 6 , verb$ ( verb ) + " " + geg$ ( geg1 ) + " AN " + geg$ ( geg2 ) + geg$ ( 0 )
  } else {
    SwitchScreen(1);
    //Text 2 , 6 , verb$ ( verb ) + " " + geg$ ( geg1 ) + " AN " + person$ ( pers ) + geg$ ( 0 )
  }
}

// verb_rm
// return false = pop; goto parser
function verbRm()
{
  function geheZu()
  {
    //commented out below (blocking loop)
  }

  var ms = mouseScreen();
  if (ms == 0) {
    /*
    showText(Chr$ ( 10 ) + "PUNKTE:" + Str$ ( punkte ) + Chr$ ( 10 ) + "KLICKS:" + Str$ ( zeit ) + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
    While Mouse Key = 2
    Wend
    if (Mouse Key = 3) {
       Ink 0
       Bar 10 , 10 To 310 , 47
       Ink 1 , 0
       Box 11 , 11 To 309 , 46
       Text 65 , 20 , "WIEVIELE KLICKS LANG WILLST DU WARTEN ?"
       Call 'eingabe$' [ 150 , 28 , 10 , "" , 1 , 2 ]
       if (Val ( Param$ ) > 0) {
          Call 'befehle_runter$'
          For i = 1 To Val ( Param$ )
             Gosub handlung
          Next
          Call 'befehle_hoch$'
       }
    }
    Call 'screco$'
    */
    //Pop
    //Goto parser
    return false;
  }
 if (ms == 1) {
    if (mouseZone() == 2 && ( YScreen(YMouse()) / 9 + 9 == 10 )) {
       verbRaus();
       JOY.verb2 = JOY.verb;
       JOY.verb = 10;
       //Paste Icon 58 , ( verb - 9 ) * 9 , verb + 15
       JOY.r = 1;

       //Label gehe_zu:
       initRText();
       initText();
       var rm = 0;
       /*
       While Mouse Click <> 1
          ym = ( YScreen(YMouse()) + 4 ) / 8
          if (ym > 0 && ym < anzahl) {
             if (rtext$ ( ym ) = raum) {
                Gosub init_text
                rm = ym
                Goto gehe_zu2
             }
          }
          if (ym <> rm && ym > 0 && ym < anzahl) {
             Gosub init_text
             Ink 17 , 1
             t = Text Length ( raum$ ( rtext$ ( ym ) ) )
             Text 160 - t / 2 , ym * 8 + 1 , raum$ ( rtext$ ( ym ) )
             rm = ym
          }
          if (ym <> rm && ym = anzahl) {
             Gosub init_text
             Ink 17 , 1
             t = Text Length ( "WEITER" )
             Text 160 - t / 2 , ym * 8 + 1 , "WEITER"
             rm = ym
          }
          if (ym < 1 || ym > anzahl) {
             Gosub init_text
             rm = 0
          }
          Label gehe_zu2:
       Wend
       if (ym < 0 || ym > anzahl) {
          Call 'screco$'
          Return
       }
       if (ym = anzahl) {
          if (r = 27) {
             r = 1
          }
          //Call 'screco$'
          geheZu();
          return;
       }
       if (ym > 0 && ym < anzahl && Not rtext$ ( ym ) = raum) {
          if (!pruefSprung())
            return false;
          JOY.gehe = 1;
          initRaum();
          Return
       }
       // Call 'screco$'
       */
    }
 }
 if (ms == 3) {
    JOY.verb2 = JOY.verb;
    JOY.verb = 16;
    SwitchScreen(1);
    Text 2 , 6 , "REDE MIT " + person$ ( pers ) + geg$ ( 0 )

    //Gosub "Raum" + Str$ ( raum ) - " "
    if (!JOY.raumFunc[JOY.state.raum]()) return false;
    if (!raumAlle()) return false;

    JOY.verb = JOY.verb2;
 }
 return true;
}

// return false = pop; goto parser
function pruefSprung()
{
  JOY.r = rtext$ ( ym )
  if (JOY.state.raum == 1) {
    if (JOY.r > 3) {
      JOY.state.flag[1] = 1;
    }
    if (JOY.state.handlung[3] == 5 && JOY.state.handlung[4] == 0) {
      JOY.state.handlung[4] = 1;
      showText(ereignis$ ( 29 ));
      //Call 'clickmouse$'
      JOY.state.person[2] = 0;
      JOY.state.person[16] = 20;
    }
  }
  if (JOY.state.raum == 3 && (JOY.state.flag[9] == 1 || JOY.state.flag[10] == 1 || JOY.state.flag[11] == 1 || JOY.state.flag[12] == 1 || JOY.state.flag[13] == 1 || JOY.state.flag[52] == 1 )) {
    showText(JOY.ereignis[8]);
    //Call 'clickmouse$'
    // Call 'screco$'
    //Pop
    //Goto parser
    return false;
  }
  if ((JOY.state.raum == 6 && JOY.r == 10) || (JOY.r > 11 && JOY.state.flag[26] == 1)) {
    showText(Chr$ ( 10 ) + "MACH DAS LIEBER NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
    //Call 'clickmouse$'
    //Call 'screco$'
    //Pop
    //Goto parser
    return false;
  }
  if (JOY.state.raum == 14 && JOY.state.flag[36] == 0) {
    showText(Chr$ ( 10 ) + "DIE TÜR IST ZU !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
    //Call 'clickmouse$'
    //Call 'screco$'
    //Pop
    //Goto parser
    return false;
  }
  if (JOY.state.raum == 16) {
    if (JOY.state.flag[39] == 0 && (JOY.state.transport[150] == 2 || JOY.state.transport[151] == 2 || JOY.state.transport[152] == 2 || JOY.state.transport[153] == 2 || JOY.state.transport[154] == 2 || JOY.state.transport[155] == 2 || JOY.state.transport[162] == 2 || JOY.state.transport[163] == 2 || JOY.state.transport[164] == 2 || JOY.state.transport[165] == 2)) {
      go = 1;
      //Goto game_over
      gameOver();
    }
  }
  if (JOY.state.raum == 19 && JOY.state.flag[47] == 0) {
    showText(Chr$ ( 10 ) + "DIE TÜR IST ZU !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
    //Call 'clickmouse$'
    //Call 'screco$'
    //Pop
    //Goto parser
    return false;
  }

  return true;
}

// init_rtext
function initRText()
{
  for (var i = 1; i <= 10; ++i) {
    JOY.state.rtext[i] = 0;
  }

  var anzahl = 0;
  var s = 1;

  do {
    if (JOY.state.betreten[r] == 1) {
      JOY.state.rtext[s] = r;
      s++;
      anzahl++;
    }
    r++;
  } while(r<=26 && s <= 10);

  anzahl++;
  SwitchScreen(0);
  //Screen Copy 4 , 118 , 1 , 201 , anzahl * 8 + 5 To 0 , 118 , 1 , 11100000
  //Ink 1
  //Box 119 , 2 To 201 , anzahl * 8 + 3
}

// init_text
function initText()
{
  SwitchScreen(0);
  //Gr Writing 0
  //Ink 1 , 0
  var y = 1;
  var s = 1;

  while (rtext$ ( s ) > 0) {
    //t = Text Length ( raum$ ( rtext$ ( s ) ) )
    //Text 160 - t / 2 , ( y * 8 ) + 1 , raum$ ( rtext$ ( s ) )
    y++;
    s++;
  }

  //t = Text Length ( "WEITER" )
  //Text 160 - t / 2 , y * 8 + 1 , "WEITER"
}

// return false = pop; goto parser
function verbAusfuehren()
{
  if (JOY.geg1 == 0) {
    return;
  }
  if (JOY.state.raum == 14 && JOY.geg1 == 140 && JOY.state.handlung[3] == 6) {
    showText(ereignis$ ( 86 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    // Pop
    // Goto parser
    return false;
  }

  var mz, ms = mouseScreen();
  if (JOY.verb == 1) {
    if (ms === 0) {
      showText(JOY.state.objekt[JOY.geg1 - JOY.raumaddierer[JOY.state.raum - 1]]);
      //Call 'clickmouse$'
    }
    if (ms == 1) {
      SwitchScreen(1);
      mz = mouseZone();
      if (mz > 4) {
        showText(JOY.state.invent[mz - 4]);
        //Call 'clickmouse$'
      }
    }
  }
  if (JOY.verb == 7 || JOY.verb == 13) {
    //Gosub "Raum" + Str$ ( raum ) - " "
    if (!JOY.raumFunc[JOY.state.raum]()) return false;

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
    verbRm();
    Gosub schreibe_satzteil
    }
    if (mc == 1) {
    verbWaehlen();
    }
    if (geg2 = 0 && pers = 0 {) {
    Goto parser2
    }
    if (mc = 1 {) {
    verbWaehlen();
    }
    */
    //Goto parser
    return;
  }

  // GEHE ZU_RUECK_
  if (JOY.verb == 10 && JOY.state.geg[JOY.geg1] == "RÜCK" ) {
    //Gosub "RAUM" + ( Str$ ( raum ) - " " )
    if (!JOY.raumFunc[JOY.state.raum]()) return false;;
    r = JOY.state.zurueck[JOY.state.raum]
    initRaum();
    //Pop
    //Goto parser
    return false;
  }
  if (JOY.verb == 12) {
    if (ms == 0) {
      //Gosub "RAUM" + ( Str$ ( raum ) - " " )
      if (!JOY.raumFunc[JOY.state.raum]()) return false;;
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
  }

  return verbAusfuehren2();
}

// return false = pop; goto parser
function verbAusfuehren2()
{
  handlung();
  // Gosub "Raum" + Str$ ( raum ) - " "
  if (!JOY.raumFunc[JOY.state.raum]()) return false;

  // there is a "Pop; Goto parser" in there
  if (!raumAlle()) return false;

  verbBestaetigen();
  // Call 'screco$'
}

function verbWaehlen()
{
 SwitchScreen(1);
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
          SwitchScreen(1);
          Text 2 , 6 , "UMSCHAUEN: " + JOY.state.raum[raum]
          showText(umgebung$);
          //Call 'clickmouse$'
          //Call 'screco$'
          SwitchScreen(1);
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
          if (!JOY.raumFunc[JOY.state.raum]()) return false;;
          r = JOY.state.zurueck[raum]
          //Call 'maus_aus$'
          initRaum();
          //Call 'maus_an$'
          SwitchScreen(1);
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
       SwitchScreen(1);
       Ink 0 , 5
       Text 2 , 6 , "SPIELSTAND SPEICHERN" + JOY.state.geg[0]
       Paste Icon 58 , 46 , 29
       showText(Chr$ ( 10 ) + "HAUN SIE MAL KURZ IHRE SAVEDISK IN DF0:" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
       Dir$ = "Df0:"
       if (Dfree < 6000) {
          showText(Chr$ ( 10 ) + "DIE DISKETTE IST ZU VOLL !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          //Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          SwitchScreen(1);
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
       if (wrpro = 80) {
          showText(Chr$ ( 10 ) + "DIESE DISKETTE IST SCHREIBGESCH�TZT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'screco$'
          SwitchScreen(1);
          Paste Icon 58 , 46 , 14
          verbRein();
          Pop
          Goto parser
       } else { if (wrpro = 81) {
          showText(Chr$ ( 10 ) + "DIESE DISKETTE IST NICHT VALIDIERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          Call 'screco$'
          SwitchScreen(1);
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
       Text 32 , 20 , "BITTE GEBEN SIE DEN NAMEN FÜR DEN SPIELSTAND EIN:"
       altname$ = antwort$ ( ym )
       Call 'eingabe$' [ 135 , 28 , 10 , antwort$ ( ym ) , 1 , 1 ]
       name$ = Param$
       showText(Chr$ ( 10 ) + "ICH SPEICHERE DEN SPIELSTAND FÜR DICH !" + Chr$ ( 10 ) + "(ALLES MUß MAN SELBER MACHEN)" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       if (Exist ( "Df0:Joy_File_" + Str$ ( ym ) - " " + "." + altname$ )) {
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
       SwitchScreen(1);
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
       SwitchScreen(1);
       Ink 0 , 5
       Text 2 , 6 , "SPIELSTAND LADEN" + geg$ ( 0 )
       Paste Icon 58 , 68 , 30
       showText(Chr$ ( 10 ) + "HAUN SIE MAL KURZ IHRE SAVEDISK IN DF0:" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       Call 'screco$'
       Dir$ = "Df0:"
       Gosub hol_namen
       if (gespeichert$ ( ym ) = 0) {
          showText(ereignis$ ( 68 ));
          //Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          SwitchScreen(1);
          Paste Icon 58 , 68 , 15
          verbRein();
         // Pop
         // Goto parser
         return false;
       }
       //showText(Chr$ ( 10 ) + "ICH LADE DEN SPIELSTAND FÜR DICH !" + Chr$ ( 10 ) + "(ALLES MUß MAN SELBER MACHEN)" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
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

       SwitchScreen(1);
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
    if (Left$ ( file$ , 10 ) = " Joy_File_") {
       i = Asc ( Mid$ ( file$ , 11 , 1 ) ) - 48
       antwort$ ( i ) = Mid$ ( file$ , 13 , 10 ) - " "
       gespeichert$ ( i ) = 1
    }
    file$ = Dir Next
 Until file$ = ""
 Screen Copy 4 , 118 , 1 , 201 , 77 To 0 , 118 , 1 , 11100000
 SwitchScreen(0);
 Ink 1
 Box 119 , 2 To 199 , 75
 Gosub zeige_namen
 rm = 0
 While Mouse Click <> 1
    ym = ( Y Screen ( Y Mouse ) + 4 ) / 8
    if (ym <> rm && ym > 0 && ym < 10) {
       Gosub zeige_namen
       if (gespeichert$ ( ym ) = 0) {
          Ink 17 , 1
          t = Text Length ( antwort$ ( ym ) )
          Text 160 - t / 2 , ym * 8 + 1 , antwort$ ( ym )
       }
       rm = ym
    }
    if (ym < 1 || ym > 9) {
       Gosub zeige_namen
       rm = 0
    }
 Wend
 if (ym < 0 || ym > 9) {
    Call 'screco$'
    SwitchScreen(1);
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
 SwitchScreen(0);
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
       // Call 'screco$'
    } else {
       JOY.oeffne = 0;
    }
 }
 if (JOY.verb == 3) {
   if (JOY.schliesse == 0) {
      showText(Chr$ ( 10 ) + "DAS GEHT NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    } else {
       JOY.schliesse = 0;
    }
 }
 if (JOY.verb == 4) {
   if (JOY.ziehe == 0) {
      showText(Chr$ ( 10 ) + "DAS GEHT NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    } else {
       JOY.ziehe = 0;
    }
 }
 if (JOY.verb == 5) {
   if (JOY.druecke == 0) {
      showText(Chr$ ( 10 ) + "ES PASSIERT NICHTS !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    } else {
       JOY.druecke = 0;
    }
 }
 if (JOY.verb == 7) {
   if (JOY.benutze == 0) {
      showText(Chr$ ( 10 ) + "ES PASSIERT NICHTS !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    } else {
       JOY.benutze = 0;
    }
 }
 if (JOY.verb == 8) {
   if (JOY.schalte == 0) {
      showText(Chr$ ( 10 ) + "DAS GEHT NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    } else {
       schalte = 0
       showText(Chr$ ( 10 ) + "O.K." + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'

       // add "(AN)" suffix
       JOY.state.geg[JOY.geg1] += "(AN)";
    }
 }
 if (JOY.verb == 9) {
   if (JOY.schalte == 0) {
      showText(Chr$ ( 10 ) + "DAS GEHT NICHT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    } else {
       schalte = 0;
       showText(Chr$ ( 10 ) + "O.K." + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'

       // remove "(AN)" suffix
       var s = JOY.state.geg[JOY.geg1];
       JOY.state.geg[JOY.geg1] = s.substr(0, s.length-4);
    }
 }
 if (JOY.verb == 10) {
   if (JOY.gehe == 0) {
      showText(Chr$ ( 10 ) + "DORT KANNST DU NICHT HINGEHEN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    } else {
       JOY.gehe = 0;
    }
 }
 if (JOY.verb == 13) {
   if (JOY.gib == 0) {
      showText(Chr$ ( 10 ) + "ABER VIELLEICHT KANNST DU DIESEN GEGENSTAND" + Chr$ ( 10 ) + "NOCH GEBRAUCHEN ?" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    } else {
       JOY.gib = 0;
    }
 }
}

function testScreen()
{
  var mz;

  switch (mouseScreen())
  {
    case 0:
      SwitchScreen(0);
      mz = mouseZone();
      JOY.geg = JOY.state.raumaddierer[JOY.state.raum - 1 ] + mz;
      if (JOY.geg == JOY.state.raumaddierer[JOY.state.raum - 1]) {
        JOY.geg = 0;
      }
      break;

    case 1:
      SwitchScreen(1);
      mz = mouseZone();
      if (mz > 4) {
        JOY.geg = JOY.state.inventar[mz - 4];
      } else {
        JOY.geg = 0;
      }
      break;

    case 3;
      SwitchScreen(3);
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
        SwitchScreen(2);
        Bob(2, 54, 41, 3);
        SwitchScreen(0);
        SetZone(2, 50, 39, 61, 51);
     } else {
        SwitchScreen(2);
        Bob(14, 49, 0, 4);
        SwitchScreen(0);
        SetZone(2, 61, 20, 67, 30);
     }
  } else {
     if (JOY.state.flag[1] == 1) {
        SwitchScreen(2);
        Bob(14, 49, 0, 8);
     }
  }
  if (JOY.state.transport[5] == 1) {
     SwitchScreen(2);
     Bob(5, 305, 34, 5);
     SwitchScreen(0);
     SetZone(5, 306, 33, 316, 47);
  }
  if (JOY.state.flag[5] == 0) {
     SwitchScreen(2);
     Bob(16, 282, 0, 7);
     SwitchScreen(0);
     SetZone(18, 281, 0, 319, 54);
  } else {
     SwitchScreen(0);
     SetZone(16, 281, 0, 319, 54);
  }
  if (JOY.state.flag[3] == 1 && JOY.state.flag[4] = 1 && ( JOY.state.handlung[2] = 0 || JOY.state.handlung[2] = 3 )) {
     SwitchScreen(2);
     Bob(6, 136, 81, 6);
  }
  if (JOY.state.handlung[2] > 0 && JOY.state.handlung[2] < 3) {
     SwitchScreen(2);
     Bob(6, 136, 81, 9);
  }
  if (JOY.state.flag[2] = 0) {
     if (JOY.state.transport[8] = 1) {
        SwitchScreen(2);
        Bob(8, 57, 123, 2);
        SwitchScreen(0);
        SetZone(8, 57, 123, 85, 128);
     }
  } else {
     if (JOY.state.transport[9] = 1) {
        SwitchScreen(2);
        Bob(9, 57, 123, 2);
        SwitchScreen(0);
        SetZone(9, 57, 123, 85, 128);
     }
  }
  if (JOY.state.person[8] = 1) {
     SwitchScreen(2);
     Bob(19, 0, 34, 10);
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
       JOY.state.flag[2] = 1;
       JOY.state.transport[8] = 0;
       JOY.state.transport[9] = 1;
       SwitchScreen(2);
       BobOff(8);
       Bob(9, 57, 123, 2);
       // Call 'screco$'
       SwitchScreen(0);
       ResetZone(8);
       SetZone(9, 57, 123, 85, 127);
    }
    if (JOY.geg1 == 12) {
       Bset.<> 2 , JOY.state.flag[53]
    }
    if (JOY.geg1 == 13) {
       JOY.state.flag[54] = 1;
       JOY.state.person[1] = 1;
       personenDisplay();
       if (JOY.state.personName[1] == "???" && JOY.state.flag[56] == 1) {
          JOY.state.personName[1] = "JUPP"
       }
    }
  }
  if (JOY.verb == 2 && geg1 = 14 && JOY.state.flag[1] = 0 && JOY.state.transport[2] = 1) {
    oeffne = 1;
    JOY.state.flag[1] = 1;

    SwitchScreen(2);
    BobOff(2);
    Bob(14, 49, 0, 4);

    // Call 'screco$'
    SwitchScreen(0);

    ResetZone(2);
    SetZone(2, 61, 20, 67, 30);
    if (JOY.state.flag[56] = 0) {
       showText(JOY.ereignis[10]);
       //Call 'clickmouse$'
       // Call 'screco$'
       JOY.state.flag[56] = 1
       JOY.state.betreten[2] = 0
       JOY.state.betreten[3] = 0
       For i = 2 To 10
          if (JOY.state.person[i] = 4
             JOY.state.person[i] = 1
          }
       Next
       personenDisplay();
       if (JOY.state.personName[1] = "???") {
          JOY.state.personName[1] = "JUPP"
       }
    }
 }
 if (JOY.verb == 3 && geg1 = 14 && JOY.state.flag[1] = 1 && JOY.state.transport[2] == 1) {
    schliesse = 1;
    JOY.state.flag[1] = 0;

    SwitchScreen(2);
    BobOff(14);
    Bob(2, 54, 41, 3);
    // Call 'screco$'

    SwitchScreen(0);
    SetZone(2, 50, 39, 61, 51);
 }
 if (JOY.verb == 4) {
    if (JOY.geg1 == 2 && JOY.state.transport[2] == 1) {
       ziehe = 1;
       if (JOY.state.flag[1] == 0 || JOY.state.flag[1] == 2) {
          g = geg1;
          aufnehmen();
       } else {
          SwitchScreen(2);
          Bob(14, 49, 0, 8);

          g = 2;
          mz = 2;
          aufnehmen();
       }
    }
 }
 if (( verb == 5 || verb == 8 ) && geg1 == 10) {
    showText(Chr$ ( 10 ) + "ABER ES IST DOCH NOCH HELL!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
    //Call 'clickmouse$'
    // Call 'screco$'
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
          SwitchScreen(2);
          Bob(2, 54, 41, 3);
          // Call 'screco$'
          SwitchScreen(0);
          SetZone(2, 50, 39, 61, 51);
       } else {
          SwitchScreen(2);
          Bob(14, 49, 0, 4);
          // Call 'screco$'
          SwitchScreen(0);
          SetZone(2, 61, 20, 67, 30);
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
       // Call 'screco$'
       punkte(100);
    }
    if (JOY.geg1 == 134 && geg2 == 7 && JOY.state.handlung[2] == 2) {
       JOY.benutze = 1
       showText(JOY.ereignis[39]);
       //Call 'clickmouse$'
       // Call 'screco$'
       g = 134;
       ablegen();
       JOY.state.handlung[2] = 3;
       JOY.state.person[3] = 1;
       personenDisplay();
       SwitchScreen(2);
       Bob(6, 136, 81, 6);
       // Call 'screco$'
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
          // Call 'screco$'
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
          SwitchScreen(2);
          Bob(6, 136, 81, 6);
          // Call 'screco$'
       }
    }
    if (JOY.geg1 == 7 && JOY.state.flag[4] == 0) {
       schalte = 1
       JOY.state.flag[4] = 1
       Gosub test_recall
       if (JOY.state.flag[3] = 1) {
          SwitchScreen(2);
          Bob(6, 136, 81, 6);
          // Call 'screco$'
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
          SwitchScreen(2);
          BobOff(6);
          // Call 'screco$'
       } else {
          showText(Chr$ ( 10 ) + "DENK AN HERBERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          //Call 'clickmouse$'
          // Call 'screco$'
          Pop
          Goto parser
       }
    }
    if (JOY.geg1 == 7 && JOY.state.flag[4] == 1) {
       if (JOY.state.handlung[2] = 0 || JOY.state.handlung[2] = 3) {
          schalte = 1
          JOY.state.flag[4] = 0
          SwitchScreen(2);
          BobOff(6);
          // Call 'screco$'
       } else {
          showText(Chr$ ( 10 ) + "DENK AN HERBERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          //Call 'clickmouse$'
          // Call 'screco$'
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
    // Call 'screco$'
    verbRaus();
    verb = verb2
    verbRein();
    Pop
    Goto parser
 }
 if (JOY.verb == 12 && geg1 == 2) {
    showText(JOY.ereignis[80]);
    //Call 'clickmouse$'
    // Call 'screco$'
    Pop
    Goto parser
 }
 if (JOY.verb == 13 && geg1 == 162 && pers == 5 && JOY.state.handlung[1] == 2) {
    gib = 1
    showText(JOY.ereignis[34]);
    //Call 'clickmouse$'
    // Call 'screco$'
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
          // Call 'screco$'
          verb = verb2
          Pop
          Goto parser
       } else {
          showText(Chr$ ( 10 ) + "LAß MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          //Call 'clickmouse$'
          // Call 'screco$'
          verb = verb2
          Pop
          Goto parser
       }
    }
    if (pers == 2 || pers == 3 || pers == 5 || pers == 6 || pers == 7 && JOY.state.reden[pers] == 0) {
       showText(Chr$ ( 10 ) + "LAß MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
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
          showText(Chr$ ( 10 ) + "LAß MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          //Call 'clickmouse$'
          // Call 'screco$'
       }
    }
    if (pers == 18) {
       Call 'unterhaltung_laden$' [ 14 ]
       Call 'unterhaltung$'
       if (Btst ( 2 , gefragt )) {
          JOY.state.personName[7] = "HANS-WERNER"
          JOY.state.personName[9] = "RAINER"
          JOY.state.personName[10] = "ANJA"
          punkte(113);
       }
       JOY.verb = JOY.verb2;
       //Pop
       //Goto parser
       return false;
    }
 }

 return true;
}

// return false = pop; goto parser
function raumAlle()
{
  if (JOY.verb == 1) {
    if (JOY.geg1 == 8 && JOY.state.transport[8] == 2) {
       JOY.state.flag[2] = 1;
       // TODO mz -> JOY.mz
       JOY.state.inventar[mz-4] = 9;
       JOY.state.invent[mz-4] = Chr$ ( 10 ) + "DIE HAST DU SCHON GELESEN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 );
       inventory();
       JOY.state.transport[8] = 0;
       JOY.state.transport[9] = 2;
    }
    if (JOY.geg1 == 11) {
       Bset.<> 1 , flag$ ( 53 )
    }
    if (geg1 = 15) {
       JOY.state.personName[1] = "JUPP JENNSEN";
       JOY.state.flag[54] = 1;
       JOY.state.person[1] = JOY.state.raum;
       personenDisplay();
       punkte(100);
    }
 }
   if (JOY.verb == 2) {
    if (JOY.geg1 = 110) {
       JOY.oeffne = 1;
       showText(Chr$ ( 10 ) + "TOLL ! JETZT HAST DU DIE AUFNAHMEN ZERSTÖRT !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
       JOY.g = 110;
       ablegen();
    }
    if (geg1 = 127 && flag$ ( 42 ) > 0) {
       JOY.oeffne = 1;
       JOY.state.flag[42] = 0;

       //Gosub testinventar
       if (!testInventar())
         return false;

       Call 'iconbank$' [ 1 ]
       Screen 0
       for (var i = 1; i <= 24; ++i) {
          if (JOY.state.inventar[i] == 0) {
             JOY.state.inventar[i] = 165;
             JOY.state.invent[i] = Chr$ ( 10 ) + "DIESE BATTERIEN SIND FAST SCHON WIE" + Chr$ ( 10 ) + "STROM AUS DER STECKDOSE" + Chr$ ( 10 ) + "*" + Chr$ ( 10 );
             break;
          }
       }
       inventory();
       JOY.state.transport[165] = 2;
       JOY.state.geg[127] = "TASCHENLAMPE";
       //Pop
       //Goto parser
       return false;
    }
 }
 if (JOY.verb == 7) {
    if (JOY.geg1 == 165 && JOY.geg2 == 127 && JOY.state.flag[42] == 0) {
       JOY.benutze = 1;
       JOY.state.flag[42] = 1;
       JOY.g = 165;
       ablegen();
       JOY.state.transport[165] = 1;
       JOY.state.geg[127] = "TASCHENLAMPE+BATTERIEN";
    }
    if (JOY.geg1 == 222 && JOY.geg2 == 223 && JOY.state.raum != 12) {
       showText(Chr$ ( 10 ) + "WORAN DENN, DU NASE ?" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       //Call 'clickmouse$'
       // Call 'screco$'
       //Pop
       //Goto parser
       return false;
    }
 }
 if (JOY.verb == 8) {
    if (JOY.geg1 == 127 && JOY.state.flag[42] == 1) {
       JOY.schalte = 1;
       JOY.state.flag[42] == 2;
    }
 }
 if (JOY.verb == 9) {
    if (geg1 == 127 && JOY.state.flag[42] == 2) {
       JOY.schalte = 1;
       JOY.state.flag[42] == 1;
    }
 }
 if (JOY.verb = 13 && geg1 = 131 && pers = 9) {
    JOY.gib = 1;
    JOY.g = 131;
    ablegen();
    showText(JOY.ereignis[54]);
    //Call 'clickmouse$'
    // Call 'screco$'
    //Pop
    //Goto parser
   return false;
 }
 if (JOY.verb == 16) {
    if (JOY.pers == 1) {
       showText(Chr$ ( 10 ) + "F�HRST DU IMMER SELBSTGESPR�CHE ?" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
       // Call 'clickmouse$'
       // Call 'screco$'
    }
    if (JOY.pers == 8) {
       if (JOY.state.reden[8] == 0) {
          //Call 'unterhaltung_laden$' [ 1 ]
          unterhaltungLaden(1);
          //Call 'unterhaltung$'
          unterhaltung();
          JOY.state.reden[8] = 1;
          punkte(53);
          JOY.verb = JOY.verb2;
       //Pop
       //Goto parser
       return false;
       }
       if (JOY.state.reden[8] == 1) {
          showText(Chr$ ( 10 ) + "ICH HABE ES EILIG !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          // Call 'clickmouse$'
          // Call 'screco$'
       }
    }
    if (JOY.pers == 9) {
       if (JOY.state.reden[9] == 0) {
          //Call 'unterhaltung_laden$' [ 3 ]
          unterhaltungLaden(3);
          //Call 'unterhaltung$'
          unterhaltung();

          if (Btst ( 0 , gefragt )) {
             JOY.state.reden[9] = 1;
             if (JOY.state.transport[36] == 1) {
                showText(ereignis$ ( 22 ));
                //Call 'clickmouse$'
                // Call 'screco$'
                JOY.state.transport[36] = 0;
             } else {
                showText(ereignis$ ( 21 ));
                //Call 'clickmouse$'
                // Call 'screco$'
             }
          }
          JOY.verb = JOY.verb2;
       //Pop
       //Goto parser
       return false;
       }
       if (reden$ ( 9 ) = 1) {
          showText(Chr$ ( 10 ) + "ICH STREIKE !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
          //Call 'clickmouse$'
          // Call 'screco$'
       }
    }
 }
 if (JOY.state.flag[53] == 111 && JOY.state.flag[30] == 0) {
    JOY.state.flag[30] = 1;
    showText(JOY.ereignis[2]);
    //Call 'clickmouse$'
    // Call 'screco$'
    punkte(500);
 }
 return true;
}

 Label test_recall:
 if (handlung$ ( 6 ) = 5 && flag$ ( 58 ) = 11) {
    showText(ereignis$ ( 59 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    showText(ereignis$ ( 60 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    showText(ereignis$ ( 58 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    Screen 0
    Fade 3
    Wait 100
    Call 'punkte$' [ 1001 ]
    go = 4
    Goto game_over
 }
}

function handlung()
{
 if (zeit == 20 && JOY.state.flag[56] == 1) {
    JOY.state.person[8] = 3;
    personenDisplay();
 }
 if (JOY.state.zeit == 23) {
    JOY.state.person[7] = 4;
    JOY.state.person[9] = 4;
    reden$ ( 7 ) = 1;
    if (JOY.state.raum == 4) {
       personenDisplay();
       Screen 2
       Bob(1, 111, 42, 8);
       // Call 'screco$'
    }
 }
 if (JOY.state.zeit == 25) {
    flag$ ( 14 ) = 1
    if (JOY.state.raum == 4) {
       Screen 2
       Bob(2, 103, 28, 2);
       Bob(1, 111, 42, 8);
       // Call 'screco$'
    }
 }
 if (zeit = 25 && flag$ ( 56 ) = 1) {
    JOY.state.person[8] = 2
    personenDisplay();
 }
 if (JOY.state.zeit == 26) {
    JOY.state.person[7] = 5
    JOY.state.person[9] = 5
    if (JOY.state.raum == 4) {
       personenDisplay();
       Screen 2
       BobOff(1);
       // Call 'screco$'
    }
    if (JOY.state.raum == 5) {
       personenDisplay();
       Call 'test_joy2$'
       Load pfad$ + "Grafiken/Raum5_1.Pic"
       Unpack 8 To 2

       Call 'roller_blind$'
       Call 'punkte$' [ 145 ]
    }
 }
 if (JOY.state.zeit == 27) {
    flag$ ( 14 ) = 0
    if (JOY.state.raum == 4) {
       Screen 2
       BobOff(2);
       // Call 'screco$'
    }
 }
 if (zeit = 28 && flag$ ( 56 ) = 1) {
    JOY.state.person[8] = 1
    if (JOY.state.raum == 1) {
       personenDisplay();
       Screen 2
       Bob(19, 0, 34, 10);
       // Call 'screco$'
    }
 }
 if (JOY.state.zeit == 31) {
    JOY.state.person[8] = 4
    if (JOY.state.raum == 1) {
       personenDisplay();
       Screen 2
       BobOff(19);
       // Call 'screco$'
    }
    if (JOY.state.raum == 4) {
       personenDisplay();
       Screen 2
       Bob(1, 145, 55, 7);
       // Call 'screco$'
    }
 }
 if (JOY.state.zeit == 33) {
    flag$ ( 17 ) = 1
    if (JOY.state.raum == 4) {
       Screen 2
       Bob(5, 122, 40, 5);
       // Call 'screco$'
    }
 }
 if (JOY.state.zeit == 34) {
    JOY.state.person[8] = 7
    if (JOY.state.raum == 4) {
       personenDisplay();
       Screen 2
       BobOff(1);
       // Call 'screco$'
    }
    if (JOY.state.raum == 7) {
       personenDisplay();
       Screen 2
       Bob(5, 203, 0, 3);
       // Call 'screco$'
    }
 }
 if (JOY.state.zeit == 35) {
    flag$ ( 17 ) = 0
    if (JOY.state.raum == 4) {
       Screen 2
       BobOff(5);
       // Call 'screco$'
    }
 }
 if (JOY.state.zeit == 37) {
    JOY.state.person[8] = 8
    personenDisplay();
    reden$ ( 8 ) = 1
    if (JOY.state.raum == 7) {
       Screen 2
       BobOff(5);
       // Call 'screco$'
    }
    if (JOY.state.raum == 8) {
       if (transport$ ( 111 ) = 2) {
          g = 111
          Gosub ablegen
          showText(ereignis$ ( 23 ));
       } else {
          showText(ereignis$ ( 24 ));
       }
       //Call 'clickmouse$'
       // Call 'screco$'
       JOY.state.person[8] = 7
       JOY.state.personName[8] = "BARBARA BRINK"
       personenDisplay();
    }
    if (transport$ ( 111 ) = 1) {
       transport$ ( 111 ) = 0
    }
 }
 if (JOY.state.zeit == 40) {
    JOY.state.person[8] = 7
    if (JOY.state.raum == 7) {
       personenDisplay();
       Screen 2
       Bob(5, 205, 96, 4);
       // Call 'screco$'
    }
 }
 if (JOY.state.zeit == 43) {
    JOY.state.person[8] = 11
    if (JOY.state.raum == 7) {
       personenDisplay();
       Screen 2
       BobOff(5);
       // Call 'screco$'
    }
    if (JOY.state.raum == 11) {
       personenDisplay();
       Screen 2
       Bob(3, 138, 83, 2);
       // Call 'screco$'
    }
 }
 if (JOY.state.zeit == 46) {
    JOY.state.person[8] = 14
    if (JOY.state.raum == 11) {
       personenDisplay();
       Screen 2
       BobOff(3);
       // Call 'screco$'
    }
    if (JOY.state.raum == 14) {
       personenDisplay();
       Call 'test_joy2$'
       Load pfad$ + "Grafiken/Raum14_1.Pic"
       Unpack 8 To 2

       if (flag$ ( 36 ) = 1) {
          Screen 2
          Bob(2, 55, 35, 2);
       }
       Call 'roller_blind$'
       //Call 'clickmouse$'
       Call 'test_joy2$'
       Load pfad$ + "Grafiken/Raum14_2.Pic"
       Unpack 8 To 2

       if (flag$ ( 36 ) = 1) {
          Screen 2
          Bob(2, 55, 35, 2);
       }
       Call 'roller_blind$'
       //Call 'clickmouse$'
       JOY.state.person[8] = 0
       personenDisplay();
       Call 'test_joy2$'
       Load pfad$ + "Grafiken/Raum14.Pic"
       Unpack 8 To 2

       if (flag$ ( 36 ) = 1) {
          Screen 2
          Bob(2, 55, 35, 2);
       }
       Call 'roller_blind$'
       Call 'punkte$' [ 514 ]
    }
 }
 if (JOY.state.zeit == 47) {
    JOY.state.person[8] = 0
 }
 if (JOY.state.zeit > 100 && handlung$ ( 1 ) = 0 && raum > 3 && raum < 16 && flag$ ( 56 ) = 1) {
    showText(ereignis$ ( 26 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    handlung$ ( 1 ) = 1
 }
 if (JOY.state.zeit > 130 && handlung$ ( 2 ) = 0 && raum > 3 && raum < 16 && flag$ ( 56 ) = 1) {
    showText(ereignis$ ( 49 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    handlung$ ( 2 ) = 1
    reden$ ( 7 ) = 1
    JOY.state.person[3] = 0
    flag$ ( 3 ) = 1
    flag$ ( 4 ) = 1
    personenDisplay();
 }
 if (handlung$ ( 3 ) = 2) {
    handlung$ ( 3 ) = 3
    showText(ereignis$ ( 51 ));
    //Call 'clickmouse$'
    // Call 'screco$'
 }
 if (JOY.state.zeit > 140 && flag$ ( 65 ) = 0) {
    flag$ ( 65 ) = 1
    showText(ereignis$ ( 95 ));
    //Call 'clickmouse$'
    // Call 'screco$'
 }
 if (JOY.state.zeit > 180 && handlung$ ( 3 ) = 1 && raum > 3) {
    handlung$ ( 3 ) = 2
    showText(Chr$ ( 10 ) + "INZWISCHEN..." + Chr$ ( 10 ) + "*" + Chr$ ( 10 ));
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
    showText(ereignis$ ( 25 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    Wait 100
    Fade 3 , , , , , , , , , , , , , , , , , , , , 0xf00 , 0xf77 , 0xc , 0xfbb , 0xcc , 0xff0 , 0x23 , 0x17 , 0xb0 , 0x0 , 0xaaf , 0x44f
    Wait 100
    flag$ ( 49 ) = 1
    r = raum
    Gosub initraum
    Return
 }
 if (JOY.state.zeit > 190 && handlung$ ( 6 ) = 0 && raum > 3 && raum < 16 && flag$ ( 56 ) = 1) {
    showText(ereignis$ ( 52 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    handlung$ ( 6 ) = 1
    JOY.state.person[13] = 21
 }
 if (JOY.state.person[8] = raum && transport$ ( 111 ) = 2) {
    showText(ereignis$ ( 23 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    JOY.state.personName[8] = "BARBARA BRINK"
    g = 111
    Gosub ablegen
    reden$ ( 8 ) = 1
    Call 'punkte$' [ 99 ]
 }
 if (JOY.state.raum == 1) {
    if (handlung$ ( 1 ) = 1) {
       showText(ereignis$ ( 28 ));
       //Call 'clickmouse$'
       // Call 'screco$'
       handlung$ ( 1 ) = 2
       JOY.state.personName[5] = "CHRISTIANE"
    }
    if (handlung$ ( 2 ) = 1) {
       showText(ereignis$ ( 37 ));
       //Call 'clickmouse$'
       // Call 'screco$'
       handlung$ ( 2 ) = 2
       JOY.state.personName[3] = "HERBERT"
       geg$ ( 6 ) = "MONITOR(AN)"
       flag$ ( 3 ) = 1
       geg$ ( 7 ) = "AMIGA 2000(AN)"
       flag$ ( 4 ) = 1
    }
    if (handlung$ ( 3 ) = 3) {
       showText(ereignis$ ( 27 ));
       //Call 'clickmouse$'
       handlung$ ( 3 ) = 4
       JOY.state.personName[6] = "GERD"
       gehe = 1
       r = 23
       Gosub initraum
       ' '      Pop '
       ' '      Goto PARSER '
       Return
    }
    if (transport$ ( 165 ) = 2) {
       handlung$ ( 3 ) = 1
       showText(ereignis$ ( 35 ));
       //Call 'clickmouse$'
       // Call 'screco$'
       g = 165
       Gosub ablegen
       g = 164
       Gosub ablegen
    }
    if (handlung$ ( 5 ) = 1) {
       handlung$ ( 5 ) = 2
       showText(ereignis$ ( 50 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    }
    if (handlung$ ( 6 ) = 1) {
       handlung$ ( 6 ) = 2
       showText(ereignis$ ( 56 ));
       //Call 'clickmouse$'
       // Call 'screco$'
    }
    if (handlung$ ( 6 ) = 3 && transport$ ( 203 ) = 2) {
       JOY.state.person[13] = 0
       g = 203
       Gosub ablegen
       transport$ ( 203 ) = 1
       handlung$ ( 6 ) = 4
    }
 }
 if (JOY.state.raum == 4 && flag$ ( 30 ) = 0) {
    flag$ ( 30 ) = 1
    showText(ereignis$ ( 13 ));
    //Call 'clickmouse$'
    // Call 'screco$'
    flag$ ( 53 ) = 111
 }
 if (JOY.state.raum == 18 && flag$ ( 60 ) = 1) {
    flag$ ( 60 ) = 2
    showText(ereignis$ ( 90 ));
    //Call 'clickmouse$'
    // Call 'screco$'
 }
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
    // Call 'screco$'

    //Pop
    //Goto parser
  }
}

function personenDisplay()
{
  //Call 'iconbank$' [ 2 ]
  JOY.bank = "gesicht_";
  SwitchScreen(3);
  ClrBobs();

  var person_ = 1;
  var i = 0;
  for (var j = 1; j <= 10; ++j) {
    JOY.state.personen[j] = 0;
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

  //Cls 0 , i * 31 , 0 To ( i * 31 ) + ( 320 - i ) , 39
}

function initRaum()
{
  JOY.state.raum2 = JOY.state.raum;
  JOY.state.raum = r;

  //Call 'maus_aus$'
  SwitchScreen(2);
  Bob Off
  Wait Vbl
  Cls 0

  Call 'roller_blind$'
  Call 'test_joy2$'

  SwitchScreen(2);
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

  SwitchScreen(0);
  Flash Off
  Get Palette 2

  initZones();

  //Gosub "INITRAUM" + ( Str$ ( raum ) - " " )
  JOY.initRaum[JOY.state.raum]();

  SwitchScreen(3);
  //Cls 0
  personenDisplay();

  SwitchScreen(0);
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
   SwitchScreen(0);
   JOY.state.zones[JOY.screen] = JOY.raumZones[JOY.state.raum];
   /*
   anz = Deek ( Start ( 8 ) + Length ( 8 ) - 2 )
   For i = 1 To anz
      adr = Start ( 8 ) + ( i - 1 ) * 8
      x1 = Deek ( adr )
      y1 = Deek ( adr + 2 )
      x2 = Deek ( adr + 4 )
      y2 = Deek ( adr + 6 )
      if (x2 <> 0) {
         Set Zone i , x1 , y1 To x2 , y2
      }
   Next
   */
}

function font(f, groesse)
{
   if (Not Upper$ ( Right$ ( f$ , 5 ) ) = ".FONT") {
      f$ = f$ + ".Font"
   }
   i = 1
   While Font ( i ) <> ""
      if (Upper$ ( Left$ ( Font ( i ) , 30 ) - " " ) = Upper$ ( f$ )) {
         if (Val ( Mid$ ( Font ( i ) , 31 , 2 ) ) = groesse) {
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
  SwitchScreen(1);
  Call 'iconbank$' [ 0 ]

  if (JOY.verb < 10) {
    Paste Icon 0 , verb * 9 , verb
  } else {
    Paste Icon 58 , ( verb - 9 ) * 9 , verb
  }
}

function verbRein()
{
  SwitchScreen(1);
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
   SwitchScreen(1);
   Get Block 1 , 0 , 0 , 40 , 80 , 1
   SwitchScreen(0);
   Put Block 2
   Put Block 1 , 119 , 19
   Screen Swap
   Wait Vbl
End Proc

Procedure p$
   Shared p
   SwitchScreen(0);
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
 if (half = 1) {
    Screen Display 1 , 128 , , 160 , 90
 }
 SwitchScreen(1);
 Call 'font$' [ "JOY" , 6 ]
 Reserve Zone 28
 SetZone(1, 0, 9, 57, 90);
 SetZone(2, 58, 9, 115, 44);
 SetZone(3, 58, 46, 115, 68);
 SetZone(4, 58, 68, 115, 90);
 feld = 5
 For j = 1 To 3
    For i = 1 To 8
       x = 100 + i * 24
       y = - 6 + j * 24
       Set Zone feld , x , y To x + 16 , y + 16
       Inc feld
    Next
 Next
 if (spr = 0) {
    Call 'befehle_hoch$'
 } else {
    spr = 0
 }
 verbRein();
 Return

function ladeTexte()
{
  JOY.ereignis = game.cache.getJSON('texte')['Ereignisse.Txt'];
}

function inventory()
{
  SwitchScreen(1);
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
  SwitchScreen(3);
  // Reserve Zone 10
  for (i = 0; i <= 9; ++i) {
    Set Zone (i+1, 31*i, 0, 31*i+30, 38);
  }

  //Screen Open 4 , 320 , 128 , 64 , Lowres
  //Screen Display 4 , 128 , 80 , ,
  //Flash Off
  //Curs Off
  //Cls 0
  //if (half == 1) {
  //  Screen Display 3 , 128 , 47 , 160 ,
  //}

  // Label init_spiel:
  for (i = 1; i <= 24; ++i) {
    JOY.state.inventar[i] = 0;
  }
  JOY.state.inventar[1] = 15;

  JOY.geg[0] = "                                                ";
  //iconbank = 0;
  JOY.state.zeit = 0;
  JOY.state.punkte = 0;
  JOY.state.raum = 1;

  JOY.verb = 1;
  JOY.gehe = 0;
  JOY.oeffne = 0;
  JOY.druecke = 0;
  JOY.schliesse = 0;
  JOY.ziehe = 0;

  JOY.state.lab = Math.floor(Math.Random * 3) + 1;

  etage = 2
  versuch = 0
  z = 6
  s = 0
  bm = 1
  cc16 = 0x8f
  cc17 = 0xc

  // Read Data statements
  //Restore verben
  //Restore objekte
  var objtrans = JOY.ereignis = game.cache.getJSON('objtrans'), j=0;
  for (i = 1; i <= 255; ++i) {
    JOY.state.geg[i] = objtrans[j++];
    JOY.state.transport[i] = objtrans[j++];
  }
 //Restore raeume
 for (i = 1; i <= 26; ++i) {
   JOY.state.betreten[i] = 0;
 }
 //Restore personen
 for (i = 1; i <= 20; ++i) {
  JOY.state.reden[i] = 0;
 }
 //Restore raumaddierer
 //Restore fahrstuhl_daten
 for (i = 1; i <= 6; ++i) {
    JOY.state.handlung[i] = 0;
  }
 for (i = 1; i <= 69; ++i) {
    JOY.state.flag[i] = 0;
  }
 JOY.state.flag[1] = 2;
 JOY.state.flag[5] = 1;
 JOY.state.flag[47] = 1;
 JOY.state.flag[48] = 2;
 JOY.state.flag[50] = 1;
 JOY.state.flag[58] = 1;
 JOY.state.betreten[1] = 1

 /*Screen Open 0 , 320 , 128 , 64 , Lowres
 Screen Display 0 , 128 , 80 , ,
 Flash Off
 Curs Off
 Cls 0
 Colour 1 , 0xfff
 Call 'font$' [ "JOY" , 6 ]
 if (half = 1) {
    Screen Display 0 , 128 , 80 , 160 ,
 }*/
 SwitchScreen(4);
 Call 'maus_an$'
 if (geladen = 0) {
    if (Not Exist ( pfad$ )) {
       SwitchScreen(0);
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
 SwitchScreen(3);
 Call 'iconbank$' [ 2 ]
 Get Icon Palette
 Priority Reverse On
 Load pfad$ + "Grafiken/Raum1.Pic" , 8
 Unpack 8 To 2

 Erase 8
 SwitchScreen(2);
 For i = 0 To 31
    Colour i , 0x0
 Next
 Load pfad$ + "Daten/Raum1.Zones" , 8
 Bob(2, 54, 41, 3);
 Bob(5, 305, 34, 5);
 Bob(8, 57, 123, 2);
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
  SwitchScreen(0);
  Get Palette 2
  // Call 'screco$'
  Screen To Front 0
  SwitchScreen(2);
  Get Sprite Palette
  SwitchScreen(4);
  Cls 32
  SwitchScreen(0);
  Reserve Zone 20
  Call 'init_zones$'
  SetZone(2, 50, 39, 61, 51);
  SetZone(5, 303, 32, 313, 47);
  SetZone(8, 57, 123, 85, 126);
  SetZone(16, 281, 0, 319, 54);
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
  // Call 'screco$'
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
    // Call 'screco$'
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
 if (Not Exist ( pfad$ )) {
    SwitchScreen(0);
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
 if (go = 6) {
    spr = 1
 }
 Gosub init_befehle
 SwitchScreen(3);
 Call 'iconbank$' [ 2 ]
 Get Icon Palette
 Priority Reverse On
 SwitchScreen(4);
 Cls 32
 SwitchScreen(0);
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
    SwitchScreen(0);
    Do
       stelle2 = Instr$ ( t$ , Chr$ ( 10 ) , stelle )
       txt$ = Mid$ ( t$ , stelle , stelle2 - stelle )
       if (txt$ = "*") {
          Exit
       }
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
    if (( name$ = "GOG" ) || ( name$ = "GOK" )) {
       Ink 30 , 0
    } else {
       Ink 1
    }
    Box x + 1 , y + 1 To x + w - 2 , y + h - 2
    Gr Writing 0
    stelle = 2
    Add y , 6
    For i = 1 To zeilen
       stelle2 = Instr$ ( t$ , Chr$ ( 10 ) , stelle )
       txt$ = Mid$ ( t$ , stelle , stelle2 - stelle )
       if (txt$ = "*") {
          Exit
       }
       Text x + 3 , y + 1 , txt$
       stelle = stelle2 + 1
       Add y , 7
    Next
    Gr Writing 1
 End Proc
 */
}
