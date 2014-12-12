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
    ereignis: Array(102),
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
  pers: 0,
  geg1: 0,
  gehe: 0,

  // AMOS state
  screen: 0,

  // Raum routinen
  initRaum: [],
  raumFunc: []
};

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
       //showText(JOY.state.ereignis[3]);
       showText(ereignis[3])

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
       showText(JOY.state.ereignis[10]);
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
       benutze = 1;
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
       benutze = 1;
       g = 11;
       ablegen();
       JOY.state.transport[11] = 1
       Bset.<> 0 , JOY.state.flag[58]
       Gosub test_recall
    }
    if (JOY.geg1 == 33 && geg2 == 14) {
       benutze = 1
       JOY.state.flag[1] = 0;
       g = 33;
       ablegen();
       showText(JOY.state.ereignis[7]);
       Call 'clickmouse$'
       Call 'screco$'
       punkte(100);
    }
    if (JOY.geg1 == 134 && geg2 == 7 && JOY.state.handlung[2] == 2) {
       benutze = 1
       showText(JOY.state.ereignis[39]);
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
       benutze = 1;
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
       showText(JOY.state.ereignis[29]);
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
    showText(JOY.state.ereignis[11]);
    Call 'clickmouse$'
    Call 'screco$'
    Call 'verb_raus$'
    verb = verb2
    Call 'verb_rein$'
    Pop
    Goto parser
 }
 if (JOY.verb == 12 && geg1 == 2) {
    showText(JOY.state.ereignis[80]);
    Call 'clickmouse$'
    Call 'screco$'
    Pop
    Goto parser
 }
 if (JOY.verb == 13 && geg1 == 162 && pers == 5 && JOY.state.handlung[1] == 2) {
    gib = 1
    showText(JOY.state.ereignis[34]);
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
