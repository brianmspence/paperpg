function calcDamage(ST) {
	var dmgT = '0d';
	var dmgS = '0d';

	var table = {
		1: { thrust:'1d-6',		swing: '1d-5'},
		2: { thrust:'1d-6',		swing: '1d-5'},
		3: { thrust:'1d-5',		swing: '1d-4'},
		4: { thrust:'1d-5',		swing: '1d-4'},
		5: { thrust:'1d-4',		swing: '1d-3'},
		6: { thrust:'1d-4',		swing: '1d-3'},
		7: { thrust:'1d-3',		swing: '1d-2'},
		8: { thrust:'1d-3',		swing: '1d-2'},
		9: { thrust:'1d-2',		swing: '1d-1'},
		10: { thrust:'1d-2',	swing: '1d'},
		11: { thrust:'1d-1',	swing: '1d+1'},
		12: { thrust:'1d-1',	swing: '1d+2'},
		13: { thrust:'1d',		swing: '2d-1'},
		14: { thrust:'1d',		swing: '2d'},
		15: { thrust:'1d+1',	swing: '2d+1'},
		16: { thrust:'1d+1',	swing: '2d+2'},
		17: { thrust:'1d+2',	swing: '3d-1'},
		18: { thrust:'1d+2',	swing: '3d'},
		19: { thrust:'2d-1',	swing: '3d+1'},
		20: { thrust:'2d-1',	swing: '3d+2'},
		21: { thrust:'2d',		swing: '4d-1'},
		22: { thrust:'2d',		swing: '4d'},
		23: { thrust:'2d+1',	swing: '4d+1'},
		24: { thrust:'2d+1',	swing: '4d+2'},
		25: { thrust:'2d+2',	swing: '5d-1'},
		26: { thrust:'2d+2',	swing: '5d'},
		27: { thrust:'3d-1',	swing: '5d+1'},
		28: { thrust:'3d-1',	swing: '5d+1'},
		29: { thrust:'3d',		swing: '5d+2'},
		30: { thrust:'3d',		swing: '5d+2'},
		31: { thrust:'3d+1',	swing: '6d-1'},
		32: { thrust:'3d+1',	swing: '6d-1'},
		33: { thrust:'3d+2',	swing: '6d'},
		34: { thrust:'3d+2',	swing: '6d'},
		35: { thrust:'4d-1',	swing: '6d+1'},
		36: { thrust:'4d-1',	swing: '6d+1'},
		37: { thrust:'4d',		swing: '6d+2'},
		38: { thrust:'4d',		swing: '6d+2'},
		39: { thrust:'4d+1',	swing: '7d-1'},
		40: { thrust:'4d+1',	swing: '7d-1'},
		45: { thrust:'5d',		swing: '7d+1'},
		50: { thrust:'5d+2',	swing: '8d-1'},
		55: { thrust:'6d',		swing: '8d+1'},
		60: { thrust:'7d-1',	swing:  '9d'},
		65: { thrust:'7d+1',	swing: '9d+2'},
		70: { thrust:'8d',		swing: '10d'},
		75: { thrust:'8d+2',	swing: '10d+2'},
		80: { thrust:'9d',		swing: '11d'},
		85: { thrust:'9d+2',	swing: '11d+2'},
		90: { thrust:'10d',		swing: '12d'},
		95: { thrust:'10d+2',	swing: '12d+2'},
		100:{ thrust:'11d',		swing:'13d'}
	};

	if(ST > 100) {
		var dice = Math.floor((ST - 100)/10);
		dmgT = (11 + dice) + 'd';
		dmgS = (13 + dice) + 'd';
	}
	else if (ST >= 1) {
		return table[ST];
	}
	
	return {thrust:dmgT, swing:dmgS};
}

module.exports = {calcDamage:calcDamage};