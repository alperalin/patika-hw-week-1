// NOTE: Folder icinde Folder olmayacak
// Data
const folders = [
	{
		id: 6,
		name: 'Klasör 2',
		files: [
			{ id: 21, name: 'foto.png' },
			{ id: 22, name: 'dosya.xls' },
		],
	},
	{
		id: 7,
		name: 'Klasör 3',
	},
	{
		id: 5,
		name: 'Klasör 1',
		files: [
			{ id: 17, name: 'profil.jpg' },
			{ id: 18, name: 'manzara.jpg' },
		],
	},
];

// Ortak kullanilan fonksiyonlar bir Object altina toplandi.
const utils = {
	// Verilen klasor ID'si uzerinden klasorun indeksini doner.
	getFolderIndex: (folderID) => {
		return folders.findIndex((item) => item.id === folderID);
	},
	// Verilen dosya ID'si uzerinden ebeveyn klasorun ve dosyanin indeksini doner.
	getParentFolderAndFileIndex: (fileID) => {
		const parentFolderIndex = folders.findIndex((item) => {
			if (item.files && item.files.length > 0) {
				return item.files.find((file) => file.id === fileID);
			}
		});

		const fileIndex = folders[parentFolderIndex]
			? folders[parentFolderIndex].files.findIndex((item) => item.id === fileID)
			: -1;

		return { parentFolderIndex, fileIndex };
	},
};

// Move ve Copy fonksiyonlari %95 ayni islemleri yaptigi icin tek fonksiyon altina toplandi.
function moveOrCopyFile(type = 'move', fileID, folderID) {
	// Degiskenler tanimlaniyor ve indeksler aliniyor.
	const { parentFolderIndex, fileIndex } =
		utils.getParentFolderAndFileIndex(fileID);
	const destFolderIndex = utils.getFolderIndex(folderID);

	// Dogru ID kontrolu yapiliyor
	if (fileIndex === -1 || destFolderIndex === -1)
		return 'Verilen dosya veya klasor ID numarasi hatali';

	// Ebeveyn klasor ile Tasima/kopyalama yapilacak klasor ayniysa hata mesaji donuluyor
	if (parentFolderIndex === destFolderIndex)
		return 'Ayni klasor icerisinde islem yapilamaz';

	// Islemin turune gore splice veya slice kullanilarak dosya aliniyor.
	const file =
		type === 'move'
			? folders[parentFolderIndex].files.splice(fileIndex, 1)
			: folders[parentFolderIndex].files.slice(fileIndex, fileIndex + 1);

	// Dosya, hedef klasor icerisine gonderiliyor.
	// Eger klasorde files bulunmuyorsa yeni files olusturuluyor
	folders[destFolderIndex]['files']
		? folders[destFolderIndex]['files'].push(file[0])
		: (folders[destFolderIndex]['files'] = [file[0]]);

	// Islemin tamamlandigina dair mesaji donuluyor
	return `${fileID} ID numarali dosya, ${
		folders[destFolderIndex].id
	} ID numarali klasore ${type === 'move' ? 'tasindi' : 'kopyalandi'}.`;
}

// TODO: move fonksiyonu, girilen dosyayi girilen klasore tasiyacak
function move(fileID, folderID) {
	return moveOrCopyFile('move', fileID, folderID);
}

// TODO: copy fonksiyonu, girilen dosyayi girilen klasore kopyalayacak
function copy(fileID, folderID) {
	return moveOrCopyFile('copy', fileID, folderID);
}

// TODO: remove fonksiyonu, girilen dosyayi silecek.
function remove(fileID) {
	// Degiskenler tanimlaniyor ve indeksler aliniyor.
	const { parentFolderIndex, fileIndex } =
		utils.getParentFolderAndFileIndex(fileID);

	// Dogru ID kontrolu yapiliyor
	if (fileIndex === -1) return 'Verilen dosya ID numarasi hatali';

	// Dosya splice ile klasorden siliniyor
	folders[parentFolderIndex].files.splice(fileIndex, 1);

	// Islemin tamamlandigina dair mesaji donuluyor
	return `${fileID} ID numarali dosya silinmistir.`;
}

// TODO: removeFolder fonksiyonu, girilen klasoru butun icerigiyle silecek.
function removeFolder(folderID) {
	// Degisken tanimlaniyor ve indeks aliniyor.
	const folderIndex = utils.getFolderIndex(folderID);

	// Dogru ID kontrolu yapiliyor
	if (folderIndex === -1) return 'Verilen klasor ID numarasi hatali';

	// Klasor siliniyor
	folders.splice(folderIndex, 1);

	// Islemin tamamlandigina dair mesaji donuluyor
	return `${folderID}, ID numarali klasor silindi.`;
}

// TODO: parentFolderOf fonksiyonu, girilen dosyanin icerisinde bulundugu klasorun id'sini donecek.
function parentFolderOf(fileID) {
	// Degiskenler tanimlaniyor ve indeksler aliniyor.
	const { parentFolderIndex, fileIndex } =
		utils.getParentFolderAndFileIndex(fileID);

	// Dogru ID kontrolu yapiliyor
	if (fileIndex === -1) return 'Verilen dosya ID numarasi hatali';

	// Klasor id'si donuluyor
	return `Klasor ID: ${folders[parentFolderIndex]['id']}`;
}

// Fonksiyon Cagrilari
// console.log(move(17, 7));
// console.log(copy(17, 6));
// console.log(remove(17));
// console.log(removeFolder(6));
// console.log(parentFolderOf(17));
