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
    person: Array(20),
    personen: Array(10),
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

    raum: 1,
    raum2: 0
  },

  // parser state
  verb: 0,
  pers: 0,
  geg1: 0,
  gehe: 0,

  // Raum routinen
  initRaum: [],
  raumFunc: []
};

function test_screen()
{
   // If Mouse Screen = 0
      Screen 0
      mz = Mouse Zone
      JOY.geg = JOY.state.raumaddierer[JOY.state.raum - 1 ] + mz;
      if (JOY.geg == raumaddierer[JOY.raum_ - 1]) {
         geg = 0
      }
   }
   // If Mouse Screen = 1
      Screen 1
      mz = Mouse Zone
      If mz > 4
         geg = inventar$ ( mz - 4 )
      Else
         geg = 0
      }
   }
   // If Mouse Screen = 3
      Screen 3
      mz = Mouse Zone
      geg = 0
      pers = personen$ ( mz )
   }
}

// implementierung aller Raum routinen
JOY.initRaum[1] = function()
{
  if (JOY.state.raum2 > 3) {
     JOY.state.flag[1] = 1
  }
  if (JOY.state.transport[2] == 1) {
     If JOY.state.flag[1] = 0 Or JOY.state.flag[1] = 2
        Screen 2
        Bob 2 , 54 , 41 , 3
        Screen 0
        Set Zone 2 , 50 , 39 To 61 , 51
     Else
        Screen 2
        Bob 14 , 49 , 0 , 4
        Screen 0
        Set Zone 2 , 61 , 20 To 67 , 30
     EndIf
  Else
     If JOY.state.flag[1] = 1
        Screen 2
        Bob 14 , 49 , 0 , 8
     EndIf
  EndIf
  If JOY.state.transport[5] = 1
     Screen 2
     Bob 5 , 305 , 34 , 5
     Screen 0
     Set Zone 5 , 306 , 33 To 316 , 47
  EndIf
  If JOY.state.flag[5] = 0
     Screen 2
     Bob 16 , 282 , 0 , 7
     Screen 0
     Set Zone 18 , 281 , 0 To 319 , 54
  Else
     Screen 0
     Set Zone 16 , 281 , 0 To 319 , 54
  EndIf
  If JOY.state.flag[3] = 1 And JOY.state.flag[4] = 1 And ( JOY.state.handlung[2] = 0 Or JOY.state.handlung[2] = 3 )
     Screen 2
     Bob 6 , 136 , 81 , 6
  EndIf
  If handlung$ ( 2 ) > 0 And handlung$ ( 2 ) < 3
     Screen 2
     Bob 6 , 136 , 81 , 9
  EndIf
  If JOY.state.flag[2] = 0
     If JOY.state.transport[8] = 1
        Screen 2
        Bob 8 , 57 , 123 , 2
        Screen 0
        Set Zone 8 , 57 , 123 To 85 , 128
     EndIf
  Else
     If JOY.state.transport[9] = 1
        Screen 2
        Bob 9 , 57 , 123 , 2
        Screen 0
        Set Zone 9 , 57 , 123 To 85 , 128
     EndIf
  EndIf
  If JOY.state.person[8] = 1
     Screen 2
     Bob 19 , 0 , 34 , 10
  EndIf
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
       //Call 'txt$' [ ereignis$ ( 3 ) ]
       showText(ereignis[3])

       Call 'clickmouse$'

       g = 11;
       mz = 11;
       aufnehmen();

       //Bset.<> 0 , flag$ ( 53 )
       flagSet(0, 53);

       //Bclr 0 , flag$ ( 58 )
       flagClear(0, 58);
    }
    if (JOY.geg1 == 8 && JOY.state.transport[8] = 1
       JOY.state.flag[2] = 1
       JOY.state.transport[8] = 0
       JOY.state.transport[9] = 1
       Screen 2
       Bob Off 8
       Bob 9 , 57 , 123 , 2
       Call 'screco$'
       Screen 0
       Reset Zone 8
       Set Zone 9 , 57 , 123 To 85 , 127
    }
    if (JOY.geg1 == 12
       Bset.<> 2 , flag$ ( 53 )
    }
    if (JOY.geg1 == 13
       JOY.state.flag[54] = 1
       JOY.state.person[1] = 1
       Gosub personendisplay
       If person$ ( 1 ) = "???" && JOY.state.flag[56] = 1
          person$ ( 1 ) = "JUPP"
       }
    }
  }
  if (JOY.verb == 2 && geg1 = 14 && JOY.state.flag[1] = 0 && JOY.state.transport[2] = 1
    oeffne = 1
    JOY.state.flag[1] = 1
    Screen 2
    Bob Off 2
    Bob 14 , 49 , 0 , 4
    Call 'screco$'
    Screen 0
    Reset Zone 2
    Set Zone 2 , 61 , 20 To 67 , 30
    If JOY.state.flag[56] = 0
       Call 'txt$' [ ereignis$ ( 10 ) ]
       Call 'clickmouse$'
       Call 'screco$'
       JOY.state.flag[56] = 1
       JOY.state.betreten[2] = 0
       JOY.state.betreten[3] = 0
       For i = 2 To 10
          If person$ ( i ) = 4
             person$ ( i ) = 1
          }
       Next
       Gosub personendisplay
       If person$ ( 1 ) = "???"
          person$ ( 1 ) = "JUPP"
       }
    }
 }
 if (JOY.verb == 3 && geg1 = 14 && JOY.state.flag[1] = 1 && JOY.state.transport[2] = 1
    schliesse = 1
    JOY.state.flag[1] = 0
    Screen 2
    Bob Off 14
    Bob 2 , 54 , 41 , 3
    Call 'screco$'
    Screen 0
    Set Zone 2 , 50 , 39 To 61 , 51
 }
 if (JOY.verb == 4
    if (JOY.geg1 == 2 && JOY.state.transport[2] = 1
       ziehe = 1
       If ( JOY.state.flag[1] = 0 Or JOY.state.flag[1] = 2 )
          g = geg1
          Gosub aufnehmen
       Else
          Screen 2
          Bob 14 , 49 , 0 , 8
          g = 2
          mz = 2
          Gosub aufnehmen
       }
    }
 }
 If ( verb = 5 Or verb = 8 ) && geg1 = 10
    Call 'txt$' [ Chr$ ( 10 ) + "ABER ES IST DOCH NOCH HELL!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
    Call 'clickmouse$'
    Call 'screco$'
    Pop
    Goto parser
 }
 if (JOY.verb == 7) {
    if (JOY.geg1 == 2 && geg2 == 14 && JOY.state.transport[2] == 2) {
       benutze = 1
       g = 2
       Gosub ablegen
       JOY.state.transport[2] = 1;
       if (flag$ ( 1 ) == 0 Or flag$ ( 1 ) == 2) {
          Screen 2
          Bob 2 , 54 , 41 , 3
          Call 'screco$'
          Screen 0
          Set Zone 2 , 50 , 39 To 61 , 51
       } else {
          Screen 2
          Bob 14 , 49 , 0 , 4
          Call 'screco$'
          Screen 0
          Set Zone 2 , 61 , 20 To 67 , 30
       }
    }
    if (JOY.geg1 == 11 && geg2 == 7) {
       benutze = 1
       g = 11
       Gosub ablegen
       JOY.state.transport[11] = 1
       Bset.<> 0 , flag$ ( 58 )
       Gosub test_recall
    }
    if (JOY.geg1 == 33 && geg2 == 14) {
       benutze = 1
       JOY.state.flag[1] = 0;
       g = 33;
       Gosub ablegen
       Call 'txt$' [ ereignis$ ( 7 ) ]
       Call 'clickmouse$'
       Call 'screco$'
       Call 'punkte$' [ 100 ]
    }
    if (JOY.geg1 == 134 && geg2 == 7 && handlung$ ( 2 ) == 2) {
       benutze = 1
       Call 'txt$' [ ereignis$ ( 39 ) ]
       Call 'clickmouse$'
       Call 'screco$'
       g = 134
       Gosub ablegen
       JOY.state.handlung[2] = 3
       JOY.state.person[3] = 1
       Gosub personendisplay
       Screen 2
       Bob 6 , 136 , 81 , 6
       Call 'screco$'
       Call 'punkte$' [ 102 ]
    }
    if (JOY.geg1 == 203 && geg2 == 12) {
       benutze = 1
       g = 203
       Gosub ablegen
       Bset.<> 1 , flag$ ( 58 )
       Gosub test_recall
    }
    if (JOY.geg1 == 254 && geg2 == 7) {
       if (JOY.state.handlung[2] = 0 || handlung$ ( 2 ) == 3) {
          Goto klackstris
       } else {
          Call 'txt$' [ Chr$ ( 10 ) + "DENK AN HERBERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
          Call 'clickmouse$'
          Call 'screco$'
          Pop
          Goto parser
       }
    }
 }
 if (JOY.verb == 8) {
    if (JOY.geg1 == 6 && flag$ ( 3 ) == 0) {
       schalte = 1
       JOY.state.flag[3] = 1
       if (flag$ ( 4 ) == 1) {
          Screen 2
          Bob 6 , 136 , 81 , 6
          Call 'screco$'
       }
    }
    if (JOY.geg1 == 7 && flag$ ( 4 ) == 0) {
       schalte = 1
       JOY.state.flag[4] = 1
       Gosub test_recall
       If JOY.state.flag[3] = 1
          Screen 2
          Bob 6 , 136 , 81 , 6
          Call 'screco$'
       }
    }
    if (JOY.geg1 == 12 && JOY.state.flag[51] == 0) {
       schalte = 1
       JOY.state.flag[51] = 1
    }
 }
 if (JOY.verb == 9
    if (JOY.geg1 == 6 && JOY.state.flag[3] == 1) {
       if (handlung$ ( 2 ) == 0 Or handlung$ ( 2 ) == 3) {
          schalte = 1
          JOY.state.flag[3] = 0
          Screen 2
          Bob Off 6
          Call 'screco$'
       } else {
          Call 'txt$' [ Chr$ ( 10 ) + "DENK AN HERBERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
          Call 'clickmouse$'
          Call 'screco$'
          Pop
          Goto parser
       }
    }
    if (JOY.geg1 == 7 && JOY.state.flag[4] == 1) {
       if (JOY.state.handlung[2] = 0 Or JOY.state.handlung[2] = 3) {
          schalte = 1
          JOY.state.flag[4] = 0
          Screen 2
          Bob Off 6
          Call 'screco$'
       } else {
          Call 'txt$' [ Chr$ ( 10 ) + "DENK AN HERBERT !!!" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
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
    if (JOY.state.handlung[3] = 5 && JOY.state.handlung[4] = 0
       JOY.state.handlung[4] = 1
       Call 'txt$' [ ereignis$ ( 29 ) ]
       Call 'clickmouse$'
       JOY.state.person[2] = 0
       JOY.state.person[16] = 20
       Gosub personendisplay
    }
    gehe = 1
    r = 4
    Gosub initraum
 }
 if (JOY.verb == 11 && JOY.state.flag[56] == 1) {
    Call 'txt$' [ ereignis$ ( 11 ) ]
    Call 'clickmouse$'
    Call 'screco$'
    Call 'verb_raus$'
    verb = verb2
    Call 'verb_rein$'
    Pop
    Goto parser
 }
 if (JOY.verb == 12 && geg1 == 2) {
    Call 'txt$' [ ereignis$ ( 80 ) ]
    Call 'clickmouse$'
    Call 'screco$'
    Pop
    Goto parser
 }
 if (JOY.verb == 13 && geg1 == 162 && pers == 5 && handlung$ ( 1 ) == 2) {
    gib = 1
    Call 'txt$' [ ereignis$ ( 34 ) ]
    Call 'clickmouse$'
    Call 'screco$'
    g = 162
    Gosub ablegen
    JOY.state.transport[162] = 1
    JOY.state.handlung[1] = 3
    Call 'punkte$' [ 103 ]
 }
 if (JOY.verb == 16) {
    if (pers == 5) {
       if (handlung$ ( 1 ) == 2) {
          Call 'txt$' [ Chr$ ( 10 ) + "GLGLGLGLGL BLABLA TRRRR GLUCKS TRALALA HIHAHOHU BL-BL-BL" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
          Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          Pop
          Goto parser
       } else {
          Call 'txt$' [ Chr$ ( 10 ) + "LA� MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
          Call 'clickmouse$'
          Call 'screco$'
          verb = verb2
          Pop
          Goto parser
       }
    }
    if (pers == 2 Or pers == 3 Or pers == 5 Or pers == 6 Or pers == 7 && reden$ ( pers ) == 0) {
       Call 'txt$' [ Chr$ ( 10 ) + "LA� MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
       Call 'clickmouse$'
       Call 'screco$'
    }
    if (pers == 10) {
       if (reden$ ( 10 ) == 0) {
          Call 'unterhaltung_laden$' [ 2 ]
          Call 'unterhaltung$'
          JOY.state.reden[10] = 1
          verb = verb2
          Pop
          Goto parser
       }
       if reden$ ( 10 ) == 1) {
          Call 'txt$' [ Chr$ ( 10 ) + "LA� MICH IN RUHE, ICH HABE ZU TUN !" + Chr$ ( 10 ) + "*" + Chr$ ( 10 ) ]
          Call 'clickmouse$'
          Call 'screco$'
       }
    }
    if (pers == 18) {
       Call 'unterhaltung_laden$' [ 14 ]
       Call 'unterhaltung$'
       if (Btst ( 2 , gefragt )) {
          person$ ( 7 ) = "HANS-WERNER"
          person$ ( 9 ) = "RAINER"
          person$ ( 10 ) = "ANJA"
          Call 'punkte$' [ 113 ]
       }
       verb = verb2
       Pop
       Goto parser
    }
 }
}

function  initRaum()
{
  raum2 = raum;
  raum = r;

  //Call 'maus_aus$'
  Screen 2
  Bob Off
  Wait Vbl
  Cls 0

  Call 'roller_blind$'
  Call 'test_joy2$'

  Screen 2
  Load pfad$ + "Grafiken/Raum" + ( Str$ ( raum ) - " " ) + ".Bobs.Abk"
  If raum = 11 And JOY.state.flag[68] = 1 And zeit > 47
     Load pfad$ + "Grafiken/Raum11_1.Pic" , 8
  Else
     If raum = 5 And JOY.state.person[7] = 5
        Load pfad$ + "Grafiken/Raum5_1.Pic" , 8
     Else
        If raum = 14
           If zeit = 46
              Load pfad$ + "Grafiken/Raum14_1.Pic" , 8
           Else
              If zeit = 47
                 Load pfad$ + "Grafiken/Raum14_2.Pic" , 8
              Else
                 Load pfad$ + "Grafiken/Raum14.Pic" , 8
              EndIf
           EndIf
        Else
           Load pfad$ + "Grafiken/Raum" + ( Str$ ( raum ) - " " ) + ".Pic" , 8
        EndIf
     EndIf
  EndIf
  Unpack 8 To 2
  Erase 8

  Load pfad$ + "Daten/Raum" + ( Str$ ( raum ) - " " ) + ".Zones" , 8
  Set Input 42 , - 1
  Open In 1 , pfad$ + "Texte/Raum" + ( Str$ ( raum ) - " " ) + ".Umgebung.Txt"
  Line Input # 1 , umgebung$
  umgebung$ = umgebung$ + "*" + Chr$ ( 10 )
  Close 1
  Open In 1 , pfad$ + "Texte/Raum" + ( Str$ ( raum ) - " " ) + ".Objekte.Txt"
  For i = 1 To raumaddierer$ ( raum ) - raumaddierer$ ( raum - 1 )
     Line Input # 1 , objekt$ ( i )
     objekt$ ( i ) = objekt$ ( i ) + "*" + Chr$ ( 10 )
  Next
  Close 1

  if (flag[54] == 1) {
    person[1] = raum;
  }

  Screen 0
  Flash Off
  Get Palette 2

  initZones();

  //Gosub "INITRAUM" + ( Str$ ( raum ) - " " )
  JOY.initRaum[raum]();

  //Screen 3
  //Cls 0
  personendisplay();

  Screen 0
  Call 'cursor$'

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
