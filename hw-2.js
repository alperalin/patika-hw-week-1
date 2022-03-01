Array.prototype.includesCi = function (sItem) {
	return this.find((item) => item.toLowerCase() === sItem.toLowerCase())
		? true
		: false;
};

// ORNEK 1
const arr1 = ['E', 'AhMeT', 'AhMet', 'Ş', 'c', 'd'];
console.log('ORNEK 1', arr1.includesCi('ahmet'));

// ORNEK 2
const arr2 = ['MehMet', 'aHmet', 'Şess', 'c', 'd'];
console.log('ORNEK 2', arr2.includesCi('b'));

// ORNEK 3
const arr3 = ['MehMet', 'aHmet', 'Çalıkuşu', 'c'];
console.log('ORNEK 3', arr3.includesCi('çalıkuşu'));

// ORNEK 4
const access = [
	'admin',
	'moderator',
	'superAdmin',
	'god',
	'companyUser',
	'plainUser',
];
console.log('ORNEK 4', access.includesCi('sUpeRaDmIN'));
