const xp_thresholds = {
  "encounterDifficulty": {
    "1": {
      "level": 1,
      "easy": 25,
      "medium": 50,
      "hard": 75,
      "deadly": 100
    },
    "2": {
      "level": 2,
      "easy": 50,
      "medium": 100,
      "hard": 150,
      "deadly": 200
    },
    "3": {
      "level": 3,
      "easy": 75,
      "medium": 150,
      "hard": 225,
      "deadly": 400
    },
    "4": {
      "level": 4,
      "easy": 125,
      "medium": 250,
      "hard": 375,
      "deadly": 500
    },
    "5": {
      "level": 5,
      "easy": 250,
      "medium": 500,
      "hard": 750,
      "deadly": 1100
    },
    "6": {
      "level": 6,
      "easy": 300,
      "medium": 600,
      "hard": 900,
      "deadly": 1400
    },
    "7": {
      "level": 7,
      "easy": 350,
      "medium": 750,
      "hard": 110,
      "deadly": 1700
    },
    "8": {
      "level": 8,
      "easy": 450,
      "medium": 900,
      "hard": 1400,
      "deadly": 2100
    },
    "9": {
      "level": 9,
      "easy": 550,
      "medium": 1100,
      "hard": 1600,
      "deadly": 2400
    },
    "10": {
      "level": 10,
      "easy": 600,
      "medium": 1200,
      "hard": 1900,
      "deadly": 2800
    },
    "11": {
      "level": 11,
      "easy": 800,
      "medium": 1600,
      "hard": 2400,
      "deadly": 3600
    },
    "12": {
      "level": 12,
      "easy": 1000,
      "medium": 2000,
      "hard": 3000,
      "deadly": 4500
    },
    "13": {
      "level": 13,
      "easy": 1100,
      "medium": 2200,
      "hard": 3400,
      "deadly": 5100
    },
    "14": {
      "level": 14,
      "easy": 1250,
      "medium": 2500,
      "hard": 3800,
      "deadly": 5700
    },
    "15": {
      "level": 15,
      "easy": 1400,
      "medium": 2800,
      "hard": 4300,
      "deadly": 6400
    },
    "16": {
      "level": 16,
      "easy": 1600,
      "medium": 3200,
      "hard": 4800,
      "deadly": 7200
    },
    "17": {
      "level": 17,
      "easy": 2000,
      "medium": 3900,
      "hard": 5900,
      "deadly": 8800
    },
    "18": {
      "level": 18,
      "easy": 2100,
      "medium": 4200,
      "hard": 6300,
      "deadly": 9500
    },
    "19": {
      "level": 19,
      "easy": 2400,
      "medium": 4900,
      "hard": 7300,
      "deadly": 10900
    },
    "20": {
      "level": 20,
      "easy": 2800,
      "medium": 5700,
      "hard": 8500,
      "deadly": 12700
    }
  },
  "21": {
      "level": 21,
      "easy": 3500,
      "medium": 7125,
      "hard": 10625,
      "deadly": 15875
    },
    "22": {
      "level": 22,
      "easy": 4375,
      "medium": 8906,
      "hard": 13281,
      "deadly": 19843
    },
    "23": {
      "level": 23,
      "easy": 5469,
      "medium": 11133,
      "hard": 16601,
      "deadly": 24804
    },
    "24": {
      "level": 24,
      "easy": 6836,
      "medium": 13916,
      "hard": 20751,
      "deadly": 31005
    },
    "25": {
      "level": 25,
      "easy": 8545,
      "medium": 17395,
      "hard": 25939,
      "deadly": 38756
    },
    "26": {
      "level": 26,
      "easy": 10681,
      "medium": 21744,
      "hard": 32424,
      "deadly": 48445
    },
    "27": {
      "level": 27,
      "easy": 13351,
      "medium": 27180,
      "hard": 40530,
      "deadly": 60556
    },
    "28": {
      "level": 28,
      "easy": 16689,
      "medium": 33975,
      "hard": 50663,
      "deadly": 75695
    },
    "29": {
      "level": 29,
      "easy": 20861,
      "medium": 42469,
      "hard": 63329,
      "deadly": 94619
    },
    "30": {
      "level": 30,
      "easy": 26077,
      "medium": 53086,
      "hard": 79161,
      "deadly": 118274
    },
    "31": {
      "level": 31,
      "easy": 32596,
      "medium": 66358,
      "hard": 98951,
      "deadly": 147843
    },
    "32": {
      "level": 32,
      "easy": 40745,
      "medium": 82948,
      "hard": 123689,
      "deadly": 184804
    },
    "33": {
      "level": 33,
      "easy": 50931,
      "medium": 103685,
      "hard": 154611,
      "deadly": 231005
    },
    "34": {
      "level": 34,
      "easy": 63664,
      "medium": 129606,
      "hard": 193264,
      "deadly": 288756
    },
    "35": {
      "level": 35,
      "easy": 79580,
      "medium": 162008,
      "hard": 241580,
      "deadly": 360945
    },
    "36": {
      "level": 36,
      "easy": 99475,
      "medium": 202510,
      "hard": 301975,
      "deadly": 451181
    },
    "37": {
      "level": 37,
      "easy": 124344,
      "medium": 253138,
      "hard": 377469,
      "deadly": 563976
    },
    "38": {
      "level": 38,
      "easy": 155430,
      "medium": 316423,
      "hard": 471836,
      "deadly": 704970
    },
    "39": {
      "level": 39,
      "easy": 194288,
      "medium": 395529,
      "hard": 589795,
      "deadly": 881213
    },
    "40": {
      "level": 40,
      "easy": 242860,
      "medium": 494411,
      "hard": 737243,
      "deadly": 1101516
    },
    "41": {
      "level": 41,
      "easy": 303575,
      "medium": 618014,
      "hard": 921554,
      "deadly": 1376895
    },
    "42": {
      "level": 42,
      "easy": 379469,
      "medium": 772518,
      "hard": 1151943,
      "deadly": 1721119
    },
    "43": {
      "level": 43,
      "easy": 474336,
      "medium": 965648,
      "hard": 1439929,
      "deadly": 2151399
    },
    "44": {
      "level": 44,
      "easy": 592920,
      "medium": 1207060,
      "hard": 1799911,
      "deadly": 2689249
    },
    "45": {
      "level": 45,
      "easy": 741150,
      "medium": 1508825,
      "hard": 2249889,
      "deadly": 3361561
    },
    "46": {
      "level": 46,
      "easy": 926438,
      "medium": 1886031,
      "hard": 2812361,
      "deadly": 4201951
    },
    "47": {
      "level": 47,
      "easy": 1158047,
      "medium": 2357539,
      "hard": 3515451,
      "deadly": 5252439
    },
    "48": {
      "level": 48,
      "easy": 1447559,
      "medium": 2946924,
      "hard": 4394314,
      "deadly": 6565548
    },
    "49": {
      "level": 49,
      "easy": 1809449,
      "medium": 3683655,
      "hard": 5492893,
      "deadly": 8206935
    },
    "50": {
      "level": 50,
      "easy": 2261811,
      "medium": 4604569,
      "hard": 6866116,
      "deadly": 10258669
    }
}