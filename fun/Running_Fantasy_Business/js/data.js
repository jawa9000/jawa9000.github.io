let buildingConstuctionCosts = {
    'farm': {
        'name': 'Farm',
        'cost': '1,250',
        'time': 30
    },
    'houseSmallWood': {
        'name': 'Small wooden house',
        'cost': '500',
        'time': 24
    },
    'houseMediumWood': {
        'name': 'Medium wooden house',
        'cost': '1,000',
        'time': 36
    },
    'houseLargeWood': {
        'name': 'Large wooden house',
        'cost': '2,000',
        'time': 54
    },
    'houseSmallStone': {
        'name': 'Small stone house',
        'cost': '1,500',
        'time': 36
    },
    'houseMediumStone': {
        'name': 'Medium stone house',
        'cost': '3,000',
        'time': 54
    },
    'houseLargeStone': {
        'name': 'Large stone house',
        'cost': '6,000',
        'time': 82
    },
    'abbey': {
        'name': 'Abbey',
        'cost': '50,000',
        'time': 60
    },
    'inn': {
        'name': 'Inn',
        'cost': '25,000',
        'time': 45
    },
    'shop': {
        'name': 'Shop',
        'cost': '5,000',
        'time': 45
    },
    'guildhall': {
        'name': 'Guildhall, (town or city)',
        'cost': '5,000',
        'time': 60
    },
    'keep': {
        'name': 'Keep or small castle',
        'cost': '50,000',
        'time': 400
    },
    'estate': {
        'name': 'Noble estate with manor',
        'cost': '25,000',
        'time': 150
    },
    'output': {
        'name': 'Outpost or fort',
        'cost': '15,000',
        'time': 100
    },
    'castle': {
        'name': 'Palace or large castle',
        'cost': '500,000',
        'time': 1200
    },
    'temple': {
        'name': 'Temple',
        'cost': '50,000',
        'time': 400
    },
    'tower': {
        'name': 'Tower, fortified',
        'cost': '15,000',
        'time': 100
    },
    'post': {
        'name': 'Trading post',
        'cost': '5,000',
        'time': 60
    }
}

let businessCosts = {
    'abbey': {
        'name': 'Abbey',
        'cost': '20gp',
        'skilled': 5,
        'untrained': 25 
    },
    'farm': {
        'name': 'Farm',
        'cost': '5sp',
        'skilled': 1,
        'untrained': 2 
    },
    'guildhall': {
        'name': 'Guildhall, (town or city)',
        'cost': '5gp',
        'skilled': 3,
        'untrained': 3 
    },
    'innTown': {
        'name': 'Inn (town or city)',
        'cost': '10gp',
        'skilled': 1,
        'untrained': 5 
    },
    'innRural': {
        'name': 'Inn, rural roadside',
        'cost': '10gp',
        'skilled': 5,
        'untrained': 10 
    },
    'keep': {
        'name': 'Keep or small castle',
        'cost': '100gp',
        'skilled': 50,
        'untrained': 50
    },
    'lodge': {
        'name': 'Lodge, hunting',
        'cost': '5sp',
        'skilled': 1,
        'untrained': 0
    },
    'fort': {
        'name': 'Outpost or fort',
        'cost': '50gp',
        'skilled': 20,
        'untrained': 40
    },
    'estate': {
        'name': 'Noble estate',
        'cost': '10gp',
        'skilled': 3,
        'untrained': 15 
    },
    'castle': {
        'name': 'Palace or large castle',
        'cost': '400gp',
        'skilled': 300,
        'untrained': 100
    },
    'shop': {
        'name': 'Shop',
        'cost': '2gp',
        'skilled': 1,
        'untrained': 0 
    },
    'templeLarge': {
        'name': 'Temple, large',
        'cost': '25gp',
        'skilled': 10,
        'untrained': 10
    },
    'templeSmall': {
        'name': 'Temple, small',
        'cost': '1gp',
        'skilled': 2,
        'untrained': 0 
    },
    'tower': {
        'name': 'Tower, fortified',
        'cost': '25gp',
        'skilled': 10,
        'untrained': 0
    },
    'post': {
        'name': 'Trading post',
        'cost': '10gp',
        'skilled': 4,
        'untrained': 2
    },
    'furnace': {
        'name': 'Blast furnace',
        'cost': '9gp',
        'skilled': 1,
        'untrained': 1
    }
}

let settlementSizes = {
    'thorp': {
        'name': 'Thorp',
        'population': '20-80'
    },
    'hamlet': {
        'name': 'Hamlet',
        'population': '81-400'
    },
    'village': {
        'name': 'Village',
        'population': '401-900'
    },
    'townSmall': {
        'name': 'Town, small',
        'population': '901-2,000'
    },
    'townLarge': {
        'name': 'Town, large',
        'population': '2,001-5,000'
    },
    'citySmall': {
        'name': 'City, small',
        'population': '5,001-12,000'
    },
    'cityLarge': {
        'name': 'City, large',
        'population': '12,001-25,000'
    },
    'metropolis': {
        'name': 'Metrolpolis',
        'population': '25,000+'
    }
}

var output = '<h2>Building costs and construction time</h2><table><tr><th>Building</th><th>Cost (gp)</th><th>Time (days)</th></tr>';


for (i in buildingConstuctionCosts) {
    output += '<tr><td>' + buildingConstuctionCosts[i].name + '</td>';
    output += '<td>' + buildingConstuctionCosts[i].cost + '</td>';
    output += '<td>' + buildingConstuctionCosts[i].time + '</td></tr>';
}

output += '</table><h2>Daily property costs and staffing</h2><table><tr><th>Property</th><th>Total cost (day)</th><th>Skilled hirelings</th><th>Untrained hirelings</th></tr>'

for (i in businessCosts) {
    output += '<tr><td>' + businessCosts[i].name  + '</td>';
    output += '<td>' + businessCosts[i].cost  + '</td>';
    output += '<td>' + businessCosts[i].skilled  + '</td>';
    output += '<td>' + businessCosts[i].untrained  + '</td></tr>';
}

output += '</table><h2>Settlement sizes</h2><table><tr><th>Settlement size</th><th>Population</th></tr>'

for (i in settlementSizes) {
    output += '<tr><td>' + settlementSizes[i].name + '</td>';
    output += '<td>' + settlementSizes[i].population + '</td></tr>';
}

output += '</table><br/>';

$('div#output').append(output);
/*
    Reference https://www.thievesguild.cc/core/businesses as a potential resource
    From https://blackcitadelrpg.com/running-a-business-5e/:

*/